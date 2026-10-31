export type Category = "Food" | "Transport" | "Entertainment" | "Health" | "Other";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string; // "YYYY-MM-DD"
}
