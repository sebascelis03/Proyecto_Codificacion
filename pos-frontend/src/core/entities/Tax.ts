// domain/entities/Tax.ts
// Pure domain entity — no framework imports allowed

export interface Tax {
  readonly id: string;
  readonly name: string;
  /** Tax rate as a percentage (e.g. 16 for 16%) */
  readonly rate: number;
  readonly branchId: string;
  readonly isActive: boolean;
  /** Taxes apply only to transactions created after this date */
  readonly effectiveFrom: Date;
}
