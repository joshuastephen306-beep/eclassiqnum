import { getCodeAgain, getConfig, getNumberHistory, queryOne, deliverSms } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';
import { requestResend, pollForCode } from '../../lib/hero-sms.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const auth = authenticate(req);
    const { numberId } = req.body;
    if (!numberId) return res.status(400).json({ error: 'numberId required' });

    const num = await queryOne('SELECT * FROM virtual_numbers WHERE id=$1 AND user_id=$2', [numberId, auth.id]);

    // Request resend via Hero SMS if available
    if (num?.hero_activation_id) {
      const cfg = await getConfig();
      const heroKey = cfg.hero_sms_api_key;
      if (heroKey && heroKey.length > 10) {
        try {
          await requestResend(heroKey, num.hero_activation_id);
          // Poll for new code in background
          (async () => {
            const code = await pollForCode(heroKey, num.hero_activation_id, 12, 5000);
            if (code) {
              const svcName = num.service.charAt(0).toUpperCase() + num.service.slice(1);
              await deliverSms(numberId, svcName, `Your new ${svcName} code is: ${code}`);
            }
          })();
        } catch (_) {}
      }
    } else {
      // Demo: simulate new code after a few seconds
      setTimeout(async () => {
        const code = Math.floor(100000 + Math.random() * 900000);
        const svcName = num?.service || 'Service';
        await deliverSms(numberId, svcName, `Your new ${svcName} verification code is: ${code}`);
      }, 5000 + Math.random() * 5000);
    }

    const history = await getCodeAgain(auth.id, numberId);
    return res.json({ history });
  } catch (err: any) { return handleError(res, err); }
}
