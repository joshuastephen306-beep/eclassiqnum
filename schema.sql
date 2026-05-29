-- eclassiqnum PostgreSQL Schema
-- Run this in your Supabase SQL Editor

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  wallet_ngn DECIMAL(15,2) DEFAULT 0,
  wallet_usd DECIMAL(10,4) DEFAULT 0,
  role TEXT DEFAULT 'user' CHECK (role IN ('user','support_admin','super_admin')),
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  affiliate_ngn DECIMAL(15,2) DEFAULT 0,
  affiliate_usd DECIMAL(10,4) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','suspended')),
  paystack_customer_id TEXT,
  paystack_virtual_account TEXT,
  paystack_virtual_bank TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRANSACTIONS
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  type TEXT NOT NULL,
  amount_ngn DECIMAL(15,2) DEFAULT 0,
  amount_usd DECIMAL(10,4) DEFAULT 0,
  currency TEXT DEFAULT 'NGN',
  description TEXT,
  status TEXT DEFAULT 'completed',
  gateway TEXT,
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VIRTUAL NUMBERS
CREATE TABLE IF NOT EXISTS virtual_numbers (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  number TEXT NOT NULL,
  country TEXT NOT NULL,
  service TEXT NOT NULL,
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting','received','expired','cancelled')),
  price_ngn DECIMAL(10,2) DEFAULT 0,
  price_usd DECIMAL(8,4) DEFAULT 0,
  server_id INTEGER DEFAULT 1,
  provider_id TEXT,
  hero_activation_id TEXT,
  order_id TEXT,
  is_rental BOOLEAN DEFAULT FALSE,
  rental_days INTEGER,
  auto_renew BOOLEAN DEFAULT FALSE,
  can_renew BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SMS MESSAGES
CREATE TABLE IF NOT EXISTS sms_messages (
  id TEXT PRIMARY KEY,
  number_id TEXT REFERENCES virtual_numbers(id),
  sender TEXT,
  text TEXT,
  received_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROMO CODES
CREATE TABLE IF NOT EXISTS promo_codes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  code TEXT UNIQUE NOT NULL,
  discount_percent DECIMAL(5,2),
  fixed_ngn DECIMAL(10,2),
  fixed_usd DECIMAL(8,4),
  max_uses INTEGER DEFAULT 100,
  uses_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROMO USES (track which user used which promo)
CREATE TABLE IF NOT EXISTS promo_uses (
  promo_id TEXT REFERENCES promo_codes(id),
  user_id TEXT REFERENCES users(id),
  PRIMARY KEY (promo_id, user_id)
);

-- SMS PROVIDERS
CREATE TABLE IF NOT EXISTS sms_providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 50,
  success_rate DECIMAL(5,2) DEFAULT 95,
  latency_ms INTEGER DEFAULT 300,
  failure_rate DECIMAL(5,2) DEFAULT 5,
  cost_multiplier DECIMAL(4,2) DEFAULT 1.0
);

-- SYSTEM CONFIG
CREATE TABLE IF NOT EXISTS system_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- AFFILIATE WITHDRAWALS
CREATE TABLE IF NOT EXISTS affiliate_withdrawals (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  name TEXT,
  email TEXT,
  amount DECIMAL(15,2),
  currency TEXT DEFAULT 'NGN',
  method TEXT,
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COUNTRIES
CREATE TABLE IF NOT EXISTS countries (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag TEXT DEFAULT '🌍',
  is_active BOOLEAN DEFAULT TRUE,
  base_cost_usd DECIMAL(8,4) DEFAULT 0.30,
  hero_country_id INTEGER
);

-- SERVICES
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'Globe',
  base_markup DECIMAL(5,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  hero_service_code TEXT
);

-- LOGIN LOGS
CREATE TABLE IF NOT EXISTS login_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  email TEXT,
  ip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEED DEFAULT DATA
-- ============================================================

-- Default providers
INSERT INTO sms_providers (id, name, is_active, priority, success_rate, latency_ms, failure_rate, cost_multiplier) VALUES
('hero-sms', 'Hero SMS (Primary)', true, 80, 98, 250, 2, 1.0),
('sms-activate', 'SmsActivate (Backup)', true, 50, 92, 580, 8, 1.15),
('sms-receive', 'SmsReceive (Fallback)', true, 30, 89, 920, 11, 1.3)
ON CONFLICT (id) DO NOTHING;

-- Default system config
INSERT INTO system_config (key, value) VALUES
('global_markup_percent', '35'),
('naira_to_dollar_rate', '1550'),
('paystack_enabled', 'true'),
('crypto_enabled', 'true'),
('bank_transfer_enabled', 'true'),
('affiliate_commission_percent', '5'),
('hero_sms_api_key', ''),
('flw_secret_key', ''),
('flw_webhook_hash', ''),
('nowpayments_api_key', ''),
('admin_bank_details', 'Wema Bank | eclassiqnum Tech Inc | 0090874536')
ON CONFLICT (key) DO NOTHING;

-- Default promo codes
INSERT INTO promo_codes (code, discount_percent, max_uses, expires_at) VALUES
('CLASSIC10', 10, 100, '2027-12-31'),
('WELCOME20', 20, 50, '2027-12-31')
ON CONFLICT (code) DO NOTHING;

-- Countries
INSERT INTO countries (code, name, flag, base_cost_usd, hero_country_id) VALUES
('NG', 'Nigeria', '🇳🇬', 0.35, 7),
('US', 'USA', '🇺🇸', 0.25, 0),
('GB', 'United Kingdom', '🇬🇧', 0.28, 16),
('FR', 'France', '🇫🇷', 0.45, 78),
('DE', 'Germany', '🇩🇪', 0.42, 43),
('IN', 'India', '🇮🇳', 0.20, 22),
('RU', 'Russia', '🇷🇺', 0.30, 0),
('UA', 'Ukraine', '🇺🇦', 0.28, 1),
('KE', 'Kenya', '🇰🇪', 0.40, 33),
('GH', 'Ghana', '🇬🇭', 0.38, 89),
('ZA', 'South Africa', '🇿🇦', 0.50, 206),
('CA', 'Canada', '🇨🇦', 0.30, 36),
('AU', 'Australia', '🇦🇺', 0.55, 61),
('BR', 'Brazil', '🇧🇷', 0.35, 73),
('AE', 'UAE', '🇦🇪', 0.60, 971),
('EG', 'Egypt', '🇪🇬', 0.32, 20),
('ID', 'Indonesia', '🇮🇩', 0.25, 62),
('PH', 'Philippines', '🇵🇭', 0.26, 63),
('VN', 'Vietnam', '🇻🇳', 0.22, 84),
('TR', 'Turkey', '🇹🇷', 0.25, 90),
('MX', 'Mexico', '🇲🇽', 0.32, 52),
('PL', 'Poland', '🇵🇱', 0.38, 48),
('ES', 'Spain', '🇪🇸', 0.44, 34),
('IT', 'Italy', '🇮🇹', 0.45, 39),
('JP', 'Japan', '🇯🇵', 0.65, 81),
('SA', 'Saudi Arabia', '🇸🇦', 0.58, 966),
('MA', 'Morocco', '🇲🇦', 0.35, 212),
('CM', 'Cameroon', '🇨🇲', 0.38, 237),
('SN', 'Senegal', '🇸🇳', 0.38, 221),
('RW', 'Rwanda', '🇷🇼', 0.45, 250),
('UG', 'Uganda', '🇺🇬', 0.35, 256),
('CN', 'China', '🇨🇳', 0.50, 86),
('NL', 'Netherlands', '🇳🇱', 0.48, 31),
('BE', 'Belgium', '🇧🇪', 0.55, 32),
('SE', 'Sweden', '🇸🇪', 0.60, 46)
ON CONFLICT (code) DO NOTHING;

-- Services
INSERT INTO services (id, name, base_markup, hero_service_code) VALUES
('whatsapp', 'WhatsApp', 0, 'wa'),
('telegram', 'Telegram', 5, 'tg'),
('google', 'Google', 0, 'go'),
('facebook', 'Facebook', 0, 'fb'),
('instagram', 'Instagram', 0, 'ig'),
('tiktok', 'TikTok', 0, 'tk'),
('twitter', 'Twitter / X', 0, 'tw'),
('discord', 'Discord', 0, 'ds'),
('fiverr', 'Fiverr', 15, 'fv'),
('upwork', 'Upwork', 15, 'uw'),
('paypal', 'PayPal', 20, 'pp'),
('amazon', 'Amazon', 0, 'am'),
('microsoft', 'Microsoft', 0, 'ms'),
('apple', 'Apple ID', 10, 'ap'),
('linkedin', 'LinkedIn', 5, 'li'),
('uber', 'Uber', 0, 'ub'),
('airbnb', 'Airbnb', 10, 'ab'),
('netflix', 'Netflix', 5, 'nf'),
('spotify', 'Spotify', 0, 'sp'),
('binance', 'Binance', 15, 'bn'),
('coinbase', 'Coinbase', 15, 'cb'),
('bybit', 'Bybit', 10, 'by'),
('wise', 'Wise', 20, 'ws'),
('payoneer', 'Payoneer', 20, 'py'),
('openai', 'OpenAI/ChatGPT', 25, 'oa'),
('ebay', 'eBay', 0, 'eb'),
('tinder', 'Tinder', 15, 'td'),
('snapchat', 'Snapchat', 0, 'sc'),
('pinterest', 'Pinterest', 0, 'pt'),
('zoom', 'Zoom', 0, 'zm'),
('github', 'GitHub', 0, 'gh'),
('wechat', 'WeChat', 15, 'wc'),
('viber', 'Viber', 5, 'vi'),
('other', 'Other Services', 0, 'ot')
ON CONFLICT (id) DO NOTHING;

-- Admin user (change password after first login!)
-- Password: Admin@eclassiq2026
INSERT INTO users (id, email, name, password_hash, wallet_ngn, wallet_usd, role, referral_code, status)
VALUES (
  'user_super_admin_001',
  'admin@eclassiqnum.com',
  'Super Admin',
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', -- admin
  100000, 100,
  'super_admin',
  'ADMINREF',
  'active'
) ON CONFLICT (id) DO NOTHING;
