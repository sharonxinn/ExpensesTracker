import { useState } from "react";
import type { Expense } from "../../types";
import { getCategoryPieData, getMonthlyBarData } from "../../utils/chartData";
import CategoryPieChart from "./CategoryPieChart";
import MonthlyBarChart from "./MonthlyBarChart";
import styles from "./ChartsPanel.module.css";

interface ChartsPanelProps {
  expenses: Expense[]; // always the unfiltered list
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildYearOptions(): number[] {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= 2000; y--) years.push(y);
  return years;
}

export default function ChartsPanel({ expenses }: ChartsPanelProps) {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const pieData = getCategoryPieData(expenses, selectedMonth, selectedYear);
  const barData = getMonthlyBarData(expenses, selectedYear);
  const yearOptions = buildYearOptions();

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Expense Analytics</h2>

      <div className={styles.charts}>
        {/* Pie chart – monthly category breakdown */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Category Breakdown</h3>
            <div className={styles.selectors}>
              <select
                className={styles.select}
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                aria-label="Select month"
              >
                {MONTH_NAMES.map((name, i) => (
                  <option key={name} value={i + 1}>{name}</option>
                ))}
              </select>
              <select
                className={styles.select}
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                aria-label="Select year for pie chart"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          {pieData.length === 0 ? (
            <p className={styles.empty}>No data for {MONTH_NAMES[selectedMonth - 1]} {selectedYear}</p>
          ) : (
            <CategoryPieChart data={pieData} />
          )}
        </div>

        {/* Bar chart – monthly totals across selected year */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Monthly Overview</h3>
            <div className={styles.selectors}>
              <select
                className={styles.select}
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                aria-label="Select year for bar chart"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          {barData.every((d) => d.total === 0) ? (
            <p className={styles.empty}>No data for {selectedYear}</p>
          ) : (
            <MonthlyBarChart data={barData} year={selectedYear} />
          )}
        </div>
      </div>
    </div>
  );
}
