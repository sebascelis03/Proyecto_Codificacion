// domain/entities/Discount.ts
// Pure domain entity — no framework imports allowed

export type DiscountType = 'percentage' | 'fixed_amount';
export type DiscountScope = 'item' | 'cart';

export interface Discount {
  readonly id: string;
  readonly name: string;
  readonly type: DiscountType;
  /** Value: percentage (0–100) or fixed amount in cents */
  readonly value: number;
  readonly scope: DiscountScope;
  readonly isActive: boolean;
  readonly validFrom: Date | null;
  readonly validUntil: Date | null;
  /** If set, discount only applies to this product */
  readonly productId: string | null;
  /** If set, discount only applies to this category */
  readonly categoryId: string | null;
}

export interface Coupon {
  readonly id: string;
  readonly code: string;
  readonly discountId: string;
  readonly usageLimit: number | null;
  readonly usageCount: number;
  readonly isActive: boolean;
  readonly validFrom: Date | null;
  readonly validUntil: Date | null;
}
