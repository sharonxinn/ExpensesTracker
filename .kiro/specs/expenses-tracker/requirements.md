# Requirements Document

## Introduction

A React-based expenses tracker application that allows users to add, view, categorize, filter, and delete personal expenses in Malaysian Ringgit (RM). The app provides a spending summary, interactive charts for visual analysis, and a polished UI so users can understand where their money goes at a glance.

## Glossary

- **App**: The React expenses tracker application
- **Expense**: A single spending record consisting of a description, amount, category, and date
- **Expense_List**: The collection of all recorded expenses displayed in the UI
- **Expense_Form**: The form component used to add new expenses
- **Summary**: The component displaying total spending and per-category breakdowns
- **Category**: A label grouping expenses (e.g., Food, Transport, Entertainment, Health, Other)
- **Charts_Panel**: The section displaying the monthly category pie chart and the yearly bar chart
- **RM**: Malaysian Ringgit — the currency used throughout the application

## Requirements

### Requirement 1: Add an Expense

**User Story:** As a user, I want to add a new expense with a description, amount, category, and date, so that I can record my spending.

#### Acceptance Criteria

1. THE Expense_Form SHALL include a description field (text, maximum 500 characters), an amount field (number), a category field (select with predefined categories: Food, Transport, Entertainment, Health, Other), and a date field (date picker).
2. WHEN the user submits the Expense_Form with all required fields filled, THE App SHALL add the expense to the Expense_List.
3. WHEN the user submits the Expense_Form with all required fields filled, THE Expense_Form SHALL reset all fields to their default/empty state.
4. IF the user submits the Expense_Form with one or more required fields empty, THEN THE Expense_Form SHALL display a validation error message next to each empty field.
5. IF the user enters an amount that is less than 0.01, greater than 999,999,999.99, or has more than 2 decimal places, THEN THE Expense_Form SHALL display a validation error indicating the amount must be between 0.01 and 999,999,999.99 with at most 2 decimal places.
6. IF the user selects a category value that is not in the predefined category list (Food, Transport, Entertainment, Health, Other), THEN THE Expense_Form SHALL display a validation error indicating a valid category must be selected.
7. IF the user enters a date that is before January 1, 2000 or after the current date, THEN THE Expense_Form SHALL display a validation error indicating the date must be between January 1, 2000 and today.

### Requirement 2: View Expenses

**User Story:** As a user, I want to view a list of all my recorded expenses, so that I can see my spending history.

#### Acceptance Criteria

1. THE Expense_List SHALL display each expense's description, amount (formatted to 2 decimal places prefixed with "RM"), category, and date (formatted as YYYY-MM-DD).
2. THE Expense_List SHALL display expenses in reverse chronological order (most recent date first); expenses with the same date SHALL be ordered by insertion order descending (most recently added first).
3. WHILE no expenses have been added, THE App SHALL display a message indicating there are no expenses to show.

### Requirement 3: Delete an Expense

**User Story:** As a user, I want to delete an expense from the list, so that I can remove incorrect or unwanted records.

#### Acceptance Criteria

1. THE Expense_List SHALL display a delete button for each expense entry.
2. WHEN the user clicks the delete button for an expense, THE App SHALL remove that expense from the Expense_List immediately without requiring additional confirmation.
3. WHEN the user clicks the delete button for an expense, THE App SHALL preserve all other expenses in the Expense_List unchanged.

### Requirement 4: Filter Expenses by Category

**User Story:** As a user, I want to filter the expense list by category, so that I can focus on a specific type of spending.

#### Acceptance Criteria

1. THE App SHALL provide a category filter control displaying all predefined categories (Food, Transport, Entertainment, Health, Other) plus an "All" option; the default selected value SHALL be "All".
2. WHEN the user selects a specific category from the filter control, THE Expense_List SHALL display only expenses whose category exactly matches the selected category.
3. WHEN the user selects "All" from the filter control, THE Expense_List SHALL display all recorded expenses regardless of category.
4. WHEN a category filter is active and no expenses match the selected category, THE App SHALL display an empty-state message indicating no expenses exist for that category.

### Requirement 5: View Spending Summary

**User Story:** As a user, I want to see a summary of my total spending and per-category totals, so that I can understand where my money is going.

#### Acceptance Criteria

1. THE Summary SHALL display the total sum of all recorded expense amounts, formatted to 2 decimal places and prefixed with the "RM" currency symbol.
2. THE Summary SHALL display the total sum of expense amounts for each category that has at least one expense, each formatted to 2 decimal places and prefixed with "RM".
3. WHEN an expense is added or deleted, THE Summary SHALL update immediately to reflect the current totals without requiring a page refresh.
4. WHEN a category filter is active, THE Summary SHALL display totals based on all expenses regardless of the active filter.
5. WHEN there are no recorded expenses, THE Summary SHALL display a total of RM 0.00 and no per-category rows.

### Requirement 6: Persist Expenses Across Sessions

**User Story:** As a user, I want my expenses to be saved between browser sessions, so that I do not lose my data when I close or refresh the page.

#### Acceptance Criteria

1. WHEN an expense is added, THE App SHALL save the updated Expense_List to the browser's localStorage under the key "expenses-tracker-data".
2. WHEN an expense is deleted, THE App SHALL save the updated Expense_List to the browser's localStorage under the key "expenses-tracker-data".
3. WHEN the App initializes, THE App SHALL load any previously saved expenses from localStorage under the key "expenses-tracker-data" and populate the Expense_List.
4. IF no data exists in localStorage under "expenses-tracker-data" on initialization, THEN THE App SHALL initialize with an empty Expense_List.
5. IF the data in localStorage is corrupted or unparseable, THEN THE App SHALL initialize with an empty Expense_List and clear the corrupted localStorage entry.

### Requirement 7: Malaysian Ringgit (RM) Currency Display

**User Story:** As a Malaysian user, I want all monetary amounts displayed in Ringgit Malaysia (RM), so that the app reflects my local currency.

#### Acceptance Criteria

1. THE App SHALL prefix all displayed monetary amounts with the "RM" currency symbol throughout the UI (Summary totals, per-category totals, and each expense item).
2. THE Expense_Form amount field placeholder and validation error messages SHALL reference RM where amounts are shown.
3. THE App SHALL NOT convert any stored amounts; the RM prefix is a display-only concern applied at render time.

---

### Requirement 8: Visual Expense Charts

**User Story:** As a user, I want to see visual charts of my spending, so that I can quickly understand my expense patterns over time.

#### Acceptance Criteria

1. THE Charts_Panel SHALL display a **pie chart** showing the breakdown of total expense amounts by category for the currently selected month (derived from the expense `date` field).
2. THE Charts_Panel SHALL display a **bar chart** showing the total expense amount for each month across the currently selected year (January–December on the x-axis, RM amount on the y-axis).
3. THE Charts_Panel SHALL provide a month selector (default: current month) and a year selector (default: current year) to control which period is visualised.
4. WHEN no expenses exist for the selected period, THE Charts_Panel SHALL display a "No data for this period" message in place of the chart.
5. WHEN an expense is added or deleted, THE Charts_Panel SHALL update immediately to reflect the change without requiring a page refresh.
6. THE pie chart SHALL use a distinct colour per category consistent with category colours used elsewhere in the UI.
7. THE bar chart y-axis values SHALL be prefixed with "RM".

---

### Requirement 9: Improved UI/UX Design

**User Story:** As a user, I want a clean, modern, and easy-to-use interface, so that tracking expenses feels effortless.

#### Acceptance Criteria

1. THE App SHALL use a consistent colour scheme with a primary accent colour applied to interactive elements (buttons, active states, focus rings).
2. THE App layout SHALL be responsive: a two-column desktop layout (form on the left, content on the right) SHALL collapse to a single column on viewports narrower than 768 px.
3. THE Expense_Form SHALL be displayed in a visually distinct card with clear field labels, visible focus states, and a prominent submit button.
4. THE Expense_List SHALL visually distinguish each expense row with a card-style appearance; category badges SHALL use a distinct background colour per category.
5. THE Summary component SHALL present totals in a visually prominent card; the total amount SHALL be displayed in a larger font size than per-category rows.
6. THE App header SHALL display the application title and the current total spending in RM so the user sees their running total at a glance.
7. ALL interactive elements (buttons, selects, inputs) SHALL have visible hover and focus states to meet WCAG 2.1 AA focus-visibility guidelines.
8. THE App SHALL use smooth CSS transitions on interactive state changes (hover, focus, delete confirmation highlight).
