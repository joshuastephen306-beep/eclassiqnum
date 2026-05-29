import { getConfig } from '../../lib/db.ts';
import { requireAdmin, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    requireAdmin(req);
    const cfg = await getConfig();
    return res.json({
      globalMarkupPercent: parseFloat(cfg.global_markup_percent || '35'),
      nairaToDollarRate: parseFloat(cfg.naira_to_dollar_rate || '1550'),
      paystackEnabled: cfg.paystack_enabled === 'true',
      cryptoEnabled: cfg.crypto_enabled === 'true',
      bankTransferEnabled: cfg.bank_transfer_enabled === 'true',
      affiliateCommissionPercent: parseFloat(cfg.affiliate_commission_percent || '5'),
      heroSmsApiKey: cfg.hero_sms_api_key || '',
      adminBankDetails: cfg.admin_bank_details || ''
    });
  } catch (err: any) { return handleError(res, err); }
}
