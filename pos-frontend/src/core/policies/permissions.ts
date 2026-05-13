// domain/policies/permissions.ts
// Pure domain — no framework imports allowed

export const PERMISSIONS = {
  SALES_CREATE: 'sales:create',
  SALES_VOID: 'sales:void',
  SALES_REFUND: 'sales:refund',
  DISCOUNT_APPLY_ITEM: 'discount:apply:item',
  DISCOUNT_APPLY_GLOBAL: 'discount:apply:global',
  REPORTS_VIEW: 'reports:view',
  REPORTS_EXPORT: 'reports:export',
  INVENTORY_ADJUST: 'inventory:adjust',
  INVENTORY_TRANSFER: 'inventory:transfer',
  CUSTOMERS_EDIT: 'customers:edit',
  SETTINGS_MANAGE: 'settings:manage',
  TERMINALS_MANAGE: 'terminals:manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
