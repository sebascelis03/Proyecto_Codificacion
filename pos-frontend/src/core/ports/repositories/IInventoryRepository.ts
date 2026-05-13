// domain/ports/repositories/IInventoryRepository.ts
// Port interface — no implementations here
import { InventoryItem, StockAdjustment } from '../../entities/InventoryItem';

export interface IInventoryRepository {
  findByProductId(productId: string): Promise<InventoryItem | null>;
  findByBranchId(branchId: string): Promise<readonly InventoryItem[]>;
  findBelowThreshold(branchId: string): Promise<readonly InventoryItem[]>;
  save(item: InventoryItem): Promise<void>;
  saveAdjustment(adjustment: StockAdjustment): Promise<void>;
  findAdjustmentsByProduct(productId: string): Promise<readonly StockAdjustment[]>;
}
