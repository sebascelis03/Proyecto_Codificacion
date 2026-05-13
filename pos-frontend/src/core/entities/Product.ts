// domain/entities/Product.ts
// Pure domain entity — no framework imports allowed
import { Money } from '../value-objects/Money';
import { SKU } from '../value-objects/SKU';

export interface ProductVariant {
  readonly id: string;
  readonly name: string;
  readonly attributes: Record<string, string>;
  readonly priceModifier: Money; // additional cost on top of base price
  readonly stock: number;
}

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly parentId: string | null;
  readonly isActive: boolean;
}

export interface Product {
  readonly id: string;
  readonly sku: SKU;
  readonly name: string;
  readonly price: Money;
  readonly stock: number;
  readonly categoryId: string;
  readonly variants: readonly ProductVariant[];
  readonly isActive: boolean;
  readonly imageUrl: string | null;
  readonly unitOfMeasure: string;
}
