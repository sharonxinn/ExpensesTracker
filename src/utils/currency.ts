/**
 * Formats a numeric amount as Malaysian Ringgit display string.
 * Returns "RM X.XX" — display-only, stored amounts remain plain numbers.
 * Validates: Requirements 7.1, 7.3
 */
export function formatRM(amount: number): string {
  return `RM ${amount.toFixed(2)}`;
}
