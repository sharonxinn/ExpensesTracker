import type { Expense } from "../types";

const STORAGE_KEY = "expenses-tracker-data";

/**
 * Reads expenses from localStorage.
 * Returns an empty array if localStorage is unavailable or the stored data
 * cannot be parsed; in the latter case the corrupted key is also deleted.
 *
 * Validates: Requirements 6.3, 6.4, 6.5
 */
export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [];
    }
    return JSON.parse(raw) as Expense[];
  } catch {
    // Corrupted / unparseable data — clear the entry and start fresh
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage itself may be unavailable; ignore
    }
    return [];
  }
}

/**
 * Serializes the expense list and writes it to localStorage.
 * Logs a console warning if the write fails (e.g. storage quota exceeded).
 *
 * Validates: Requirements 6.1, 6.2
 */
export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (err) {
    console.warn("ExpensesTracker: failed to save expenses to localStorage.", err);
  }
}
