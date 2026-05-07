// domain/ports/services/IPaymentService.ts
// Port interface — no implementations here
import { PaymentRequest, PaymentResult, PaymentSession, PaymentStatus } from '../shared-types';

export interface IPaymentService {
  initiate(request: PaymentRequest): Promise<PaymentSession>;
  confirm(sessionId: string): Promise<PaymentResult>;
  cancel(sessionId: string): Promise<void>;
  getStatus(sessionId: string): Promise<PaymentStatus>;
}
