// domain/entities/Receipt.ts
// Pure domain entity — no framework imports allowed
import { Money } from '../value-objects/Money';
import { TransactionId } from '../value-objects/TransactionId';
import { TenderEntry } from './Transaction';

export interface ReceiptLineItem {
  readonly productName: string;
  readonly sku: string;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly discountAmount: Money;
  readonly lineTotal: Money;
}

export interface Receipt {
  readonly id: string;
  readonly transactionId: TransactionId;
  readonly isDuplicate: boolean;
  readonly companyName: string;
  readonly branchAddress: string;
  readonly logoUrl: string | null;
  readonly lineItems: readonly ReceiptLineItem[];
  readonly subtotal: Money;
  readonly taxAmount: Money;
  readonly discountAmount: Money;
  readonly total: Money;
  readonly tenders: readonly TenderEntry[];
  readonly change: Money;
  readonly cashierName: string;
  readonly terminalId: string;
  readonly issuedAt: Date;
}
