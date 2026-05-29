// lib/nowpayments.ts - NowPayments Crypto Integration

const NP_BASE = 'https://api.nowpayments.io/v1';

async function npRequest(apiKey: string, method: string, path: string, body?: any) {
  const res = await fetch(`${NP_BASE}${path}`, {
    method,
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  return res.json();
}

// Create a crypto payment
export async function createPayment(apiKey: string, amountUsd: number, orderId: string, orderDescription: string, ipnCallbackUrl: string) {
  const data = await npRequest(apiKey, 'POST', '/payment', {
    price_amount: amountUsd,
    price_currency: 'usd',
    pay_currency: 'usdttrc20', // Default to USDT TRC20
    order_id: orderId,
    order_description: orderDescription,
    ipn_callback_url: ipnCallbackUrl,
    is_fee_paid_by_user: false
  });
  return {
    paymentId: data.payment_id,
    payAddress: data.pay_address,
    payCurrency: data.pay_currency,
    payAmount: data.pay_amount,
    status: data.payment_status,
    expiresAt: data.expiration_estimate_date
  };
}

// Get payment status
export async function getPaymentStatus(apiKey: string, paymentId: string) {
  const data = await npRequest(apiKey, 'GET', `/payment/${paymentId}`);
  return {
    paymentId: data.payment_id,
    status: data.payment_status, // waiting, confirming, confirmed, sending, partially_paid, finished, failed, refunded, expired
    actuallyPaid: data.actually_paid,
    payAmount: data.pay_amount,
    orderId: data.order_id
  };
}

// Get available currencies
export async function getAvailableCurrencies(apiKey: string) {
  const data = await npRequest(apiKey, 'GET', '/full-currencies');
  return data.selectedCurrencies || [];
}

// Verify IPN (webhook) signature
export async function verifyIpnSignature(ipnSecretKey: string, body: string, signature: string): Promise<boolean> {
  const crypto = await import('crypto');
  const sortedBody = JSON.stringify(JSON.parse(body), Object.keys(JSON.parse(body)).sort());
  const hash = crypto.createHmac('sha512', ipnSecretKey).update(sortedBody).digest('hex');
  return hash === signature;
}

// Is payment finished/confirmed?
export function isPaymentConfirmed(status: string): boolean {
  return ['finished', 'confirmed', 'sending'].includes(status);
}
