// domain/entities/InventoryItem.ts
// Pure domain entity — no framework imports allowed

export interface StockAdjustment {
  readonly id: string;
  readonly inventoryItemId: string;
  readonly stockBefore: number;
  readonly stockAfter: number;
  readonly reason: string;
  readonly authorizedBy: string; // Manager user ID
  readonly adjustedAt: Date;
}

export interface InventoryItem {
  readonly id: string;
  readonly productId: string;
  readonly branchId: string;
  readonly stock: number;
  readonly minimumThreshold: number;
  readonly updatedAt: Date;
}
