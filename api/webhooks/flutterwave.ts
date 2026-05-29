import { fundWallet, getConfig, queryOne } from '../../lib/db.ts';
import { verifyWebhookSignature } from '../../lib/flutterwave.ts';
import { cors } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const cfg = await getConfig();
    const secretHash = cfg.flw_webhook_hash || process.env.FLW_WEBHOOK_HASH || '';
    const signature = req.headers['verif-hash'] as string;

    // Verify webhook signature
    if (secretHash && signature) {
      const valid = verifyWebhookSignature(secretHash, signature);
      if (!valid) return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data } = req.body;

    if (event === 'charge.completed' && data.status === 'successful') {
      const email = data.customer?.email;
      const amountNgn = data.amount;
      const txRef = data.tx_ref;

      if (email && amountNgn) {
        const user = await queryOne('SELECT * FROM users WHERE email=$1', [email.toLowerCase()]);
        if (user) {
          // Prevent double crediting
          const existing = await queryOne('SELECT id FROM transactions WHERE reference=$1', [txRef]);
          if (!existing) {
            await fundWallet(user.id, amountNgn, 'NGN', 'flutterwave');
          }
        }
      }
    }

    return res.json({ status: 'ok' });
  } catch (err: any) {
    console.error('Flutterwave webhook error:', err);
    return res.status(200).json({ status: 'ok' }); // Always return 200
  }
}
