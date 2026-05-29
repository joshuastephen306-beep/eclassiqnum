import { getNumberHistory } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const auth = authenticate(req);
    const history = await getNumberHistory(auth.id);
    return res.json(history);
  } catch (err: any) { return handleError(res, err); }
}
