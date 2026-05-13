// domain/value-objects/PhoneNumber.ts
// Accepts E.164 format: +[country code][number], 7-15 digits total after the +
// Examples: "+15551234567", "+441234567890", "+525512345678"
const E164_PATTERN = /^\+[1-9]\d{6,14}$/;

export class PhoneNumber {
  private constructor(readonly value: string) {}

  static of(value: string): PhoneNumber {
    const normalized = value.trim().replace(/[\s\-().]/g, '');
    if (!E164_PATTERN.test(normalized)) {
      throw new Error(
        `Invalid phone number: "${value}". Expected E.164 format (e.g. +15551234567).`,
      );
    }
    return new PhoneNumber(normalized);
  }

  toString(): string {
    return this.value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }
}
