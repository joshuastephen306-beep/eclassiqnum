import { getUserWithTransactions } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const auth = authenticate(req);
    const user = await getUserWithTransactions(auth.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ user });
  } catch (err: any) { return handleError(res, err); }
}
