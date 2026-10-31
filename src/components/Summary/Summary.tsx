import type { Expense, Category } from "../../types";
import { formatRM } from "../../utils/currency";
import { CATEGORY_COLOURS } from "../../utils/categoryColours";
import styles from "./Summary.module.css";

interface SummaryProps {
  expenses: Expense[]; // always the unfiltered list
}

const CATEGORIES: Category[] = ["Food", "Transport", "Entertainment", "Health", "Other"];

export default function Summary({ expenses }: SummaryProps) {
  // Requirement 5.1: total sum of all expense amounts
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Requirement 5.2: per-category totals, only for categories with ≥ 1 expense
  const categoryTotals = CATEGORIES.reduce<{ category: Category; total: number }[]>(
    (acc, category) => {
      const categoryTotal = expenses
        .filter((e) => e.category === category)
        .reduce((sum, e) => sum + e.amount, 0);
      if (categoryTotal > 0) acc.push({ category, total: categoryTotal });
      return acc;
    },
    []
  );

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Spending Summary</h2>

      {/* Requirement 5.1, 5.5, 7.1: total formatted with RM prefix; shows RM 0.00 when empty */}
      <div className={styles.totalBlock}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalAmount}>{formatRM(total)}</span>
      </div>

      {/* Requirement 5.2: per-category rows only when category has ≥ 1 expense */}
      {categoryTotals.length > 0 && (
        <ul className={styles.categoryList}>
          {categoryTotals.map(({ category, total: catTotal }) => (
            <li key={category} className={styles.categoryItem}>
              <span
                className={styles.categoryDot}
                style={{ backgroundColor: CATEGORY_COLOURS[category] }}
                aria-hidden="true"
              />
              <span className={styles.categoryName}>{category}</span>
              <span className={styles.categoryTotal}>{formatRM(catTotal)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
