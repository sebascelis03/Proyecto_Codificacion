// domain/entities/Transaction.ts
// Pure domain entity — no framework imports allowed
import { Money } from '../value-objects/Money';
import { TransactionId } from '../value-objects/TransactionId';
import { Cart } from './Cart';

export type TenderType = 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'qr_code' | 'customer_credit';

export interface TenderEntry {
  readonly id: string;
  readonly type: TenderType;
  readonly amount: Money;
  readonly reference: string | null;
}

export interface Transaction {
  readonly id: TransactionId;
  /** Immutable snapshot of the cart at the time of completion */
  readonly cartSnapshot: Cart;
  readonly tenders: readonly TenderEntry[];
  readonly subtotal: Money;
  readonly taxAmount: Money;
  readonly discountAmount: Money;
  readonly total: Money;
  readonly cashierId: string;
  readonly terminalId: string;
  readonly shiftId: string;
  readonly completedAt: Date;
  readonly receiptUrl: string | null;
}
