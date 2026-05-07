/**
 * Formats a monetary amount (in cents) to a localized currency string.
 */
export function formatCurrency(amountInCents: number, currency: string, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amountInCents / 100);
}
