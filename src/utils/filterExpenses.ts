import { Expense, Category } from '../types';

export function filterExpenses(expenses: Expense[], category: Category | "All"): Expense[] {
  if (category === "All") return expenses;
  return expenses.filter(e => e.category === category);
}
