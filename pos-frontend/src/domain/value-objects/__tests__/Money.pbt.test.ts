/**
 * Property-Based Tests for Money value object
 *
 * Validates: Requirements 1.1 (Domain Layer purity and correctness)
 * Design reference: Design § Value Objects, § PBT Strategy
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { Money } from '../Money';

// Arbitrary: non-negative integer representing cents (0 to 1,000,000 cents = $10,000)
const nonNegativeCents = fc.integer({ min: 0, max: 1_000_000 });

// Arbitrary: currency code (fixed set of valid currencies)
const currency = fc.constantFrom('USD', 'EUR', 'MXN', 'GBP', 'JPY');

// Arbitrary: a pair of Money instances with the same currency
const sameCurrencyPair = fc
  .tuple(nonNegativeCents, nonNegativeCents, currency)
  .map(([a, b, cur]) => [Money.of(a, cur), Money.of(b, cur)] as const);

describe('Money PBT', () => {
  /**
   * Property 1: Commutativity of add
   * For all non-negative integer amounts a and b with the same currency:
   *   a.add(b).amount === b.add(a).amount
   *
   * Validates: Requirements 1.1
   */
  it('add is commutative: a.add(b).amount === b.add(a).amount', () => {
    fc.assert(
      fc.property(sameCurrencyPair, ([a, b]) => {
        expect(a.add(b).amount).toBe(b.add(a).amount);
      }),
    );
  });

  /**
   * Property 2: No negative results from Money.of
   * Money.of throws for any negative amount.
   *
   * Validates: Requirements 1.1
   */
  it('Money.of throws for any negative amount', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -1_000_000, max: -1 }),
        currency,
        (negativeAmount, cur) => {
          expect(() => Money.of(negativeAmount, cur)).toThrow('Money cannot be negative');
        },
      ),
    );
  });

  /**
   * Property 3: Currency mismatch throws on add
   * For any two Money instances with different currencies, add() always throws.
   *
   * Validates: Requirements 1.1
   */
  it('add throws when currencies differ', () => {
    // Generate two different currencies
    const twoDifferentCurrencies = fc
      .tuple(currency, currency)
      .filter(([c1, c2]) => c1 !== c2);

    fc.assert(
      fc.property(
        fc.tuple(nonNegativeCents, nonNegativeCents, twoDifferentCurrencies),
        ([amountA, amountB, [curA, curB]]) => {
          const a = Money.of(amountA, curA);
          const b = Money.of(amountB, curB);
          expect(() => a.add(b)).toThrow('Currency mismatch');
        },
      ),
    );
  });

  /**
   * Additional property: add is associative
   * (a.add(b)).add(c).amount === a.add(b.add(c)).amount
   */
  it('add is associative: (a+b)+c === a+(b+c)', () => {
    const threeSameCurrency = fc
      .tuple(nonNegativeCents, nonNegativeCents, nonNegativeCents, currency)
      .map(([a, b, c, cur]) => [Money.of(a, cur), Money.of(b, cur), Money.of(c, cur)] as const);

    fc.assert(
      fc.property(threeSameCurrency, ([a, b, c]) => {
        expect(a.add(b).add(c).amount).toBe(a.add(b.add(c)).amount);
      }),
    );
  });

  /**
   * Additional property: adding zero is identity
   * a.add(Money.of(0, currency)).amount === a.amount
   */
  it('adding zero is identity: a.add(0) === a', () => {
    fc.assert(
      fc.property(nonNegativeCents, currency, (amount, cur) => {
        const a = Money.of(amount, cur);
        const zero = Money.of(0, cur);
        expect(a.add(zero).amount).toBe(a.amount);
      }),
    );
  });

  /**
   * Additional property: multiply by 1 is identity
   */
  it('multiply by 1 is identity: a.multiply(1).amount === a.amount', () => {
    fc.assert(
      fc.property(nonNegativeCents, currency, (amount, cur) => {
        const a = Money.of(amount, cur);
        expect(a.multiply(1).amount).toBe(a.amount);
      }),
    );
  });
});
