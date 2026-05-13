// domain/ports/services/ILoggingService.ts
// Port interface — no implementations here
import { LogContext } from '../shared-types';

export interface ILoggingService {
  info(event: string, context: LogContext): void;
  warn(event: string, context: LogContext): void;
  error(event: string, error: Error, context: LogContext): void;
}
