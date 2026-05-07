// domain/ports/repositories/IProductRepository.ts
// Port interface — no implementations here
import { Product } from '../../entities/Product';
import { SKU } from '../../value-objects/SKU';
import { PaginatedResult, SearchOptions } from '../shared-types';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findBySku(sku: SKU): Promise<Product | null>;
  search(query: string, options: SearchOptions): Promise<PaginatedResult<Product>>;
  findByCategory(categoryId: string, page: number): Promise<PaginatedResult<Product>>;
  findFrequent(limit: number): Promise<readonly Product[]>;
  save(product: Product): Promise<void>;
}
