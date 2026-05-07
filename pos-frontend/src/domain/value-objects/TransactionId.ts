// domain/value-objects/TransactionId.ts
// UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class TransactionId {
  private constructor(readonly value: string) {}

  /**
   * Create a TransactionId from an existing UUID v4 string.
   */
  static of(value: string): TransactionId {
    const normalized = value.trim().toLowerCase();
    if (!UUID_V4_PATTERN.test(normalized)) {
      throw new Error(`Invalid TransactionId: "${value}". Must be a valid UUID v4.`);
    }
    return new TransactionId(normalized);
  }

  /**
   * Generate a new random UUID v4 TransactionId.
   * Uses crypto.randomUUID() when available (Node 14.17+, modern browsers).
   */
  static generate(): TransactionId {
    const uuid = TransactionId.generateUuidV4();
    return new TransactionId(uuid);
  }

  private static generateUuidV4(): string {
    // Use the Web Crypto API if available (browser + Node 19+)
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    // Fallback: manual UUID v4 generation using Math.random
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  toString(): string {
    return this.value;
  }

  equals(other: TransactionId): boolean {
    return this.value === other.value;
  }
}
