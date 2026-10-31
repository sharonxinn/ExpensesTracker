import { describe, it, expect } from 'vitest'
import type { Category, Expense } from './types'

describe('Types smoke test', () => {
  it('Category type accepts valid values', () => {
    const categories: Category[] = ['Food', 'Transport', 'Entertainment', 'Health', 'Other']
    expect(categories).toHaveLength(5)
  })

  it('Expense interface has the correct shape', () => {
    const expense: Expense = {
      id: 'abc-123',
      description: 'Lunch',
      amount: 12.50,
      category: 'Food',
      date: '2024-01-15',
    }
    expect(expense.id).toBe('abc-123')
    expect(expense.description).toBe('Lunch')
    expect(expense.amount).toBe(12.50)
    expect(expense.category).toBe('Food')
    expect(expense.date).toBe('2024-01-15')
  })
})
