// domain/entities/Terminal.ts
// Pure domain entity — no framework imports allowed

export type TerminalStatus = 'active' | 'inactive' | 'pending_activation';

export interface Terminal {
  readonly id: string;
  readonly name: string;
  readonly branchId: string;
  readonly activationCode: string;
  readonly status: TerminalStatus;
  readonly activatedAt: Date | null;
  readonly lastSeenAt: Date | null;
}
