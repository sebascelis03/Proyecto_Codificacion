// domain/ports/repositories/ITransactionRepository.ts
// Port interface — no implementations here
import { Transaction } from '../../entities/Transaction';
import { TransactionId } from '../../value-objects/TransactionId';
import { PaginatedResult, SearchOptions } from '../shared-types';

export interface TransactionSearchOptions extends SearchOptions {
  readonly customerId?: string;
  readonly cashierId?: string;
  readonly shiftId?: string;
  readonly dateFrom?: Date;
  readonly dateTo?: Date;
}

export interface ITransactionRepository {
  findById(id: TransactionId): Promise<Transaction | null>;
  findByShiftId(shiftId: string): Promise<readonly Transaction[]>;
  search(query: string, options: TransactionSearchOptions): Promise<PaginatedResult<Transaction>>;
  findPendingSync(): Promise<readonly Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}
