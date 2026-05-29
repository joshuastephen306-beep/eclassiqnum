/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = 'en' | 'fr' | 'ar' | 'ha' | 'yo' | 'ig' | 'sw';
export type CurrencyCode = 'NGN' | 'USD';

export interface User {
  id: string;
  email: string;
  name: string;
  walletBalanceNgn: number;
  walletBalanceUsd: number;
  role: 'super_admin' | 'support_admin' | 'user';
  referralCode: string;
  referredBy?: string;
  affiliateEarningsNgn: number;
  affiliateEarningsUsd: number;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface SmsProvider {
  id: string;
  name: string;
  isActive: boolean;
  priority: number; // For weighting
  successRate: number; // percentage
  latencyMs: number;
  failureRate: number;
  errorCount: number;
  costMultiplier: number; // to compute mock provider cost markup
}

export interface VirtualNumber {
  id: string;
  number: string;
  country: string;
  service: string;
  status: 'waiting' | 'received' | 'expired' | 'cancelled';
  priceNgn: number;
  priceUsd: number;
  createdAt: string;
  expiresAt: string;
  sms: SmsMessage[];
  serverId: 1 | 2 | 3;
  providerId: string;
  orderId: string;
  canRenew: boolean;
  userId?: string;
  isRental?: boolean;
  rentalDurationDays?: number;
  autoRenew?: boolean;
}

export interface SmsMessage {
  id: string;
  sender: string;
  text: string;
  receivedAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'purchase' | 'refund' | 'referral_bonus' | 'withdrawal' | 'promo_bonus' | 'manual_credit' | 'manual_debit';
  amountNgn: number;
  amountUsd: number;
  currency: CurrencyCode;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  gateway?: 'paystack' | 'crypto' | 'bank_transfer' | 'card_payment' | 'manual';
  createdAt: string;
}

export interface PromoCode {
  code: string;
  discountPercent?: number; // percentage
  fixedAmountNgn?: number;
  fixedAmountUsd?: number;
  maxUses: number;
  usesCount: number;
  expiresAt: string;
  usedByUsers: string[]; // tracking list
}

export interface SystemConfig {
  globalMarkupPercent: number;
  nairaToDollarRate: number;
  paystackEnabled: boolean;
  cryptoEnabled: boolean;
  bankTransferEnabled: boolean;
  cardPaymentEnabled: boolean;
  manualPaymentEnabled: boolean;
  affiliateCommissionPercent: number;
  heroSmsApiKey: string;
  adminNairaBankDetails: string;
}

export interface AffiliateWithdrawal {
  id: string;
  userId: string;
  name: string;
  email: string;
  amount: number;
  currency: CurrencyCode;
  method: 'bank_transfer' | 'paypal' | 'crypto';
  details: string; // account number, paypal email or address
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
