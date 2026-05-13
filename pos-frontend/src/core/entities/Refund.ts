// domain/entities/Refund.ts
// Pure domain entity — no framework imports allowed
import { Money } from '../value-objects/Money';
import { TransactionId } from '../value-objects/TransactionId';
import { TenderType } from './Transaction';

export type RefundType = 'full' | 'partial';

export interface RefundLineItem {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly refundAmount: Money;
}

export interface Refund {
  readonly id: string;
  readonly originalTransactionId: TransactionId;
  readonly type: RefundType;
  readonly lineItems: readonly RefundLineItem[];
  readonly totalAmount: Money;
  readonly refundTender: TenderType;
  readonly authorizedBy: string; // Manager user ID
  readonly processedBy: string; // Cashier user ID
  readonly reason: string;
  readonly processedAt: Date;
}
