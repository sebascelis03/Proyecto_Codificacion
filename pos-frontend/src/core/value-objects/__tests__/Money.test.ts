import { describe, it, expect } from 'vitest';
import { Money } from '../Money';

describe('Money', () => {
  describe('Money.of', () => {
    it('creates a Money instance with valid amount and currency', () => {
      const m = Money.of(1000, 'USD');
      expect(m.amount).toBe(1000);
      expect(m.currency).toBe('USD');
    });

    it('rounds fractional cents on creation', () => {
      const m = Money.of(10.7, 'USD');
      expect(m.amount).toBe(11);
    });

    it('allows zero amount', () => {
      const m = Money.of(0, 'USD');
      expect(m.amount).toBe(0);
    });

    it('throws for negative amounts', () => {
      expect(() => Money.of(-1, 'USD')).toThrow('Money cannot be negative');
    });
  });

  describe('add', () => {
    it('adds two Money values with the same currency', () => {
      const a = Money.of(500, 'USD');
      const b = Money.of(300, 'USD');
      expect(a.add(b).amount).toBe(800);
    });

    it('throws when currencies differ', () => {
      const a = Money.of(500, 'USD');
      const b = Money.of(300, 'EUR');
      expect(() => a.add(b)).toThrow('Currency mismatch: USD vs EUR');
    });

    it('preserves currency on result', () => {
      const a = Money.of(100, 'MXN');
      const b = Money.of(200, 'MXN');
      expect(a.add(b).currency).toBe('MXN');
    });
  });

  describe('subtract', () => {
    it('subtracts two Money values with the same currency', () => {
      const a = Money.of(500, 'USD');
      const b = Money.of(300, 'USD');
      expect(a.subtract(b).amount).toBe(200);
    });

    it('throws when currencies differ', () => {
      const a = Money.of(500, 'USD');
      const b = Money.of(300, 'EUR');
      expect(() => a.subtract(b)).toThrow('Currency mismatch: USD vs EUR');
    });
  });

  describe('multiply', () => {
    it('multiplies amount by a factor', () => {
      const m = Money.of(100, 'USD');
      expect(m.multiply(3).amount).toBe(300);
    });

    it('rounds the result', () => {
      const m = Money.of(100, 'USD');
      // 100 * 1.5 = 150 exactly
      expect(m.multiply(1.5).amount).toBe(150);
    });

    it('rounds fractional result', () => {
      const m = Money.of(100, 'USD');
      // 100 * 0.333 = 33.3 → rounds to 33
      expect(m.multiply(0.333).amount).toBe(33);
    });

    it('preserves currency', () => {
      const m = Money.of(100, 'EUR');
      expect(m.multiply(2).currency).toBe('EUR');
    });
  });

  describe('equals', () => {
    it('returns true for same amount and currency', () => {
      expect(Money.of(100, 'USD').equals(Money.of(100, 'USD'))).toBe(true);
    });

    it('returns false for different amounts', () => {
      expect(Money.of(100, 'USD').equals(Money.of(200, 'USD'))).toBe(false);
    });

    it('returns false for different currencies', () => {
      expect(Money.of(100, 'USD').equals(Money.of(100, 'EUR'))).toBe(false);
    });
  });
});
