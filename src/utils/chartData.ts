import type { Expense, Category } from "../types";

const CATEGORIES: Category[] = ["Food", "Transport", "Entertainment", "Health", "Other"];

/**
 * Returns per-category totals for the given month (1-indexed) and year.
 * Only categories with amount > 0 are included.
 * Validates: Requirements 8.1
 */
export function getCategoryPieData(
  expenses: Expense[],
  month: number,
  year: number
): { category: Category; total: number }[] {
  const slice = expenses.filter((e) => {
    const [y, m] = e.date.split("-").map(Number);
    return y === year && m === month;
  });

  return CATEGORIES.reduce<{ category: Category; total: number }[]>((acc, cat) => {
    const total = slice
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    if (total > 0) acc.push({ category: cat, total });
    return acc;
  }, []);
}

/**
 * Returns a 12-entry array of monthly totals for the given year.
 * Months without expenses have total = 0.
 * Validates: Requirements 8.2
 */
export function getMonthlyBarData(
  expenses: Expense[],
  year: number
): { month: number; total: number }[] {
  const yearSlice = expenses.filter((e) => Number(e.date.split("-")[0]) === year);

  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const total = yearSlice
      .filter((e) => Number(e.date.split("-")[1]) === month)
      .reduce((sum, e) => sum + e.amount, 0);
    return { month, total };
  });
}
