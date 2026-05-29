import { rentNumber, getUserWithTransactions } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const auth = authenticate(req);
    const { country, durationDays, currency, autoRenew } = req.body;
    if (!country || !durationDays) return res.status(400).json({ error: 'Country and duration required' });
    const user = await rentNumber(auth.id, country, parseInt(durationDays), currency || 'NGN', autoRenew || false);
    return res.json({ user, activation: { number: 'Rental activated', country } });
  } catch (err: any) { return handleError(res, err); }
}
