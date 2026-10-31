import { Expense } from '../types';

export function sortExpenses(expenses: Expense[]): Expense[] {
  // Reverse a copy first so that equal-date items come out most-recently-inserted-first,
  // then stable-sort by date descending.
  return [...expenses].reverse().sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}
