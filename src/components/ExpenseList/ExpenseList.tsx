import styles from "./ExpenseList.module.css";
import { Expense, Category } from "../../types";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[]; // already filtered + sorted
  activeCategory: Category | "All";
  onDelete: (id: string) => void;
}

function ExpenseList({ expenses, activeCategory, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    const message =
      activeCategory === "All"
        ? "No expenses to show"
        : `No ${activeCategory} expenses to show`;

    return (
      <div className={styles.emptyState}>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {expenses.map((expense) => (
        <li key={expense.id} className={styles.listItem}>
          <ExpenseItem expense={expense} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
