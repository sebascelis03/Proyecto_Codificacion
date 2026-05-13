// domain/entities/Cart.ts
// Pure domain entity — no framework imports allowed
import { CartItem } from './CartItem';
import { Discount } from './Discount';

export type CartStatus = 'active' | 'on-hold' | 'completed' | 'voided';

export interface Cart {
  readonly id: string;
  readonly items: readonly CartItem[];
  readonly customerId: string | null;
  /** Cart-level discounts applied */
  readonly discounts: readonly Discount[];
  readonly couponCode: string | null;
  readonly status: CartStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
