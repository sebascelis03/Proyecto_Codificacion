// domain/policies/roles.ts
// Pure domain — no framework imports allowed

import { type UserRole } from '../entities/User';
import { PERMISSIONS, type Permission } from './permissions';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  cashier: [PERMISSIONS.SALES_CREATE, PERMISSIONS.DISCOUNT_APPLY_ITEM],
  manager: [
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_VOID,
    PERMISSIONS.SALES_REFUND,
    PERMISSIONS.DISCOUNT_APPLY_ITEM,
    PERMISSIONS.DISCOUNT_APPLY_GLOBAL,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.INVENTORY_ADJUST,
    PERMISSIONS.INVENTORY_TRANSFER,
    PERMISSIONS.CUSTOMERS_EDIT,
  ],
  admin: Object.values(PERMISSIONS) as Permission[],
};

/**
 * Pure function that checks whether a given role has a specific permission.
 *
 * @param role - The user's role ('cashier' | 'manager' | 'admin')
 * @param permission - The permission string to check
 * @returns true if the role has the permission, false otherwise
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
