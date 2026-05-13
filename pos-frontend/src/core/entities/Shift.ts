// domain/entities/Shift.ts
// Pure domain entity — no framework imports allowed
import { Money } from '../value-objects/Money';

export type ShiftStatus = 'open' | 'closed';

export interface ShiftTenderSummary {
  readonly tenderType: string;
  readonly totalAmount: Money;
  readonly transactionCount: number;
}

export interface Shift {
  readonly id: string;
  readonly cashierId: string;
  readonly terminalId: string;
  readonly branchId: string;
  readonly status: ShiftStatus;
  readonly openedAt: Date;
  readonly closedAt: Date | null;
  readonly openingCash: Money;
  readonly closingCash: Money | null;
  /** Expected closing cash = opening cash + net cash sales */
  readonly expectedCash: Money | null;
  readonly cashDifference: Money | null;
  readonly tenderSummaries: readonly ShiftTenderSummary[];
}
