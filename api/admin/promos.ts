import { getAdminPromos } from '../../lib/db.ts';
import { requireAdmin, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    requireAdmin(req);
    const promos = await getAdminPromos();
    return res.json(promos);
  } catch (err: any) { return handleError(res, err); }
}
