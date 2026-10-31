import styles from "./FilterBar.module.css";
import type { Category } from "../../types";

interface FilterBarProps {
  activeCategory: Category | "All";
  onChange: (category: Category | "All") => void;
}

const CATEGORIES: Array<Category | "All"> = [
  "All",
  "Food",
  "Transport",
  "Entertainment",
  "Health",
  "Other",
];

export default function FilterBar({ activeCategory, onChange }: FilterBarProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="category-filter" className={styles.label}>
        Filter by category:
      </label>
      <select
        id="category-filter"
        className={styles.select}
        value={activeCategory}
        onChange={(e) => onChange(e.target.value as Category | "All")}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
