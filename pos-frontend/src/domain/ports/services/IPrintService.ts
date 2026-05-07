// domain/ports/services/IPrintService.ts
// Port interface — no implementations here
import { PrintResult } from '../shared-types';
import { Receipt } from '../../entities/Receipt';
import { Shift } from '../../entities/Shift';

export interface IPrintService {
  printReceipt(receipt: Receipt): Promise<PrintResult>;
  printShiftReport(shift: Shift): Promise<PrintResult>;
  isAvailable(): Promise<boolean>;
}
