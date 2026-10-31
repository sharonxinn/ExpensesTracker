import type { Expense } from "../../types";
import { formatRM } from "../../utils/currency";
import { CATEGORY_COLOURS } from "../../utils/categoryColours";
import styles from "./ExpenseItem.module.css";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const badgeBg = CATEGORY_COLOURS[expense.category] + "22"; // ~13% opacity tint
  const badgeColor = CATEGORY_COLOURS[expense.category];

  return (
    <div className={styles.item}>
      <div className={styles.main}>
        <span className={styles.description}>{expense.description}</span>
        <div className={styles.meta}>
          <span
            className={styles.categoryBadge}
            style={{ backgroundColor: badgeBg, color: badgeColor, borderColor: badgeColor + "55" }}
          >
            {expense.category}
          </span>
          <span className={styles.date}>{expense.date}</span>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.amount}>{formatRM(expense.amount)}</span>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete expense: ${expense.description}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
