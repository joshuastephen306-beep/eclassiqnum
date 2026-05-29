import { registerUser } from '../../lib/db.ts';
import { cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { name, email, password, referrer } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });
    const user = await registerUser(name, email, password, referrer);
    return res.status(201).json({ status: 'ok', user });
  } catch (err: any) { return handleError(res, err); }
}
