import { describe, it, expect } from 'vitest';
import { PhoneNumber } from '../PhoneNumber';

describe('PhoneNumber', () => {
  describe('PhoneNumber.of', () => {
    it('creates a PhoneNumber from a valid E.164 number', () => {
      const phone = PhoneNumber.of('+15551234567');
      expect(phone.value).toBe('+15551234567');
    });

    it('accepts international numbers', () => {
      const phone = PhoneNumber.of('+441234567890');
      expect(phone.value).toBe('+441234567890');
    });

    it('accepts Mexican numbers', () => {
      const phone = PhoneNumber.of('+525512345678');
      expect(phone.value).toBe('+525512345678');
    });

    it('strips spaces from input', () => {
      const phone = PhoneNumber.of('+1 555 123 4567');
      expect(phone.value).toBe('+15551234567');
    });

    it('strips hyphens from input', () => {
      const phone = PhoneNumber.of('+1-555-123-4567');
      expect(phone.value).toBe('+15551234567');
    });

    it('strips parentheses from input', () => {
      const phone = PhoneNumber.of('+1(555)1234567');
      expect(phone.value).toBe('+15551234567');
    });

    it('trims whitespace', () => {
      const phone = PhoneNumber.of('  +15551234567  ');
      expect(phone.value).toBe('+15551234567');
    });

    it('throws for number without + prefix', () => {
      expect(() => PhoneNumber.of('15551234567')).toThrow('Invalid phone number');
    });

    it('throws for empty string', () => {
      expect(() => PhoneNumber.of('')).toThrow('Invalid phone number');
    });

    it('throws for number that is too short', () => {
      // Less than 7 digits after country code
      expect(() => PhoneNumber.of('+1234')).toThrow('Invalid phone number');
    });

    it('throws for number that is too long', () => {
      // More than 15 digits total
      expect(() => PhoneNumber.of('+12345678901234567')).toThrow('Invalid phone number');
    });

    it('throws for number with letters', () => {
      expect(() => PhoneNumber.of('+1555CALL123')).toThrow('Invalid phone number');
    });
  });

  describe('toString', () => {
    it('returns the phone number value', () => {
      expect(PhoneNumber.of('+15551234567').toString()).toBe('+15551234567');
    });
  });

  describe('equals', () => {
    it('returns true for identical phone numbers', () => {
      expect(PhoneNumber.of('+15551234567').equals(PhoneNumber.of('+15551234567'))).toBe(true);
    });

    it('returns false for different phone numbers', () => {
      expect(PhoneNumber.of('+15551234567').equals(PhoneNumber.of('+15559999999'))).toBe(false);
    });
  });
});
