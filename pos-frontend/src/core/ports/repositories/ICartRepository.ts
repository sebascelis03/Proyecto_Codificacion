// domain/ports/repositories/ICartRepository.ts
// Port interface — no implementations here
import { Cart } from '../../entities/Cart';

export interface ICartRepository {
  findById(id: string): Promise<Cart | null>;
  findActive(): Promise<readonly Cart[]>;
  save(cart: Cart): Promise<void>;
  delete(id: string): Promise<void>;
}
