import { purchaseNumber, getConfig, deliverSms, queryOne, query } from '../../lib/db.ts';
import { authenticate, cors, handleError } from '../../lib/auth.ts';
import { getNumber, markReadyForSms, pollForCode } from '../../lib/hero-sms.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const auth = authenticate(req);
    const { country, service, currency, serverId } = req.body;
    if (!country || !service) return res.status(400).json({ error: 'Country and service required' });

    const cfg = await getConfig();
    const heroApiKey = cfg.hero_sms_api_key;

    let heroActivationId: string | undefined;
    let heroNumber: string | undefined;

    // Try Hero SMS if API key is configured
    if (heroApiKey && heroApiKey.length > 10) {
      try {
        const result = await getNumber(heroApiKey, service, country);
        if (result) {
          heroActivationId = result.activationId;
          heroNumber = result.phoneNumber;
          await markReadyForSms(heroApiKey, result.activationId);
        }
      } catch (heroErr: any) {
        console.error('Hero SMS error:', heroErr.message);
        // Fall through to generate simulated number
      }
    }

    // Purchase in database
    const history = await purchaseNumber(auth.id, country, service, currency || 'NGN', serverId || 1, heroActivationId, heroNumber);

    // If we got a real Hero SMS activation, poll for SMS in background
    if (heroActivationId && heroApiKey) {
      const numId = history[0]?.id;
      if (numId) {
        (async () => {
          try {
            const code = await pollForCode(heroApiKey, heroActivationId!, 24, 5000);
            if (code) {
              const senderName = service.charAt(0).toUpperCase() + service.slice(1);
              const text = `Your ${senderName} verification code is: ${code}`;
              await deliverSms(numId, senderName, text);
            }
          } catch (_) {}
        })();
      }
    } else {
      // Demo mode: simulate SMS after 8-15 seconds
      const numId = history[0]?.id;
      if (numId) {
        const delay = 8000 + Math.random() * 7000;
        setTimeout(async () => {
          try {
            const num = await queryOne('SELECT * FROM virtual_numbers WHERE id=$1', [numId]);
            if (num && num.status === 'waiting') {
              const code = Math.floor(100000 + Math.random() * 900000);
              const svcName = service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
              const text = `Your ${svcName} verification code is ${code}. Do not share this code with anyone.`;
              await deliverSms(numId, svcName, text);
            }
          } catch (_) {}
        }, delay);
      }
    }

    return res.json({ activation: history[0], user: null });
  } catch (err: any) { return handleError(res, err); }
}
