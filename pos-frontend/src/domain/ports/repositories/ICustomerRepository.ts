// domain/ports/repositories/ICustomerRepository.ts
// Port interface — no implementations here
import { Customer, LoyaltyAccount } from '../../entities/Customer';
import { Email } from '../../value-objects/Email';
import { PaginatedResult, SearchOptions } from '../shared-types';

export interface ICustomerRepository {
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: Email): Promise<Customer | null>;
  search(query: string, options: SearchOptions): Promise<PaginatedResult<Customer>>;
  save(customer: Customer): Promise<void>;
  findLoyaltyAccount(customerId: string): Promise<LoyaltyAccount | null>;
  saveLoyaltyAccount(account: LoyaltyAccount): Promise<void>;
}
