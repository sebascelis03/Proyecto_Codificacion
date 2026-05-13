// domain/entities/Customer.ts
// Pure domain entity — no framework imports allowed
import { Email } from '../value-objects/Email';
import { PhoneNumber } from '../value-objects/PhoneNumber';

export interface LoyaltyAccount {
  readonly id: string;
  readonly customerId: string;
  readonly pointsBalance: number;
  readonly lifetimePoints: number;
  readonly tier: string;
  readonly updatedAt: Date;
}

export interface CustomerChangeRecord {
  readonly field: string;
  readonly oldValue: string;
  readonly newValue: string;
  readonly changedBy: string;
  readonly changedAt: Date;
}

export interface Customer {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: Email;
  readonly phone: PhoneNumber | null;
  readonly loyaltyAccountId: string | null;
  readonly creditBalance: number; // in cents
  readonly segment: string | null;
  readonly changeHistory: readonly CustomerChangeRecord[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
