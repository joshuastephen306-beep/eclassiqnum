// lib/flutterwave.ts - Flutterwave Payment Integration

const FLW_BASE = 'https://api.flutterwave.com/v3';

async function flwRequest(secretKey: string, method: string, path: string, body?: any) {
  const res = await fetch(`${FLW_BASE}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (data.status !== 'success') throw new Error(data.message || 'Flutterwave error');
  return data.data;
}

// Verify a transaction after payment
export async function verifyTransaction(secretKey: string, transactionId: string) {
  const data = await flwRequest(secretKey, 'GET', `/transactions/${transactionId}/verify`);
  return {
    success: data.status === 'successful',
    amount: data.amount, // Already in naira
    currency: data.currency,
    txRef: data.tx_ref,
    flwRef: data.flw_ref,
    email: data.customer?.email
  };
}

// Verify webhook signature
export function verifyWebhookSignature(secretHash: string, signature: string): boolean {
  return signature === secretHash;
}

// Get public key for frontend
export function getPublicKey(): string {
  return process.env.VITE_FLW_PUBLIC_KEY || process.env.FLW_PUBLIC_KEY || '';
}
