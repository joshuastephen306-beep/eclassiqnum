import { requestWithdrawal } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const auth = authenticate(req);
    const { amount, currency, method, details } = req.body;
    if (!amount || !method || !details) return res.status(400).json({ error: 'Amount, method and details required' });
    const user = await requestWithdrawal(auth.id, parseFloat(amount), currency || 'NGN', method, details);
    return res.json({ user });
  } catch (err: any) { return handleError(res, err); }
}
