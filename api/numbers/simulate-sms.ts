import { simulateSms } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const auth = authenticate(req);
    const { numberId, sender, text } = req.body;
    if (!numberId || !text) return res.status(400).json({ error: 'numberId and text required' });
    const history = await simulateSms(auth.id, numberId, sender || 'Demo', text);
    return res.json({ activation: history.find((h: any) => h.id === numberId) });
  } catch (err: any) { return handleError(res, err); }
}
