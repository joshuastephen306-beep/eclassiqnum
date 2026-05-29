import { createPromoCode } from '../../lib/db.ts';
import { requireAdmin, cors, handleError } from '../../lib/auth.ts';

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  try {
    requireAdmin(req);
    const { code, discountPercent, maxUses, expiresAt } = req.body;
    if (!code) return res.status(400).json({ error: 'code required' });
    await createPromoCode(code, parseFloat(discountPercent || 10), parseInt(maxUses || 100), expiresAt || '2027-12-31');
    return res.json({ success: true });
  } catch (err: any) { return handleError(res, err); }
}
