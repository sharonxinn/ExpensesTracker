import type { Category } from "../types";

const VALID_CATEGORIES: Category[] = [
  "Food",
  "Transport",
  "Entertainment",
  "Health",
  "Other",
];

/**
 * Validates the description field.
 * Returns null if valid, or an error string if invalid.
 * Rules: required, non-whitespace-only, max 500 characters.
 */
export function validateDescription(value: string): string | null {
  if (value.trim().length === 0) {
    return "Description is required.";
  }
  if (value.length > 500) {
    return "Description must be 500 characters or fewer.";
  }
  return null;
}

/**
 * Validates the amount field (given as a string from the form input).
 * Returns null if valid, or an error string if invalid.
 * Rules: required, numeric, ≥ 0.01, ≤ 999,999,999.99, ≤ 2 decimal places.
 */
export function validateAmount(value: string): string | null {
  if (value.trim().length === 0) {
    return "Amount is required.";
  }

  const num = Number(value);

  if (!isFinite(num) || isNaN(num)) {
    return "Amount must be a valid number.";
  }

  // Check for more than 2 decimal places using string inspection to avoid
  // floating-point rounding issues.
  const dotIndex = value.indexOf(".");
  if (dotIndex !== -1 && value.length - dotIndex - 1 > 2) {
    return "Amount must have at most 2 decimal places.";
  }

  if (num < 0.01) {
    return "Amount must be at least 0.01.";
  }

  if (num > 999_999_999.99) {
    return "Amount must be 999,999,999.99 or less.";
  }

  return null;
}

/**
 * Validates the category field.
 * Returns null if valid, or an error string if invalid.
 * Rules: must be one of Food | Transport | Entertainment | Health | Other.
 */
export function validateCategory(value: string): string | null {
  if (!VALID_CATEGORIES.includes(value as Category)) {
    return "Category must be one of: Food, Transport, Entertainment, Health, Other.";
  }
  return null;
}

/**
 * Validates the date field (expected in YYYY-MM-DD format).
 * Returns null if valid, or an error string if invalid.
 * Rules: required, ≥ 2000-01-01, ≤ today.
 */
export function validateDate(value: string): string | null {
  if (value.trim().length === 0) {
    return "Date is required.";
  }

  // Verify the value is a parseable date and not something like "2000-99-99".
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) {
    return "Date must be a valid date in YYYY-MM-DD format.";
  }

  const MIN_DATE = "2000-01-01";
  const todayISO = new Date().toISOString().slice(0, 10);

  if (value < MIN_DATE) {
    return "Date must be on or after January 1, 2000.";
  }

  if (value > todayISO) {
    return "Date must not be in the future.";
  }

  return null;
}
