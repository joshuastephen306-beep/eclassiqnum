import { getAffiliateStats } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const auth = authenticate(req);
    const stats = await getAffiliateStats(auth.id);
    return res.json(stats);
  } catch (err: any) { return handleError(res, err); }
}
