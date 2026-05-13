import { describe, it, expect } from 'vitest';
import { TransactionId } from '../TransactionId';

describe('TransactionId', () => {
  describe('TransactionId.of', () => {
    it('creates a TransactionId from a valid UUID v4', () => {
      const id = TransactionId.of('550e8400-e29b-41d4-a716-446655440000');
      // Note: this is a v4 UUID (4 in position 13)
      const validV4 = '550e8400-e29b-4000-a716-446655440000';
      const tid = TransactionId.of(validV4);
      expect(tid.value).toBe(validV4);
    });

    it('normalizes to lowercase', () => {
      const uuid = '550E8400-E29B-4000-A716-446655440000';
      const tid = TransactionId.of(uuid);
      expect(tid.value).toBe(uuid.toLowerCase());
    });

    it('trims whitespace', () => {
      const uuid = '  550e8400-e29b-4000-a716-446655440000  ';
      const tid = TransactionId.of(uuid);
      expect(tid.value).toBe('550e8400-e29b-4000-a716-446655440000');
    });

    it('throws for non-UUID string', () => {
      expect(() => TransactionId.of('not-a-uuid')).toThrow('Invalid TransactionId');
    });

    it('throws for UUID v1 (version digit is 1)', () => {
      expect(() => TransactionId.of('550e8400-e29b-11d4-a716-446655440000')).toThrow(
        'Invalid TransactionId',
      );
    });

    it('throws for UUID v3 (version digit is 3)', () => {
      expect(() => TransactionId.of('550e8400-e29b-31d4-a716-446655440000')).toThrow(
        'Invalid TransactionId',
      );
    });

    it('throws for empty string', () => {
      expect(() => TransactionId.of('')).toThrow('Invalid TransactionId');
    });

    it('throws for UUID missing hyphens', () => {
      expect(() => TransactionId.of('550e8400e29b4000a716446655440000')).toThrow(
        'Invalid TransactionId',
      );
    });
  });

  describe('TransactionId.generate', () => {
    it('generates a valid UUID v4', () => {
      const tid = TransactionId.generate();
      // UUID v4 pattern
      expect(tid.value).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
    });

    it('generates unique IDs on each call', () => {
      const ids = new Set(Array.from({ length: 100 }, () => TransactionId.generate().value));
      expect(ids.size).toBe(100);
    });
  });

  describe('toString', () => {
    it('returns the UUID value', () => {
      const uuid = '550e8400-e29b-4000-a716-446655440000';
      expect(TransactionId.of(uuid).toString()).toBe(uuid);
    });
  });

  describe('equals', () => {
    it('returns true for identical IDs', () => {
      const uuid = '550e8400-e29b-4000-a716-446655440000';
      expect(TransactionId.of(uuid).equals(TransactionId.of(uuid))).toBe(true);
    });

    it('returns false for different IDs', () => {
      const a = TransactionId.generate();
      const b = TransactionId.generate();
      expect(a.equals(b)).toBe(false);
    });
  });
});
