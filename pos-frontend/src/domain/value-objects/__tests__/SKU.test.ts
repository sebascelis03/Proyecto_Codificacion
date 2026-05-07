import { describe, it, expect } from 'vitest';
import { SKU } from '../SKU';

describe('SKU', () => {
  describe('SKU.of', () => {
    it('creates a SKU from a valid alphanumeric string', () => {
      const sku = SKU.of('ABC123');
      expect(sku.value).toBe('ABC123');
    });

    it('normalizes to uppercase', () => {
      const sku = SKU.of('abc123');
      expect(sku.value).toBe('ABC123');
    });

    it('accepts SKUs with hyphens in the middle', () => {
      const sku = SKU.of('ABC-123');
      expect(sku.value).toBe('ABC-123');
    });

    it('accepts minimum length SKU (2 chars)', () => {
      const sku = SKU.of('AB');
      expect(sku.value).toBe('AB');
    });

    it('accepts maximum length SKU (20 chars)', () => {
      const sku = SKU.of('ABCDEFGHIJ1234567890');
      expect(sku.value).toBe('ABCDEFGHIJ1234567890');
    });

    it('trims whitespace before validation', () => {
      const sku = SKU.of('  ABC123  ');
      expect(sku.value).toBe('ABC123');
    });

    it('throws for empty string', () => {
      expect(() => SKU.of('')).toThrow('Invalid SKU format');
    });

    it('throws for single character', () => {
      expect(() => SKU.of('A')).toThrow('Invalid SKU format');
    });

    it('throws for SKU with leading hyphen', () => {
      expect(() => SKU.of('-ABC123')).toThrow('Invalid SKU format');
    });

    it('throws for SKU with trailing hyphen', () => {
      expect(() => SKU.of('ABC123-')).toThrow('Invalid SKU format');
    });

    it('throws for SKU exceeding 20 characters', () => {
      expect(() => SKU.of('ABCDEFGHIJ12345678901')).toThrow('Invalid SKU format');
    });

    it('throws for SKU with special characters', () => {
      expect(() => SKU.of('ABC@123')).toThrow('Invalid SKU format');
    });
  });

  describe('toString', () => {
    it('returns the SKU value', () => {
      expect(SKU.of('PROD-001').toString()).toBe('PROD-001');
    });
  });

  describe('equals', () => {
    it('returns true for identical SKUs', () => {
      expect(SKU.of('ABC123').equals(SKU.of('ABC123'))).toBe(true);
    });

    it('returns false for different SKUs', () => {
      expect(SKU.of('ABC123').equals(SKU.of('XYZ999'))).toBe(false);
    });
  });
});
