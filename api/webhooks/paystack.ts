import { fundWallet, getConfig, queryOne } from '../../lib/db.ts';
import { verifyWebhookSignature } from '../../lib/paystack.ts';
import { cors } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const cfg = await getConfig();
    const secretKey = cfg.paystack_secret_key || process.env.PAYSTACK_SECRET_KEY || '';
    const signature = req.headers['x-paystack-signature'] as string;
    const body = JSON.stringify(req.body);

    // Verify webhook signature in production
    if (secretKey && signature) {
      const valid = await verifyWebhookSignature(secretKey, body, signature);
      if (!valid) return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data } = req.body;

    if (event === 'charge.success' || event === 'transfer.success') {
      const email = data.customer?.email || data.recipient?.details?.account_number;
      const amountNgn = data.amount / 100; // Convert from kobo
      const reference = data.reference;

      if (email) {
        // Find user by email
        const user = await queryOne('SELECT * FROM users WHERE email=$1', [email.toLowerCase()]);
        if (user) {
          // Check if this reference was already processed
          const existing = await queryOne('SELECT id FROM transactions WHERE reference=$1', [reference]);
          if (!existing) {
            await fundWallet(user.id, amountNgn, 'NGN', 'paystack');
          }
        }
      }
    }

    // Dedicated virtual account payment
    if (event === 'charge.success' && data.authorization?.channel === 'dedicated_nuban') {
      const accountNumber = data.authorization?.receiver_bank_account_number;
      if (accountNumber) {
        const user = await queryOne('SELECT * FROM users WHERE paystack_virtual_account=$1', [accountNumber]);
        if (user) {
          const existing = await queryOne('SELECT id FROM transactions WHERE reference=$1', [data.reference]);
          if (!existing) {
            await fundWallet(user.id, data.amount / 100, 'NGN', 'bank_transfer');
          }
        }
      }
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error('Paystack webhook error:', err);
    return res.status(200).json({ received: true }); // Always return 200 to Paystack
  }
}
