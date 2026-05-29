import { fundWallet, getConfig, queryOne } from '../../lib/db.ts';
import { isPaymentConfirmed } from '../../lib/nowpayments.ts';
import { cors } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { payment_status, order_id, actually_paid, price_currency, price_amount } = req.body;

    if (isPaymentConfirmed(payment_status)) {
      // order_id format: crypto_USERID_AMOUNT_CURRENCY
      // Parse user from order_id or find via metadata
      const parts = order_id?.split('_') || [];

      // Try to find pending transaction by order reference
      const pending = await queryOne('SELECT * FROM transactions WHERE reference=$1 AND status=$2', [order_id, 'pending']);
      if (pending) {
        const cfg = await getConfig();
        const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');
        const amountUsd = parseFloat(price_amount || actually_paid || 0);
        await fundWallet(pending.user_id, amountUsd, 'USD', 'crypto');
        return res.json({ received: true });
      }
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error('NowPayments webhook error:', err);
    return res.status(200).json({ received: true });
  }
}
