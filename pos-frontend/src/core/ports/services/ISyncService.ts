// domain/ports/services/ISyncService.ts
// Port interface — no implementations here
import { SyncStatus } from '../shared-types';

export interface ISyncService {
  /** Trigger synchronization of all pending transactions */
  sync(): Promise<void>;
  /** Get current sync status */
  getStatus(): SyncStatus;
  /** Queue a transaction for later sync */
  enqueue(transactionId: string): Promise<void>;
  /** Subscribe to sync status changes */
  onStatusChange(callback: (status: SyncStatus) => void): () => void;
}
