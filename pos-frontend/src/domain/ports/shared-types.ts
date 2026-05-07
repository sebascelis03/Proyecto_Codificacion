// domain/ports/shared-types.ts
// Shared types used across multiple ports — no framework imports allowed

export interface SearchOptions {
  readonly page: number;
  readonly pageSize: number;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

export interface LogContext {
  readonly userId?: string;
  readonly terminalId?: string;
  readonly shiftId?: string;
  readonly transactionId?: string;
  readonly correlationId: string;
  readonly [key: string]: unknown;
}

export type PaymentTenderType = 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'qr_code' | 'customer_credit';

export interface PaymentRequest {
  readonly transactionId: string;
  readonly amount: number; // in cents
  readonly currency: string;
  readonly tenderType: PaymentTenderType;
  readonly terminalId: string;
  readonly reference?: string;
}

export interface PaymentSession {
  readonly sessionId: string;
  readonly transactionId: string;
  readonly tenderType: PaymentTenderType;
  readonly amount: number; // in cents
  readonly currency: string;
  readonly createdAt: Date;
  readonly expiresAt: Date;
}

export type PaymentStatus = 'pending' | 'processing' | 'approved' | 'declined' | 'cancelled' | 'error';

export interface PaymentResult {
  readonly sessionId: string;
  readonly status: PaymentStatus;
  readonly approvalCode: string | null;
  readonly errorCode: string | null;
  readonly errorMessage: string | null;
  readonly processedAt: Date;
}

export interface PrintResult {
  readonly success: boolean;
  readonly errorMessage: string | null;
}

export interface AuthCredentials {
  readonly username: string;
  readonly password: string;
}

export interface MfaChallenge {
  readonly challengeId: string;
  readonly method: 'totp' | 'sms' | 'email';
  readonly expiresAt: Date;
}

export interface AuthSession {
  readonly userId: string;
  readonly username: string;
  readonly role: string;
  readonly terminalId: string;
  readonly branchId: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: Date;
}

export interface DiscountValidationResult {
  readonly isValid: boolean;
  readonly discountId: string | null;
  readonly discountValue: number | null; // in cents or percentage
  readonly discountType: 'percentage' | 'fixed_amount' | null;
  readonly errorMessage: string | null;
}

export interface SyncStatus {
  readonly pendingCount: number;
  readonly lastSyncedAt: Date | null;
  readonly isSyncing: boolean;
}

export interface MetricEvent {
  readonly name: string;
  readonly value: number;
  readonly unit: string;
  readonly tags: Record<string, string>;
  readonly timestamp: Date;
}
