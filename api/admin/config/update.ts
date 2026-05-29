import { updateConfig } from '../../lib/db.ts';
import { requireAdmin, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    requireAdmin(req);
    const body = req.body;
    await updateConfig({
      global_markup_percent: String(body.globalMarkupPercent || 35),
      naira_to_dollar_rate: String(body.nairaToDollarRate || 1550),
      paystack_enabled: String(body.paystackEnabled ?? true),
      crypto_enabled: String(body.cryptoEnabled ?? true),
      bank_transfer_enabled: String(body.bankTransferEnabled ?? true),
      affiliate_commission_percent: String(body.affiliateCommissionPercent || 5),
      hero_sms_api_key: body.heroSmsApiKey || '',
      admin_bank_details: body.adminBankDetails || ''
    });
    return res.json({ success: true });
  } catch (err: any) { return handleError(res, err); }
}
