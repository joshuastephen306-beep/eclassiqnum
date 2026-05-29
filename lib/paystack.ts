// lib/paystack.ts - Paystack Payment Integration

const PAYSTACK_BASE = 'https://api.paystack.co';

async function paystackRequest(secretKey: string, method: string, path: string, body?: any) {
  const res = await fetch(`${PAYSTACK_BASE}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!data.status) throw new Error(data.message || 'Paystack error');
  return data.data;
}

// Initialize a payment transaction
export async function initializeTransaction(secretKey: string, email: string, amountNgn: number, reference: string, callbackUrl: string) {
  return paystackRequest(secretKey, 'POST', '/transaction/initialize', {
    email,
    amount: Math.round(amountNgn * 100), // Paystack uses kobo
    reference,
    callback_url: callbackUrl,
    metadata: { reference }
  });
}

// Verify a transaction after payment
export async function verifyTransaction(secretKey: string, reference: string) {
  const data = await paystackRequest(secretKey, 'GET', `/transaction/verify/${reference}`);
  return {
    success: data.status === 'success',
    amount: data.amount / 100, // Convert kobo back to naira
    reference: data.reference,
    email: data.customer?.email
  };
}

// Create dedicated virtual account for a user (for bank transfer)
export async function createDedicatedVirtualAccount(secretKey: string, email: string, name: string, customerId?: string) {
  try {
    // First create or get customer
    let customer = customerId;
    if (!customer) {
      const cust = await paystackRequest(secretKey, 'POST', '/customer', {
        email, first_name: name.split(' ')[0], last_name: name.split(' ').slice(1).join(' ') || 'User'
      });
      customer = cust.customer_code;
    }

    // Create dedicated virtual account
    const dva = await paystackRequest(secretKey, 'POST', '/dedicated_account', {
      customer, preferred_bank: 'wema-bank'
    });

    return {
      accountNumber: dva.account_number,
      bankName: dva.bank?.name || 'Wema Bank',
      accountName: dva.account_name,
      customerCode: customer
    };
  } catch (err: any) {
    // DVA may not be available on test mode
    console.error('DVA creation failed:', err.message);
    return null;
  }
}

// Verify webhook signature
export async function verifyWebhookSignature(secretKey: string, body: string, signature: string): Promise<boolean> {
  const crypto = await import('crypto');
  const hash = crypto.createHmac('sha512', secretKey).update(body).digest('hex');
  return hash === signature;
}

// Charge card via Paystack inline (frontend handles this, we just verify)
export async function getPublicKey(): Promise<string> {
  return process.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || '';
}
