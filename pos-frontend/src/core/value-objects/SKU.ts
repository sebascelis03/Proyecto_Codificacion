// domain/value-objects/SKU.ts
// SKU format: 3-20 alphanumeric characters (uppercase letters, digits, hyphens)
// Examples: "ABC-123", "PROD001", "SKU-XYZ-99"
const SKU_PATTERN = /^[A-Z0-9][A-Z0-9-]{1,18}[A-Z0-9]$|^[A-Z0-9]{2,20}$/;

export class SKU {
  private constructor(readonly value: string) {}

  static of(value: string): SKU {
    const trimmed = value.trim().toUpperCase();
    if (!SKU_PATTERN.test(trimmed)) {
      throw new Error(
        `Invalid SKU format: "${value}". SKU must be 2-20 characters, alphanumeric with optional hyphens, no leading/trailing hyphens.`,
      );
    }
    return new SKU(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: SKU): boolean {
    return this.value === other.value;
  }
}
