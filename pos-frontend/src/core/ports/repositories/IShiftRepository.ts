// domain/ports/repositories/IShiftRepository.ts
// Port interface — no implementations here
import { Shift } from '../../entities/Shift';

export interface IShiftRepository {
  findById(id: string): Promise<Shift | null>;
  findActiveByTerminalId(terminalId: string): Promise<Shift | null>;
  findActiveByBranchId(branchId: string): Promise<readonly Shift[]>;
  save(shift: Shift): Promise<void>;
}
