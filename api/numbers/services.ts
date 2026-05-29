import { getAdminServices } from '../../lib/db.ts';
import { cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const services = await getAdminServices();
    const result = services.filter((s: any) => s.is_active).map((s: any) => ({
      id: s.id, name: s.name, icon: s.icon, baseMarkup: parseFloat(s.base_markup || 0), active: true
    }));
    return res.json(result);
  } catch (err: any) { return handleError(res, err); }
}
