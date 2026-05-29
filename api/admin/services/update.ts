import { updateService } from '../../lib/db.ts';
import { requireAdmin, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    requireAdmin(req);
    const { id, active, baseMarkup } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });
    await updateService(id, { active, baseMarkup });
    return res.json({ success: true });
  } catch (err: any) { return handleError(res, err); }
}
