import { useState } from "react";
import type { Category, Expense } from "../../types";
import {
  validateDescription,
  validateAmount,
  validateCategory,
  validateDate,
} from "../../utils/validation";
import styles from "./ExpenseForm.module.css";

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, "id">) => void;
}

interface FormFields {
  description: string;
  amount: string;
  category: string;
  date: string;
}

interface FormErrors {
  description: string | null;
  amount: string | null;
  category: string | null;
  date: string | null;
}

const INITIAL_FIELDS: FormFields = {
  description: "",
  amount: "",
  category: "",
  date: "",
};

const INITIAL_ERRORS: FormErrors = {
  description: null,
  amount: null,
  category: null,
  date: null,
};

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const descriptionError = validateDescription(fields.description);
    const amountError = validateAmount(fields.amount);
    const categoryError = validateCategory(fields.category);
    const dateError = validateDate(fields.date);

    const newErrors: FormErrors = {
      description: descriptionError,
      amount: amountError,
      category: categoryError,
      date: dateError,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== null);
    if (hasErrors) {
      return;
    }

    onAdd({
      description: fields.description,
      amount: parseFloat(fields.amount),
      category: fields.category as Category,
      date: fields.date,
    });

    setFields(INITIAL_FIELDS);
    setErrors(INITIAL_ERRORS);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={fields.description}
          onChange={handleChange}
          className={errors.description ? styles.inputError : styles.input}
          placeholder="e.g. Grocery shopping"
        />
        {errors.description && (
          <span className={styles.errorMessage} role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="amount" className={styles.label}>
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="text"
          inputMode="decimal"
          value={fields.amount}
          onChange={handleChange}
          className={errors.amount ? styles.inputError : styles.input}
          placeholder="e.g. 12.50"
        />
        {errors.amount && (
          <span className={styles.errorMessage} role="alert">
            {errors.amount}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="category" className={styles.label}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={fields.category}
          onChange={handleChange}
          className={errors.category ? styles.inputError : styles.input}
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && (
          <span className={styles.errorMessage} role="alert">
            {errors.category}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="date" className={styles.label}>
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={fields.date}
          onChange={handleChange}
          className={errors.date ? styles.inputError : styles.input}
        />
        {errors.date && (
          <span className={styles.errorMessage} role="alert">
            {errors.date}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Add Expense
      </button>
    </form>
  );
}
