import { useState } from "react";
import type { Category, Expense } from "./types";
import { loadExpenses, saveExpenses } from "./utils/storage";
import { filterExpenses } from "./utils/filterExpenses";
import { sortExpenses } from "./utils/sortExpenses";
import { formatRM } from "./utils/currency";
import { ExpenseForm } from "./components/ExpenseForm/ExpenseForm";
import FilterBar from "./components/FilterBar/FilterBar";
import Summary from "./components/Summary/Summary";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import ChartsPanel from "./components/ChartsPanel/ChartsPanel";
import styles from "./App.module.css";

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  function handleAdd(data: Omit<Expense, "id">) {
    const newExpense: Expense = { id: generateId(), ...data };
    const updated = [...expenses, newExpense];
    setExpenses(updated);
    saveExpenses(updated);
  }

  function handleDelete(id: string) {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    saveExpenses(updated);
  }

  const filteredAndSorted = sortExpenses(filterExpenses(expenses, activeCategory));
  const grandTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className={styles.page}>
      {/* Requirement 9.6: header shows title + running RM total */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <span className={styles.logo}>💸</span>
            <h1 className={styles.heading}>Expenses Tracker</h1>
          </div>
          <div className={styles.headerTotal}>
            <span className={styles.headerTotalLabel}>Total Spending</span>
            <span className={styles.headerTotalAmount}>{formatRM(grandTotal)}</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Left column: Add Expense form */}
        <aside className={styles.leftColumn}>
          <section aria-label="Add expense">
            <h2 className={styles.sectionTitle}>Add Expense</h2>
            <ExpenseForm onAdd={handleAdd} />
          </section>
        </aside>

        {/* Right column: Summary, Charts, Expense List */}
        <div className={styles.rightColumn}>
          <Summary expenses={expenses} />
          <ChartsPanel expenses={expenses} />

          <section aria-label="Expense list">
            <div className={styles.listHeader}>
              <h2 className={styles.sectionTitle}>
                {activeCategory === "All" ? "All Expenses" : `${activeCategory} Expenses`}
                <span className={styles.expenseCount}>
                  {filteredAndSorted.length} item{filteredAndSorted.length !== 1 ? "s" : ""}
                </span>
              </h2>
              <FilterBar activeCategory={activeCategory} onChange={setActiveCategory} />
            </div>
            <ExpenseList
              expenses={filteredAndSorted}
              activeCategory={activeCategory}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
