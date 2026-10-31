---
inclusion: always
---

# SDLC Documentation Standards

This project follows a structured SDLC documentation process. All features developed in this codebase must be backed by a full artifact trail in `.kiro/specs/<feature-name>/`.

## Required Spec Artifacts

Every feature spec folder must contain these three files, produced in order:

1. **`requirements.md`** — What the feature does (written before any design or code)
2. **`design.md`** — How the feature is built (written after requirements are approved)
3. **`tasks.md`** — Ordered implementation steps (generated from the design)

Do not write design content in `requirements.md`, or implementation detail in `design.md`. Each document has a single responsibility.

---

## `requirements.md` Conventions

- Open with an **Introduction** paragraph and a **Glossary** of domain terms used throughout
- Group requirements by feature area; number them (e.g., Requirement 1, Requirement 2)
- Write each requirement as a **User Story**: _"As a [user], I want [goal], so that [reason]."_
- Express acceptance criteria in **SHALL / WHEN / IF / THEN** language:
  - `THE <component> SHALL <behavior>` — unconditional obligation
  - `WHEN <event>, THE <component> SHALL <behavior>` — triggered behavior
  - `IF <condition>, THEN THE <component> SHALL <behavior>` — conditional behavior
- Number acceptance criteria within each requirement (e.g., 1.1, 1.2) for traceability
- Capitalize domain terms consistently with the Glossary (e.g., `Expense_Form`, `Expense_List`)
- Do not include implementation choices, TypeScript types, or component names in this document

---

## `design.md` Conventions

- Open with an **Overview** stating the architecture pattern and key technology choices in a table (Choice | Rationale)
- Include an **Architecture** section with:
  - A Mermaid component graph showing the component tree
  - A numbered data-flow narrative (user action → state change → re-render → persistence)
- Include a **Components and Interfaces** section with TypeScript interface signatures for every component's props and internal state shapes — these are the authoritative contracts
- Include a **Data Models** section covering:
  - The core domain types (`Category`, `Expense`) with field-level annotations
  - A table of derived/computed values (what they are, where they're computed)
  - The `localStorage` schema (key name and value shape)
  - A validation rules table (field | rule)
- Include a **Correctness Properties** section with formally stated properties in the form: _"For any [inputs], [action] must produce [outcome]."_ Each property must reference the requirement(s) it validates
- Include an **Error Handling** table (scenario | handling strategy)
- Include a **Testing Strategy** section mapping test types (unit, integration, property-based) to components and properties

---

## `tasks.md` Conventions

- Open with an **Overview** paragraph summarising the implementation order and rationale
- List tasks in dependency order (utilities before components, components before wiring)
- Use status markers on every task and sub-task:
  - `[ ]` — not started
  - `[-]` — in progress
  - `[x]` — complete
  - `[~]` — partially complete / blocked
- Mark optional tasks with `*` after the task number
- Every task must end with `_Requirements: X.Y, X.Z_` tracing it to one or more acceptance criteria
- Property-based test tasks must name the property from `design.md` they validate (e.g., `**Property 3: Amount boundary validation**`)
- Close with a **Task Dependency Graph** in JSON using wave-based parallel groupings:
  ```json
  { "waves": [{ "id": 0, "tasks": ["1.1"] }, { "id": 1, "tasks": ["2.1", "3.1"] }] }
  ```

---

## Source Code Documentation Conventions

- Add JSDoc block comments to all exported utility functions — include: purpose, rules enforced, and the requirement IDs validated (e.g., `Validates: Requirements 6.1, 6.2`)
- Add inline comments on non-obvious logic; do not comment self-explanatory code
- Inline requirement references are encouraged inside component logic (e.g., `// Requirement 5.1: total sum of all expense amounts`)
- Extract magic values into named constants (`STORAGE_KEY`, `INITIAL_FIELDS`, `VALID_CATEGORIES`) — never use inline literals for domain-specific values

---

## Traceability Rules

- Every task in `tasks.md` must trace to at least one acceptance criterion in `requirements.md`
- Every correctness property in `design.md` must trace to at least one acceptance criterion
- Every property-based test must name the property it validates
- When a requirement changes, update all three documents — requirements → design → tasks — in that order before changing code

---

## Enforcement Checklist

Before marking any feature as complete, verify:

- [ ] `requirements.md` uses SHALL / WHEN / IF / THEN language throughout
- [ ] All acceptance criteria are numbered for traceability
- [ ] `design.md` includes component interface signatures, data models, and correctness properties
- [ ] All correctness properties reference their source requirement(s)
- [ ] `tasks.md` has status markers on every task and sub-task
- [ ] All tasks reference their requirement IDs
- [ ] Source utilities have JSDoc with requirement references
- [ ] No design decisions appear in `requirements.md`; no requirement re-statements appear in `design.md`
