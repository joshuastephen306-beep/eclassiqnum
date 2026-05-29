import { cancelNumber, getConfig, queryOne } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';
import { cancelActivation } from '../../lib/hero-sms.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const auth = authenticate(req);
    const { numberId, currency } = req.body;
    if (!numberId) return res.status(400).json({ error: 'numberId required' });

    // Cancel on Hero SMS if applicable
    const num = await queryOne('SELECT * FROM virtual_numbers WHERE id=$1 AND user_id=$2', [numberId, auth.id]);
    if (num?.hero_activation_id) {
      const cfg = await getConfig();
      const heroKey = cfg.hero_sms_api_key;
      if (heroKey && heroKey.length > 10) {
        try { await cancelActivation(heroKey, num.hero_activation_id); } catch (_) {}
      }
    }

    const user = await cancelNumber(auth.id, numberId, currency || 'NGN');
    return res.json({ user });
  } catch (err: any) { return handleError(res, err); }
}
