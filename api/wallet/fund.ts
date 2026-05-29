import { fundWallet, getConfig, getUserWithTransactions } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';
import { verifyTransaction } from '../../lib/flutterwave.ts';
import { createPayment } from '../../lib/nowpayments.ts';
import crypto from 'crypto';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const auth = authenticate(req);
    const { amount, currency, gateway, promoCode, flwTransactionId } = req.body;

    if (!amount || amount <= 0) return res.status(400).json({ error: 'Valid amount required' });

    const cfg = await getConfig();
    const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');

    // FLUTTERWAVE — verify transaction ID
    if (gateway === 'flutterwave') {
      if (flwTransactionId) {
        const flwKey = cfg.flw_secret_key || process.env.FLW_SECRET_KEY || '';
        if (flwKey.length > 10) {
          try {
            const verified = await verifyTransaction(flwKey, flwTransactionId);
            if (!verified.success) return res.status(400).json({ error: 'Payment verification failed' });
            const amountNgn = verified.currency === 'NGN' ? verified.amount : verified.amount * rate;
            const user = await fundWallet(auth.id, amountNgn, 'NGN', 'flutterwave', promoCode);
            return res.json({ user });
          } catch (err: any) {
            return res.status(400).json({ error: err.message });
          }
        }
      }
      // Demo/sandbox — credit directly
      const user = await fundWallet(auth.id, parseFloat(amount), currency || 'NGN', 'flutterwave', promoCode);
      return res.json({ user });
    }

    // CRYPTO — create NowPayments invoice
    if (gateway === 'crypto') {
      const npKey = cfg.nowpayments_api_key || process.env.NOWPAYMENTS_API_KEY || '';
      if (npKey.length > 10) {
        const amountUsd = currency === 'NGN' ? parseFloat(amount) / rate : parseFloat(amount);
        const orderId = 'crypto_' + crypto.randomBytes(8).toString('hex');
        const cbUrl = `${process.env.APP_URL || 'https://eclassiqnum.com'}/api/webhooks/nowpayments`;
        try {
          const payment = await createPayment(npKey, amountUsd, orderId, `eclassiqnum wallet top-up`, cbUrl);
          return res.json({ cryptoPayment: payment });
        } catch (npErr: any) {
          console.error('NowPayments error:', npErr);
        }
      }
      const user = await fundWallet(auth.id, parseFloat(amount), currency || 'NGN', 'crypto', promoCode);
      return res.json({ user });
    }

    // BANK TRANSFER / MANUAL
    const user = await fundWallet(auth.id, parseFloat(amount), currency || 'NGN', gateway, promoCode);
    return res.json({ user });

  } catch (err: any) { return handleError(res, err); }
}
