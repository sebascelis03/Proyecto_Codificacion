// domain/entities/User.ts
// Pure domain entity — no framework imports allowed
import { Email } from '../value-objects/Email';

export type UserRole = 'cashier' | 'manager' | 'admin';

export interface User {
  readonly id: string;
  readonly username: string;
  readonly email: Email;
  readonly role: UserRole;
  readonly branchId: string;
  readonly isActive: boolean;
  readonly mfaEnabled: boolean;
  readonly createdAt: Date;
  readonly lastLoginAt: Date | null;
}
