# Implementation Plan: Expenses Tracker

## Overview

Build a React 18 SPA with Vite, TypeScript, and CSS Modules. State lives in a single `App` component and flows down via props. Expenses are persisted to `localStorage`. The implementation proceeds bottom-up: shared types and utilities first, then individual components, then integration wiring, then persistence, and finally tests layered alongside each step.

## Tasks

- [x] 1. Bootstrap project and define shared types
  - Scaffold a new Vite + React + TypeScript project inside the workspace root (`npm create vite@latest . -- --template react-ts`)
  - Install dependencies: `vitest`, `@vitest/ui`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `fast-check`, `jsdom`
  - Configure `vitest` in `vite.config.ts` with `environment: "jsdom"` and `setupFiles` pointing to a test-setup file that imports `@testing-library/jest-dom`
  - Create `src/types.ts` defining `Category` and `Expense` types exactly as specified in the design
  - _Requirements: 1.1, 2.1, 3.1_

- [x] 2. Implement validation utilities
  - [x] 2.1 Create `src/utils/validation.ts` with `validateDescription`, `validateAmount`, `validateCategory`, and `validateDate` functions matching the design's validation rules table
    - `validateDescription`: non-empty, non-whitespace-only, max 500 chars
    - `validateAmount`: required, numeric, ≥ 0.01, ≤ 999,999,999.99, ≤ 2 decimal places
    - `validateCategory`: must be one of the five predefined values
    - `validateDate`: required, ≥ 2000-01-01, ≤ today (YYYY-MM-DD)
    - Each function returns `null` on success or an error string on failure
    - _Requirements: 1.4, 1.5, 1.6, 1.7_

  - [ ]* 2.2 Write property test for amount boundary validation
    - **Property 3: Amount boundary validation**
    - **Validates: Requirements 1.5**
    - Generate amounts below 0.01, above 999,999,999.99, or with >3 decimal places; assert `validateAmount` returns a non-null error string

  - [ ]* 2.3 Write property test for invalid category rejection
    - **Property 4: Invalid category is rejected**
    - **Validates: Requirements 1.6**
    - Generate arbitrary strings not in the category enum; assert `validateCategory` returns a non-null error string

  - [ ]* 2.4 Write property test for date boundary validation
    - **Property 5: Date boundary validation**
    - **Validates: Requirements 1.7**
    - Generate date strings before 2000-01-01 or after today; assert `validateDate` returns a non-null error string

  - [ ]* 2.5 Write property test for whitespace/empty description rejection
    - **Property 2: Whitespace-only and empty descriptions are rejected**
    - **Validates: Requirements 1.4**
    - Generate strings matching `/^\s*$/`; assert `validateDescription` returns a non-null error string

- [x] 3. Implement sorting and filtering utilities
  - [x] 3.1 Create `src/utils/sortExpenses.ts` implementing `sortExpenses(expenses: Expense[]): Expense[]` using the reverse-then-stable-sort algorithm from the design
    - _Requirements: 2.2_

  - [ ]* 3.2 Write property test for sorting order invariant
    - **Property 11: Sorting places more recent dates first**
    - **Validates: Requirements 2.2**
    - Generate an arbitrary `Expense[]`; assert that in the sorted result no element appears before one with a strictly later date

  - [x] 3.3 Create `src/utils/filterExpenses.ts` implementing `filterExpenses(expenses: Expense[], category: Category | "All"): Expense[]`
    - _Requirements: 4.2, 4.3_

  - [ ]* 3.4 Write property test for category filter correctness
    - **Property 7: Category filter shows only matching expenses**
    - **Validates: Requirements 4.2**
    - Generate an arbitrary list and a specific category; assert every item in the filtered result matches that category

  - [ ]* 3.5 Write property test for "All" filter returns complete list
    - **Property 8: "All" filter returns the complete list**
    - **Validates: Requirements 4.3**
    - Generate an arbitrary list; assert `filterExpenses(list, "All")` returns a list with the same items as the original

- [x] 4. Implement localStorage persistence utilities
  - [x] 4.1 Create `src/utils/storage.ts` with `loadExpenses(): Expense[]` and `saveExpenses(expenses: Expense[]): void`
    - `loadExpenses`: reads key `"expenses-tracker-data"`, parses JSON in a try/catch; on any error deletes the key and returns `[]`
    - `saveExpenses`: serializes and writes; wraps `localStorage.setItem` in try/catch and logs a console warning on failure
    - Fall back to `[]` if `localStorage` is unavailable
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 4.2 Write property test for localStorage round-trip
    - **Property 10: localStorage round-trip preserves expense data**
    - **Validates: Requirements 6.1, 6.2, 6.3**
    - Generate an arbitrary valid `Expense[]`; call `saveExpenses` then `loadExpenses`; deep-equal the result against the original

- [x] 5. Checkpoint — verify utilities
  - Ensure all utility unit and property tests pass with `npx vitest --run`; ask the user if any questions arise before continuing.

- [x] 6. Implement `ExpenseForm` component
  - [x] 6.1 Create `src/components/ExpenseForm/ExpenseForm.tsx` and `ExpenseForm.module.css`
    - Controlled form with fields: description (text), amount (number), category (select), date (date)
    - On submit: run all four validators; if any fail, display inline error messages next to each field; if all pass, call `onAdd` prop and reset all fields
    - Predefined categories: Food, Transport, Entertainment, Health, Other
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [ ]* 6.2 Write unit tests for `ExpenseForm`
    - Test rendering of all four fields
    - Test that submitting with empty fields shows per-field error messages (Req 1.4)
    - Test that an invalid amount shows an amount error (Req 1.5)
    - Test that an invalid category shows a category error (Req 1.6)
    - Test that an invalid date shows a date error (Req 1.7)
    - Test that a valid submission calls `onAdd` and resets all fields (Req 1.2, 1.3)
    - _Requirements: 1.1–1.7_

- [x] 7. Implement `FilterBar` component
  - [x] 7.1 Create `src/components/FilterBar/FilterBar.tsx` and `FilterBar.module.css`
    - Single `<select>` with options: All, Food, Transport, Entertainment, Health, Other
    - Default/initial value is "All"
    - Calls `onChange` prop with the selected value on change
    - _Requirements: 4.1_

  - [ ]* 7.2 Write unit tests for `FilterBar`
    - Test default selected value is "All"
    - Test that selecting a category fires `onChange` with the correct value
    - _Requirements: 4.1_

- [x] 8. Implement `Summary` component
  - [x] 8.1 Create `src/components/Summary/Summary.tsx` and `Summary.module.css`
    - Accepts the **unfiltered** `expenses` array as a prop
    - Displays total sum formatted to 2 decimal places
    - Displays per-category totals (only categories with ≥ 1 expense), each formatted to 2 decimal places
    - Displays 0.00 total and no category rows when list is empty
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 8.2 Write property test for summary totals consistency
    - **Property 9: Summary totals are consistent with expense data**
    - **Validates: Requirements 5.1, 5.2**
    - Generate an arbitrary `Expense[]`; render `<Summary>`; assert the displayed total equals the arithmetic sum and each per-category total equals the sum of amounts for that category

  - [ ]* 8.3 Write unit tests for `Summary`
    - Test correct total with a mixed-category list
    - Test 0.00 total with empty list
    - Test per-category rows present only for categories that have expenses
    - _Requirements: 5.1, 5.2, 5.5_

- [ ] 9. Implement `ExpenseItem` and `ExpenseList` components
  - [x] 9.1 Create `src/components/ExpenseItem/ExpenseItem.tsx` and `ExpenseItem.module.css`
    - Displays description, amount (2 decimal places), category, date (YYYY-MM-DD)
    - Renders a delete button that calls `onDelete(expense.id)`
    - _Requirements: 2.1, 3.1_

  - [ ] 9.2 Create `src/components/ExpenseList/ExpenseList.tsx` and `ExpenseList.module.css`
    - Accepts `expenses` (already filtered + sorted), `activeCategory`, and `onDelete` props
    - Renders an `ExpenseItem` for each expense
    - When `expenses` is empty and `activeCategory === "All"`, shows "No expenses to show"
    - When `expenses` is empty and a specific category is active, shows the category-specific empty-state message (Req 4.4)
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 4.4_

  - [ ]* 9.3 Write unit tests for `ExpenseList` and `ExpenseItem`
    - Test correct rendering of expense fields
    - Test delete button triggers callback with the correct id
    - Test "no expenses" empty-state when list is empty and filter is "All"
    - Test category-specific empty-state when filter is active and list is empty
    - _Requirements: 2.1, 2.3, 3.1, 4.4_

- [ ] 10. Wire together `App` component with full integration
  - [ ] 10.1 Rewrite `src/App.tsx` to own all application state (`expenses`, `activeCategory`), wire all child components together, compute `filteredAndSorted` from utilities, and pass unfiltered expenses to `Summary`
    - Hydrate from `loadExpenses()` as the initial state value
    - `addExpense` handler: appends new expense (with `crypto.randomUUID()` id, falling back to timestamp + `Math.random()`), saves to localStorage, updates state
    - `deleteExpense` handler: filters out the expense by id, saves to localStorage, updates state
    - `setActiveCategory` handler: updates `activeCategory` in state
    - Pass `filteredAndSorted` to `ExpenseList`, full `expenses` to `Summary`
    - _Requirements: 1.2, 2.2, 3.2, 3.3, 4.2, 4.3, 5.3, 5.4, 6.1, 6.2, 6.3_

  - [ ]* 10.2 Write property test for valid expense addition grows list by exactly one
    - **Property 1: Valid expense addition grows the list by exactly one**
    - **Validates: Requirements 1.2**
    - Generate an arbitrary `Expense[]` and a valid new expense; call the `addExpense` logic; assert `length + 1` and the new item is present

  - [ ]* 10.3 Write property test for delete removes exactly the target expense
    - **Property 6: Delete removes exactly the target expense**
    - **Validates: Requirements 3.2, 3.3**
    - Generate an arbitrary list (≥ 1); pick a random item; call the `deleteExpense` logic; assert the id is gone and length is reduced by exactly 1

  - [ ]* 10.4 Write integration tests for `App`
    - Add an expense → list grows by 1 and localStorage is updated
    - Delete an expense → list shrinks by 1 and localStorage is updated
    - Filter by category → only matching expenses rendered
    - Corrupted localStorage → app initializes with empty list
    - _Requirements: 1.2, 3.2, 4.2, 6.5_

- [ ] 11. Checkpoint — full integration and all tests
  - Run `npx vitest --run` and confirm all tests pass; ask the user if any questions arise before considering the implementation complete.

- [ ] 12. RM currency display
  - [ ] 12.1 Create `src/utils/currency.ts` with `formatRM(amount: number): string` returning `"RM " + amount.toFixed(2)`
    - _Requirements: 7.1, 7.3_
  - [ ] 12.2 Update `Summary.tsx` to use `formatRM` for all displayed amounts
    - _Requirements: 7.1, 5.1, 5.2, 5.5_
  - [ ] 12.3 Update `ExpenseItem.tsx` to use `formatRM` for the amount display
    - _Requirements: 7.1, 2.1_
  - [ ] 12.4 Update `App.tsx` header to display the running total using `formatRM`
    - _Requirements: 9.6_

- [ ] 13. Visual charts
  - [ ] 13.1 Install `recharts` as a production dependency (`npm install recharts`)
    - _Requirements: 8.1, 8.2_
  - [ ] 13.2 Create `src/utils/chartData.ts` with two pure functions:
    - `getCategoryPieData(expenses, month, year)` — filters by month+year, groups by category, returns `{ category, total }[]`
    - `getMonthlyBarData(expenses, year)` — groups by month, returns a 12-entry `{ month, total }[]` array (zero-filled)
    - _Requirements: 8.1, 8.2_
  - [ ] 13.3 Create `src/components/ChartsPanel/ChartsPanel.tsx` and `ChartsPanel.module.css`
    - Month selector (1–12, default: current month) and year selector (2000–current year, default: current year)
    - Renders `CategoryPieChart` and `MonthlyBarChart` side-by-side; shows "No data for this period" when data is empty
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [ ] 13.4 Create `src/components/ChartsPanel/CategoryPieChart.tsx`
    - Uses Recharts `PieChart` + `Pie` + `Tooltip` + `Legend`
    - One slice per category; colours from `CATEGORY_COLOURS` constant consistent with category badge colours
    - _Requirements: 8.1, 8.6_
  - [ ] 13.5 Create `src/components/ChartsPanel/MonthlyBarChart.tsx`
    - Uses Recharts `BarChart` + `Bar` + `XAxis` + `YAxis` + `Tooltip`
    - X-axis labels: Jan–Dec; Y-axis tick formatter uses `formatRM`
    - _Requirements: 8.2, 8.7_
  - [ ] 13.6 Wire `ChartsPanel` into `App.tsx`, passing the full unfiltered `expenses` array
    - _Requirements: 8.5_

- [ ] 14. UI/UX improvements
  - [ ] 14.1 Define a CSS custom-properties design token file `src/styles/tokens.css` with colour palette, spacing scale, border-radius, and box-shadow values; import in `index.css`
    - _Requirements: 9.1_
  - [ ] 14.2 Redesign `App.module.css`: two-column desktop grid collapsing to single column at 768 px; sticky left panel; branded header showing title + running RM total
    - _Requirements: 9.2, 9.6_
  - [ ] 14.3 Redesign `ExpenseForm.module.css`: card container, clear labels, accent-coloured submit button, smooth focus rings
    - _Requirements: 9.3, 9.7, 9.8_
  - [ ] 14.4 Redesign `ExpenseItem.module.css`: card-style row; category badge with per-category background colour from `CATEGORY_COLOURS`
    - _Requirements: 9.4, 9.8_
  - [ ] 14.5 Redesign `Summary.module.css`: prominent card; total amount in larger font; clean per-category list
    - _Requirements: 9.5_
  - [ ] 14.6 Redesign `FilterBar.module.css` and `ExpenseList.module.css`: consistent with design tokens
    - _Requirements: 9.1, 9.7_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at utility and integration stages
- Property tests validate universal correctness properties (Properties 1–11 from the design)
- Unit tests validate specific examples, edge cases, and error conditions
- All code uses TypeScript; CSS Modules are used for component-level styles
- `CATEGORY_COLOURS` is a shared constant in `src/utils/categoryColours.ts` used by charts and category badges

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "3.3", "4.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5", "3.2", "3.4", "3.5", "4.2"] },
    { "id": 3, "tasks": ["6.1", "7.1", "8.1", "9.1"] },
    { "id": 4, "tasks": ["6.2", "7.2", "8.2", "8.3", "9.2"] },
    { "id": 5, "tasks": ["9.3", "10.1"] },
    { "id": 6, "tasks": ["10.2", "10.3", "10.4"] },
    { "id": 7, "tasks": ["12.1"] },
    { "id": 8, "tasks": ["12.2", "12.3", "12.4", "13.1", "14.1"] },
    { "id": 9, "tasks": ["13.2", "14.2", "14.3", "14.4", "14.5", "14.6"] },
    { "id": 10, "tasks": ["13.3", "13.4", "13.5"] },
    { "id": 11, "tasks": ["13.6"] }
  ]
}
```
