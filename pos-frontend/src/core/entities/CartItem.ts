// domain/entities/CartItem.ts
// Pure domain entity — no framework imports allowed
import { Money } from '../value-objects/Money';
import { Discount } from './Discount';

export interface CartItem {
  readonly id: string;
  readonly productId: string;
  readonly productName: string;
  readonly sku: string;
  readonly variantId: string | null;
  readonly quantity: number;
  /** Unit price at the time of adding to cart (in Money) */
  readonly unitPrice: Money;
  /** Item-level discounts applied */
  readonly discounts: readonly Discount[];
}
