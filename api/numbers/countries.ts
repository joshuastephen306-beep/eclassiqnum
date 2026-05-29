import { getAdminCountries, getConfig } from '../../lib/db.ts';
import { cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const countries = await getAdminCountries();
    const cfg = await getConfig();
    const markup = parseFloat(cfg.global_markup_percent || '35');
    const rate = parseFloat(cfg.naira_to_dollar_rate || '1550');
    const result = countries.filter((c: any) => c.is_active).map((c: any) => {
      const priceUsd = parseFloat(c.base_cost_usd) * (1 + markup / 100);
      const priceNgn = priceUsd * rate;
      return { code: c.code, name: c.name, flag: c.flag, priceUsd: parseFloat(priceUsd.toFixed(4)), priceNgn: parseFloat(priceNgn.toFixed(2)) };
    });
    return res.json(result);
  } catch (err: any) { return handleError(res, err); }
}
