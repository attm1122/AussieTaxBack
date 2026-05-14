/**
 * Format a number as AUD currency string.
 * Example: 1234.56 -> "$1,234.56"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
}

/**
 * Format a number as a percentage string.
 * Example: 50 -> "50%"
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}
