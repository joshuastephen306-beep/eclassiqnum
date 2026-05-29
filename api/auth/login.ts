// api/auth/login.ts
import { loginUser } from '../../lib/db.ts';
import { cors, handleError, getClientIp } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const ip = getClientIp(req);
    const result = await loginUser(email, password, ip);
    return res.json(result);
  } catch (err: any) {
    return handleError(res, err);
  }
}
