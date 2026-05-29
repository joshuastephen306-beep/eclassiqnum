// lib/db.ts - PostgreSQL Database Layer
import crypto from 'crypto';

// Use pg Pool - works in both Node.js and Vercel serverless
let pool: any = null;

async function getPool() {
  if (pool) return pool;
  const { Pool } = await import('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : false,
    max: 5,
  });
  return pool;
}

export async function query(sql: string, params: any[] = []) {
  const p = await getPool();
  const { rows } = await p.query(sql, params);
  return rows;
}

export async function queryOne(sql: string, params: any[] = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

// ─── AUTH ────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || 'eclassiqnum_secret_2026';

export function hashPassword(password: string): string {
  return crypto.createHmac('sha256', JWT_SECRET).update(password).digest('hex');
}

export function createToken(payload: any): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 86400 })).toString('base64url');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

export function verifyToken(token: string): any {
  try {
    const [header, body, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (sig !== expected) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

// ─── CONFIG ──────────────────────────────────────────────────
export async function getConfig(): Promise<Record<string, string>> {
  const rows = await query('SELECT key, value FROM system_config');
  return Object.fromEntries(rows.map((r: any) => [r.key, r.value]));
}

export async function updateConfig(updates: Record<string, string>) {
  for (const [key, value] of Object.entries(updates)) {
    await query('INSERT INTO system_config(key,value) VALUES($1,$2) ON CONFLICT(key) DO UPDATE SET value=$2', [key, value]);
  }
}

// ─── USERS ───────────────────────────────────────────────────
export async function getUserById(id: string) {
  return queryOne('SELECT * FROM users WHERE id=$1', [id]);
}

export async function getUserByEmail(email: string) {
  return queryOne('SELECT * FROM users WHERE email=$1', [email.toLowerCase().trim()]);
}

export async function getUsers() {
  return query('SELECT * FROM users ORDER BY created_at DESC');
}

export async function registerUser(name: string, email: string, password: string, referrerCode?: string) {
  const cleanEmail = email.toLowerCase().trim();
  const existing = await getUserByEmail(cleanEmail);
  if (existing) throw new Error('Email already registered');

  const id = 'user_' + crypto.randomBytes(8).toString('hex');
  const refCode = name.replace(/\s+/g, '').slice(0, 5).toUpperCase() + Math.floor(100 + Math.random() * 900);
  const hash = hashPassword(password);

  let referredBy: string | null = null;
  if (referrerCode) {
    const referrer = await queryOne('SELECT referral_code FROM users WHERE referral_code=$1', [referrerCode.toUpperCase().trim()]);
    if (referrer) referredBy = referrer.referral_code;
  }

  await query(
    `INSERT INTO users(id,email,name,password_hash,referral_code,referred_by,role,status) VALUES($1,$2,$3,$4,$5,$6,'user','active')`,
    [id, cleanEmail, name.trim(), hash, refCode, referredBy]
  );

  return getUserById(id);
}

export async function loginUser(email: string, password: string, ip: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');
  if (user.status === 'suspended') throw new Error('Account suspended. Contact support.');

  const hash = hashPassword(password);
  if (user.password_hash !== hash) throw new Error('Invalid email or password');

  const logId = 'log_' + crypto.randomBytes(6).toString('hex');
  await query('INSERT INTO login_logs(id,user_id,email,ip) VALUES($1,$2,$3,$4)', [logId, user.id, user.email, ip]);

  const token = createToken({ id: user.id, email: user.email, role: user.role });
  return { user: formatUser(user), token };
}

export function formatUser(u: any) {
  return {
    id: u.id, email: u.email, name: u.name, role: u.role,
    walletBalanceNgn: parseFloat(u.wallet_ngn || 0),
    walletBalanceUsd: parseFloat(u.wallet_usd || 0),
    affiliateEarningsNgn: parseFloat(u.affiliate_ngn || 0),
    affiliateEarningsUsd: parseFloat(u.affiliate_usd || 0),
    referralCode: u.referral_code,
    referredBy: u.referred_by,
    status: u.status,
    createdAt: u.created_at,
    paystackVirtualAccount: u.paystack_virtual_account,
    paystackVirtualBank: u.paystack_virtual_bank,
    transactions: []
  };
}

export async function getUserWithTransactions(id: string) {
  const user = await getUserById(id);
  if (!user) return null;
  const txs = await query('SELECT * FROM transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 20', [id]);
  const formatted = formatUser(user);
  formatted.transactions = txs.map((t: any) => ({
    id: t.id, type: t.type, description: t.description, status: t.status,
    amountNgn: parseFloat(t.amount_ngn || 0),
    amountUsd: parseFloat(t.amount_usd || 0),
    currency: t.currency, createdAt: t.created_at
  }));
  return formatted;
}

export async function toggleUserStatus(targetId: string) {
  const user = await getUserById(targetId);
  if (!user) throw new Error('User not found');
  const newStatus = user.status === 'active' ? 'suspended' : 'active';
  await query('UPDATE users SET status=$1 WHERE id=$2', [newStatus, targetId]);
  return getUserById(targetId);
}

export async function adminAdjustWallet(targetId: string, amount: number, currency: string, action: string, remark: string) {
  const user = await getUserById(targetId);
  if (!user) throw new Error('User not found');
  const num = Math.abs(amount);

  if (action === 'credit') {
    if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn + $1 WHERE id=$2', [num, targetId]);
    else await query('UPDATE users SET wallet_usd = wallet_usd + $1 WHERE id=$2', [num, targetId]);
  } else {
    if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn - $1 WHERE id=$2', [num, targetId]);
    else await query('UPDATE users SET wallet_usd = wallet_usd - $1 WHERE id=$2', [num, targetId]);
  }

  const cfg = await getConfig();
  const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');
  const txId = 'tx_man_' + crypto.randomBytes(8).toString('hex');
  await query(
    `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status) VALUES($1,$2,$3,$4,$5,$6,$7,'completed')`,
    [txId, targetId, action === 'credit' ? 'manual_credit' : 'manual_debit',
      currency === 'NGN' ? num : num * rate,
      currency === 'USD' ? num : num / rate,
      currency, `Admin: ${remark}`]
  );
}

// ─── WALLET ──────────────────────────────────────────────────
export async function fundWallet(userId: string, amount: number, currency: string, gateway: string, promoCode?: string) {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const cfg = await getConfig();
  const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');
  const commissionPercent = parseFloat(cfg.affiliate_commission_percent || '5');

  let bonusPercent = 0;
  let bonusFixed = 0;

  // Apply promo code
  if (promoCode) {
    try {
      const promo = await queryOne('SELECT * FROM promo_codes WHERE code=$1', [promoCode.toUpperCase().trim()]);
      if (promo && promo.uses_count < promo.max_uses) {
        const alreadyUsed = await queryOne('SELECT 1 FROM promo_uses WHERE promo_id=$1 AND user_id=$2', [promo.id, userId]);
        if (!alreadyUsed) {
          if (promo.discount_percent) bonusPercent = parseFloat(promo.discount_percent);
          if (currency === 'NGN' && promo.fixed_ngn) bonusFixed = parseFloat(promo.fixed_ngn);
          if (currency === 'USD' && promo.fixed_usd) bonusFixed = parseFloat(promo.fixed_usd);
          await query('UPDATE promo_codes SET uses_count = uses_count + 1 WHERE id=$1', [promo.id]);
          await query('INSERT INTO promo_uses(promo_id,user_id) VALUES($1,$2)', [promo.id, userId]);
        }
      }
    } catch (_) {}
  }

  // Credit main deposit
  if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn + $1 WHERE id=$2', [amount, userId]);
  else await query('UPDATE users SET wallet_usd = wallet_usd + $1 WHERE id=$2', [amount, userId]);

  const txId = 'tx_' + crypto.randomBytes(8).toString('hex');
  const amountNgn = currency === 'NGN' ? amount : amount * rate;
  const amountUsd = currency === 'USD' ? amount : amount / rate;

  await query(
    `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status,gateway) VALUES($1,$2,'deposit',$3,$4,$5,$6,'completed',$7)`,
    [txId, userId, amountNgn, amountUsd, currency, `Funded via ${gateway}`, gateway]
  );

  // Apply bonus
  if (bonusPercent > 0 || bonusFixed > 0) {
    const bonusAmt = bonusFixed > 0 ? bonusFixed : (amount * bonusPercent / 100);
    if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn + $1 WHERE id=$2', [bonusAmt, userId]);
    else await query('UPDATE users SET wallet_usd = wallet_usd + $1 WHERE id=$2', [bonusAmt, userId]);
    const bId = 'tx_b_' + crypto.randomBytes(6).toString('hex');
    await query(
      `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status) VALUES($1,$2,'promo_bonus',$3,$4,$5,$6,'completed')`,
      [bId, userId, currency === 'NGN' ? bonusAmt : bonusAmt * rate, currency === 'USD' ? bonusAmt : bonusAmt / rate, currency, `Promo bonus applied`]
    );
  }

  // Referral commission
  if (user.referred_by) {
    const referrer = await queryOne('SELECT * FROM users WHERE referral_code=$1', [user.referred_by]);
    if (referrer) {
      const commNgn = (amountNgn * commissionPercent) / 100;
      const commUsd = (amountUsd * commissionPercent) / 100;
      await query('UPDATE users SET affiliate_ngn = affiliate_ngn + $1, affiliate_usd = affiliate_usd + $2 WHERE id=$3', [commNgn, commUsd, referrer.id]);
      const rId = 'tx_ref_' + crypto.randomBytes(6).toString('hex');
      await query(
        `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status) VALUES($1,$2,'referral_bonus',$3,$4,'NGN',$5,'completed')`,
        [rId, referrer.id, commNgn, commUsd, `Affiliate commission from ${user.name}`]
      );
    }
  }

  return getUserWithTransactions(userId);
}

// ─── VIRTUAL NUMBERS ─────────────────────────────────────────
export async function getNumberHistory(userId: string) {
  const numbers = await query(
    'SELECT * FROM virtual_numbers WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50',
    [userId]
  );
  const result = [];
  for (const n of numbers) {
    const sms = await query('SELECT * FROM sms_messages WHERE number_id=$1 ORDER BY received_at ASC', [n.id]);
    result.push({
      id: n.id, number: n.number, country: n.country, service: n.service,
      status: n.status, priceNgn: parseFloat(n.price_ngn), priceUsd: parseFloat(n.price_usd),
      serverId: n.server_id, orderId: n.order_id, heroActivationId: n.hero_activation_id,
      isRental: n.is_rental, rentalDays: n.rental_days, autoRenew: n.auto_renew,
      expiresAt: n.expires_at, createdAt: n.created_at,
      sms: sms.map((s: any) => ({ id: s.id, sender: s.sender, text: s.text, receivedAt: s.received_at }))
    });
  }
  return result;
}

export async function purchaseNumber(userId: string, country: string, service: string, currency: string, serverId: number, heroActivationId?: string, heroNumber?: string) {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const cfg = await getConfig();
  const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');
  const markup = parseFloat(cfg.global_markup_percent || '35');

  // Get country base cost
  const countryRow = await queryOne('SELECT * FROM countries WHERE code=(SELECT code FROM countries WHERE name=$1 LIMIT 1) OR name=$1', [country]);
  const baseCostUsd = countryRow ? parseFloat(countryRow.base_cost_usd) : 0.30;

  // Get service markup
  const serviceRow = await queryOne('SELECT * FROM services WHERE name=$1 OR id=$1', [service]);
  const svcMarkup = serviceRow ? parseFloat(serviceRow.base_markup || '0') : 0;

  const totalMarkup = markup + svcMarkup;
  const priceUsd = parseFloat((baseCostUsd * (1 + totalMarkup / 100)).toFixed(4));
  const priceNgn = parseFloat((priceUsd * rate).toFixed(2));

  // Check balance
  if (currency === 'NGN' && parseFloat(user.wallet_ngn) < priceNgn) throw new Error(`Insufficient funds. Cost: ₦${priceNgn.toFixed(2)}`);
  if (currency === 'USD' && parseFloat(user.wallet_usd) < priceUsd) throw new Error(`Insufficient funds. Cost: $${priceUsd.toFixed(2)}`);

  // Deduct wallet
  if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn - $1 WHERE id=$2', [priceNgn, userId]);
  else await query('UPDATE users SET wallet_usd = wallet_usd - $1 WHERE id=$2', [priceUsd, userId]);

  // Generate number if not provided by Hero SMS
  const number = heroNumber || generateFakeNumber(country);
  const id = 'num_' + crypto.randomBytes(8).toString('hex');
  const orderId = 'ord_' + crypto.randomBytes(6).toString('hex');
  const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();

  await query(
    `INSERT INTO virtual_numbers(id,user_id,number,country,service,status,price_ngn,price_usd,server_id,hero_activation_id,order_id,expires_at) VALUES($1,$2,$3,$4,$5,'waiting',$6,$7,$8,$9,$10,$11)`,
    [id, userId, number, country, service, priceNgn, priceUsd, serverId, heroActivationId || null, orderId, expiresAt]
  );

  // Log transaction
  await query(
    `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status) VALUES($1,$2,'purchase',$3,$4,$5,$6,'completed')`,
    ['tx_' + crypto.randomBytes(8).toString('hex'), userId, priceNgn, priceUsd, currency, `Bought number ${number} (${country} - ${service})`]
  );

  // Auto-expire after 20 mins
  setTimeout(async () => {
    try {
      const num = await queryOne('SELECT * FROM virtual_numbers WHERE id=$1', [id]);
      if (num && num.status === 'waiting') {
        await query('UPDATE virtual_numbers SET status=$1 WHERE id=$2', ['expired', id]);
        if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn + $1 WHERE id=$2', [priceNgn, userId]);
        else await query('UPDATE users SET wallet_usd = wallet_usd + $1 WHERE id=$2', [priceUsd, userId]);
        await query(
          `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status) VALUES($1,$2,'refund',$3,$4,$5,$6,'completed')`,
          ['tx_rf_' + crypto.randomBytes(6).toString('hex'), userId, priceNgn, priceUsd, currency, `Auto-refund: ${number} expired`]
        );
      }
    } catch (_) {}
  }, 20 * 60 * 1000);

  return getNumberHistory(userId);
}

export async function cancelNumber(userId: string, numberId: string, currency: string) {
  const num = await queryOne('SELECT * FROM virtual_numbers WHERE id=$1 AND user_id=$2', [numberId, userId]);
  if (!num) throw new Error('Number not found');
  if (num.status !== 'waiting') throw new Error('Cannot cancel — number already has an SMS or is expired');

  await query('UPDATE virtual_numbers SET status=$1 WHERE id=$2', ['cancelled', numberId]);

  const priceNgn = parseFloat(num.price_ngn);
  const priceUsd = parseFloat(num.price_usd);

  if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn + $1 WHERE id=$2', [priceNgn, userId]);
  else await query('UPDATE users SET wallet_usd = wallet_usd + $1 WHERE id=$2', [priceUsd, userId]);

  await query(
    `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status) VALUES($1,$2,'refund',$3,$4,$5,$6,'completed')`,
    ['tx_c_' + crypto.randomBytes(6).toString('hex'), userId, priceNgn, priceUsd, currency, `Cancelled: ${num.number}`]
  );

  return getUserWithTransactions(userId);
}

export async function getCodeAgain(userId: string, numberId: string) {
  const num = await queryOne('SELECT * FROM virtual_numbers WHERE id=$1 AND user_id=$2', [numberId, userId]);
  if (!num) throw new Error('Number not found');

  const newExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  await query('UPDATE virtual_numbers SET status=$1, expires_at=$2 WHERE id=$3', ['waiting', newExpiry, numberId]);

  return getNumberHistory(userId);
}

export async function deliverSms(numberId: string, sender: string, text: string) {
  const smsId = 'sms_' + crypto.randomBytes(6).toString('hex');
  await query('INSERT INTO sms_messages(id,number_id,sender,text) VALUES($1,$2,$3,$4)', [smsId, numberId, sender, text]);
  await query('UPDATE virtual_numbers SET status=$1 WHERE id=$2', ['received', numberId]);
}

export async function simulateSms(userId: string, numberId: string, sender: string, text: string) {
  const num = await queryOne('SELECT * FROM virtual_numbers WHERE id=$1 AND user_id=$2', [numberId, userId]);
  if (!num) throw new Error('Number not found');
  await deliverSms(numberId, sender, text);
  return getNumberHistory(userId);
}

export async function rentNumber(userId: string, country: string, durationDays: number, currency: string, autoRenew: boolean, heroNumber?: string) {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const cfg = await getConfig();
  const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');
  const markup = parseFloat(cfg.global_markup_percent || '35');

  let baseRatePerDayUsd = 0.24;
  const cn = country.toLowerCase();
  if (cn.includes('usa') || cn.includes('canada')) baseRatePerDayUsd = 0.20;
  else if (cn.includes('united kingdom')) baseRatePerDayUsd = 0.25;
  else if (cn.includes('france') || cn.includes('germany')) baseRatePerDayUsd = 0.30;

  const ratePerDay = baseRatePerDayUsd * (1 + markup / 100);
  let discount = 1.0;
  if (durationDays >= 90) discount = 0.8;
  else if (durationDays >= 30) discount = 0.9;
  else if (durationDays >= 7) discount = 0.95;

  const totalUsd = parseFloat((ratePerDay * durationDays * discount).toFixed(4));
  const totalNgn = parseFloat((totalUsd * rate).toFixed(2));

  if (currency === 'NGN' && parseFloat(user.wallet_ngn) < totalNgn) throw new Error(`Insufficient funds. Cost: ₦${totalNgn.toFixed(2)}`);
  if (currency === 'USD' && parseFloat(user.wallet_usd) < totalUsd) throw new Error(`Insufficient funds. Cost: $${totalUsd.toFixed(2)}`);

  if (currency === 'NGN') await query('UPDATE users SET wallet_ngn = wallet_ngn - $1 WHERE id=$2', [totalNgn, userId]);
  else await query('UPDATE users SET wallet_usd = wallet_usd - $1 WHERE id=$2', [totalUsd, userId]);

  const number = heroNumber || generateFakeNumber(country);
  const id = 'num_rent_' + crypto.randomBytes(8).toString('hex');
  const orderId = 'rent_' + crypto.randomBytes(6).toString('hex');
  const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

  await query(
    `INSERT INTO virtual_numbers(id,user_id,number,country,service,status,price_ngn,price_usd,server_id,order_id,is_rental,rental_days,auto_renew,expires_at) VALUES($1,$2,$3,$4,'Rental Line','received',$5,$6,2,$7,true,$8,$9,$10)`,
    [id, userId, number, country, totalNgn, totalUsd, orderId, durationDays, autoRenew, expiresAt]
  );

  await query(
    `INSERT INTO transactions(id,user_id,type,amount_ngn,amount_usd,currency,description,status) VALUES($1,$2,'purchase',$3,$4,$5,$6,'completed')`,
    ['tx_r_' + crypto.randomBytes(8).toString('hex'), userId, totalNgn, totalUsd, currency, `Rented number ${number} (${country} - ${durationDays} days)`]
  );

  return getUserWithTransactions(userId);
}

// ─── AFFILIATE ───────────────────────────────────────────────
export async function getAffiliateStats(userId: string) {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const referralsCount = await queryOne('SELECT COUNT(*) as cnt FROM users WHERE referred_by=$1', [user.referral_code]);
  const referralLink = `https://eclassiqnum.com/join?ref=${user.referral_code}`;

  return {
    referralsCount: parseInt(referralsCount?.cnt || '0'),
    affiliateEarningsNgn: parseFloat(user.affiliate_ngn || 0),
    affiliateEarningsUsd: parseFloat(user.affiliate_usd || 0),
    referralLink
  };
}

export async function requestWithdrawal(userId: string, amount: number, currency: string, method: string, details: string) {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const num = parseFloat(amount as any);
  if (currency === 'NGN' && parseFloat(user.affiliate_ngn) < num) throw new Error('Insufficient affiliate earnings');
  if (currency === 'USD' && parseFloat(user.affiliate_usd) < num) throw new Error('Insufficient affiliate earnings');

  if (currency === 'NGN') await query('UPDATE users SET affiliate_ngn = affiliate_ngn - $1 WHERE id=$2', [num, userId]);
  else await query('UPDATE users SET affiliate_usd = affiliate_usd - $1 WHERE id=$2', [num, userId]);

  const wId = 'with_' + crypto.randomBytes(8).toString('hex');
  await query(
    `INSERT INTO affiliate_withdrawals(id,user_id,name,email,amount,currency,method,details,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,'pending')`,
    [wId, userId, user.name, user.email, num, currency, method, details]
  );

  return getUserWithTransactions(userId);
}

// ─── ADMIN ───────────────────────────────────────────────────
export async function getAdminDashboard() {
  const cfg = await getConfig();
  const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');

  const totalUsers = await queryOne('SELECT COUNT(*) as cnt FROM users');
  const totalDeposits = await queryOne(`SELECT COALESCE(SUM(amount_ngn),0) as total FROM transactions WHERE type='deposit'`);
  const totalOrders = await queryOne(`SELECT COUNT(*) as cnt FROM virtual_numbers`);
  const providers = await query('SELECT * FROM sms_providers ORDER BY priority DESC');
  const markupPct = parseFloat(cfg.global_markup_percent || '35');

  return {
    metrics: {
      totalUsers: parseInt(totalUsers?.cnt || '0'),
      totalRevenueNgn: parseFloat(totalDeposits?.total || '0'),
      totalOrdersCount: parseInt(totalOrders?.cnt || '0'),
      estimatedProfitNgn: parseFloat(totalDeposits?.total || '0') * (markupPct / 100 / (1 + markupPct / 100))
    },
    providers: providers.map((p: any) => ({
      id: p.id, name: p.name, isActive: p.is_active, priority: p.priority,
      successRate: parseFloat(p.success_rate), latencyMs: p.latency_ms,
      failureRate: parseFloat(p.failure_rate)
    }))
  };
}

export async function getAdminWithdrawals() {
  return query('SELECT * FROM affiliate_withdrawals ORDER BY created_at DESC');
}

export async function processWithdrawal(withdrawalId: string, status: 'approved' | 'rejected') {
  const w = await queryOne('SELECT * FROM affiliate_withdrawals WHERE id=$1', [withdrawalId]);
  if (!w) throw new Error('Withdrawal not found');
  if (w.status !== 'pending') throw new Error('Already processed');

  await query('UPDATE affiliate_withdrawals SET status=$1 WHERE id=$2', [status, withdrawalId]);

  if (status === 'rejected') {
    if (w.currency === 'NGN') await query('UPDATE users SET affiliate_ngn = affiliate_ngn + $1 WHERE id=$2', [w.amount, w.user_id]);
    else await query('UPDATE users SET affiliate_usd = affiliate_usd + $1 WHERE id=$2', [w.amount, w.user_id]);
  }
}

export async function getAdminCountries() {
  return query('SELECT * FROM countries ORDER BY name');
}

export async function addCountry(data: any) {
  await query(
    'INSERT INTO countries(code,name,flag,base_cost_usd,hero_country_id) VALUES($1,$2,$3,$4,$5) ON CONFLICT(code) DO NOTHING',
    [data.code.toUpperCase(), data.name, data.flag || '🌍', parseFloat(data.baseCostUsd), data.heroCountryId || null]
  );
}

export async function updateCountry(code: string, updates: any) {
  const parts: string[] = [];
  const vals: any[] = [];
  let i = 1;
  if (updates.active !== undefined) { parts.push(`is_active=$${i++}`); vals.push(updates.active); }
  if (updates.baseCostUsd !== undefined) { parts.push(`base_cost_usd=$${i++}`); vals.push(updates.baseCostUsd); }
  if (parts.length === 0) return;
  vals.push(code);
  await query(`UPDATE countries SET ${parts.join(',')} WHERE code=$${i}`, vals);
}

export async function getAdminServices() {
  return query('SELECT * FROM services ORDER BY name');
}

export async function addService(data: any) {
  await query(
    'INSERT INTO services(id,name,icon,base_markup,hero_service_code) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO NOTHING',
    [data.id, data.name, data.icon || 'Globe', parseFloat(data.baseMarkup || 0), data.heroServiceCode || null]
  );
}

export async function updateService(id: string, updates: any) {
  const parts: string[] = [];
  const vals: any[] = [];
  let i = 1;
  if (updates.active !== undefined) { parts.push(`is_active=$${i++}`); vals.push(updates.active); }
  if (updates.baseMarkup !== undefined) { parts.push(`base_markup=$${i++}`); vals.push(updates.baseMarkup); }
  if (parts.length === 0) return;
  vals.push(id);
  await query(`UPDATE services SET ${parts.join(',')} WHERE id=$${i}`, vals);
}

export async function getAdminPromos() {
  return query('SELECT * FROM promo_codes ORDER BY created_at DESC');
}

export async function createPromoCode(code: string, discountPercent: number, maxUses: number, expiresAt: string) {
  const id = 'promo_' + crypto.randomBytes(6).toString('hex');
  await query(
    'INSERT INTO promo_codes(id,code,discount_percent,max_uses,expires_at) VALUES($1,$2,$3,$4,$5) ON CONFLICT(code) DO NOTHING',
    [id, code.toUpperCase().trim(), discountPercent, maxUses, expiresAt]
  );
}

export async function toggleProvider(providerId: string, isActive: boolean) {
  await query('UPDATE sms_providers SET is_active=$1 WHERE id=$2', [isActive, providerId]);
}

// ─── HELPERS ─────────────────────────────────────────────────
function generateFakeNumber(country: string): string {
  const codes: Record<string, string> = {
    'Nigeria': '+234', 'USA': '+1', 'United Kingdom': '+44', 'France': '+33',
    'Germany': '+49', 'India': '+91', 'Canada': '+1', 'South Africa': '+27',
    'Kenya': '+254', 'Ghana': '+233', 'Australia': '+61', 'UAE': '+971',
    'Russia': '+7', 'Ukraine': '+380', 'Brazil': '+55', 'Turkey': '+90',
    'Indonesia': '+62', 'Philippines': '+63', 'Vietnam': '+84', 'China': '+86',
    'Japan': '+81', 'Saudi Arabia': '+966', 'Egypt': '+20', 'Morocco': '+212'
  };
  const code = codes[country] || '+44';
  const digits = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${code}${digits}`.substring(0, 15);
}
