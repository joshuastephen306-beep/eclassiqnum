// lib/auth.ts - Auth helpers for Vercel API routes
import { verifyToken } from './db.ts';

export function getTokenFromRequest(req: any): string | null {
  const auth = req.headers['authorization'] || req.headers['Authorization'];
  if (!auth) return null;
  const parts = auth.split(' ');
  return parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;
}

export function authenticate(req: any): any {
  const token = getTokenFromRequest(req);
  if (!token) throw new Error('UNAUTHORIZED');
  const payload = verifyToken(token);
  if (!payload) throw new Error('UNAUTHORIZED');
  return payload;
}

export function requireAdmin(req: any): any {
  const user = authenticate(req);
  if (user.role !== 'super_admin' && user.role !== 'support_admin') throw new Error('FORBIDDEN');
  return user;
}

export function getClientIp(req: any): string {
  return (req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
}

export function cors(res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

export function handleError(res: any, err: any) {
  if (err.message === 'UNAUTHORIZED') return res.status(401).json({ error: 'Unauthorized' });
  if (err.message === 'FORBIDDEN') return res.status(403).json({ error: 'Forbidden' });
  console.error(err);
  return res.status(400).json({ error: err.message || 'An error occurred' });
}
