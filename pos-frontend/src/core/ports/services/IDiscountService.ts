// domain/ports/services/IDiscountService.ts
// Port interface — no implementations here
import { DiscountValidationResult } from '../shared-types';

export interface IDiscountService {
  validateCoupon(code: string, cartTotal: number, currency: string): Promise<DiscountValidationResult>;
  validateDiscount(discountId: string): Promise<DiscountValidationResult>;
}
