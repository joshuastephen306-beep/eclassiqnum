import { query, getUserById, formatUser } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const auth = authenticate(req);
    const user = await getUserById(auth.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const newRole = user.role === 'super_admin' ? 'user' : 'super_admin';
    await query('UPDATE users SET role=$1 WHERE id=$2', [newRole, auth.id]);
    const updated = await getUserById(auth.id);
    return res.json({ user: formatUser(updated) });
  } catch (err: any) { return handleError(res, err); }
}
