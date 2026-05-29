// lib/hero-sms.ts - Hero SMS API Integration
// Compatible with SMS-Activate API protocol

const HERO_SMS_BASE = 'https://hero-sms.com/stubs/handler.php';

// Service code mapping (Hero SMS uses short codes)
const SERVICE_CODES: Record<string, string> = {
  'whatsapp': 'wa', 'telegram': 'tg', 'google': 'go', 'facebook': 'fb',
  'instagram': 'ig', 'tiktok': 'tk', 'twitter': 'tw', 'discord': 'ds',
  'fiverr': 'fv', 'upwork': 'uw', 'paypal': 'pp', 'amazon': 'am',
  'microsoft': 'ms', 'apple': 'ap', 'linkedin': 'li', 'uber': 'ub',
  'airbnb': 'ab', 'netflix': 'nf', 'spotify': 'sp', 'binance': 'bn',
  'coinbase': 'cb', 'bybit': 'by', 'wise': 'ws', 'payoneer': 'py',
  'openai': 'oa', 'ebay': 'eb', 'tinder': 'td', 'snapchat': 'sc',
  'pinterest': 'pt', 'zoom': 'zm', 'github': 'gh', 'wechat': 'wc',
  'viber': 'vi', 'other': 'ot'
};

// Country ID mapping (Hero SMS country IDs)
const COUNTRY_IDS: Record<string, number> = {
  'Russia': 0, 'Ukraine': 1, 'USA': 187, 'United Kingdom': 16,
  'Nigeria': 7, 'Ghana': 35, 'Kenya': 33, 'South Africa': 206,
  'India': 22, 'Indonesia': 6, 'Philippines': 4, 'Vietnam': 10,
  'France': 78, 'Germany': 43, 'Spain': 114, 'Italy': 86,
  'Brazil': 73, 'Mexico': 44, 'Turkey': 52, 'Egypt': 20,
  'UAE': 56, 'Saudi Arabia': 139, 'Canada': 36, 'Australia': 61,
  'Japan': 64, 'China': 62, 'Morocco': 212, 'Cameroon': 237,
  'Senegal': 221, 'Uganda': 92, 'Rwanda': 88, 'Netherlands': 31,
  'Belgium': 32, 'Sweden': 46, 'Poland': 48, 'Colombia': 57
};

async function heroRequest(apiKey: string, params: Record<string, string>): Promise<string> {
  const url = new URL(HERO_SMS_BASE);
  url.searchParams.set('api_key', apiKey);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), { method: 'GET' });
  const text = await res.text();
  return text.trim();
}

export async function getBalance(apiKey: string): Promise<number> {
  const result = await heroRequest(apiKey, { action: 'getBalance' });
  // Response: ACCESS_BALANCE:XX.XX
  if (result.startsWith('ACCESS_BALANCE:')) {
    return parseFloat(result.split(':')[1]);
  }
  throw new Error(`Hero SMS balance error: ${result}`);
}

export async function getNumber(apiKey: string, service: string, country: string): Promise<{ activationId: string; phoneNumber: string } | null> {
  const serviceCode = SERVICE_CODES[service.toLowerCase()] || SERVICE_CODES[service] || 'ot';
  const countryId = COUNTRY_IDS[country] ?? 0;

  const result = await heroRequest(apiKey, {
    action: 'getNumber',
    service: serviceCode,
    country: String(countryId)
  });

  // Response: ACCESS_NUMBER:ACTIVATION_ID:PHONE_NUMBER
  if (result.startsWith('ACCESS_NUMBER:')) {
    const parts = result.split(':');
    return { activationId: parts[1], phoneNumber: parts[2] };
  }

  // No numbers available or error
  if (result === 'NO_NUMBERS' || result === 'NO_BALANCE' || result.startsWith('BAD')) {
    return null;
  }

  return null;
}

export async function markReadyForSms(apiKey: string, activationId: string): Promise<void> {
  await heroRequest(apiKey, { action: 'setStatus', id: activationId, status: '1' });
}

export async function getStatus(apiKey: string, activationId: string): Promise<{ status: string; code?: string }> {
  const result = await heroRequest(apiKey, { action: 'getStatus', id: activationId });

  if (result.startsWith('STATUS_OK:')) {
    return { status: 'received', code: result.split(':')[1] };
  }
  if (result === 'STATUS_WAIT_CODE') return { status: 'waiting' };
  if (result === 'STATUS_CANCEL') return { status: 'cancelled' };
  if (result === 'STATUS_WAIT_RESEND') return { status: 'waiting' };

  return { status: 'waiting' };
}

export async function cancelActivation(apiKey: string, activationId: string): Promise<void> {
  await heroRequest(apiKey, { action: 'setStatus', id: activationId, status: '8' });
}

export async function requestResend(apiKey: string, activationId: string): Promise<void> {
  await heroRequest(apiKey, { action: 'setStatus', id: activationId, status: '3' });
}

export async function completeActivation(apiKey: string, activationId: string): Promise<void> {
  await heroRequest(apiKey, { action: 'setStatus', id: activationId, status: '6' });
}

// Poll for SMS code with retry
export async function pollForCode(apiKey: string, activationId: string, maxAttempts = 24, intervalMs = 5000): Promise<string | null> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, intervalMs));
    try {
      const status = await getStatus(apiKey, activationId);
      if (status.status === 'received' && status.code) {
        return status.code;
      }
      if (status.status === 'cancelled') return null;
    } catch (_) {}
  }
  return null;
}
