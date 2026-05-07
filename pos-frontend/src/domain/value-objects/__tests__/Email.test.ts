import { describe, it, expect } from 'vitest';
import { Email } from '../Email';

describe('Email', () => {
  describe('Email.of', () => {
    it('creates an Email from a valid address', () => {
      const email = Email.of('user@example.com');
      expect(email.value).toBe('user@example.com');
    });

    it('normalizes to lowercase', () => {
      const email = Email.of('User@Example.COM');
      expect(email.value).toBe('user@example.com');
    });

    it('trims whitespace', () => {
      const email = Email.of('  user@example.com  ');
      expect(email.value).toBe('user@example.com');
    });

    it('accepts email with subdomain', () => {
      const email = Email.of('user@mail.example.com');
      expect(email.value).toBe('user@mail.example.com');
    });

    it('accepts email with plus tag', () => {
      const email = Email.of('user+tag@example.com');
      expect(email.value).toBe('user+tag@example.com');
    });

    it('accepts email with dots in local part', () => {
      const email = Email.of('first.last@example.com');
      expect(email.value).toBe('first.last@example.com');
    });

    it('throws for missing @ symbol', () => {
      expect(() => Email.of('userexample.com')).toThrow('Invalid email address');
    });

    it('throws for missing domain', () => {
      expect(() => Email.of('user@')).toThrow('Invalid email address');
    });

    it('throws for missing TLD', () => {
      expect(() => Email.of('user@example')).toThrow('Invalid email address');
    });

    it('throws for empty string', () => {
      expect(() => Email.of('')).toThrow('Invalid email address');
    });

    it('throws for multiple @ symbols', () => {
      expect(() => Email.of('user@@example.com')).toThrow('Invalid email address');
    });
  });

  describe('toString', () => {
    it('returns the email value', () => {
      expect(Email.of('user@example.com').toString()).toBe('user@example.com');
    });
  });

  describe('equals', () => {
    it('returns true for identical emails', () => {
      expect(Email.of('user@example.com').equals(Email.of('user@example.com'))).toBe(true);
    });

    it('returns true regardless of original casing', () => {
      expect(Email.of('User@Example.COM').equals(Email.of('user@example.com'))).toBe(true);
    });

    it('returns false for different emails', () => {
      expect(Email.of('a@example.com').equals(Email.of('b@example.com'))).toBe(false);
    });
  });
});
