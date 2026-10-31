import { describe, it, expect } from "vitest";
import {
  validateDescription,
  validateAmount,
  validateCategory,
  validateDate,
} from "./validation";

// ---------------------------------------------------------------------------
// validateDescription
// ---------------------------------------------------------------------------

describe("validateDescription", () => {
  it("returns null for a normal description", () => {
    expect(validateDescription("Lunch at the office")).toBeNull();
  });

  it("returns null for a single character", () => {
    expect(validateDescription("a")).toBeNull();
  });

  it("returns null for exactly 500 characters", () => {
    expect(validateDescription("a".repeat(500))).toBeNull();
  });

  it("rejects an empty string", () => {
    expect(validateDescription("")).not.toBeNull();
  });

  it("rejects a whitespace-only string (spaces)", () => {
    expect(validateDescription("   ")).not.toBeNull();
  });

  it("rejects a whitespace-only string (tabs and newlines)", () => {
    expect(validateDescription("\t\n")).not.toBeNull();
  });

  it("rejects a description longer than 500 characters", () => {
    expect(validateDescription("a".repeat(501))).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateAmount
// ---------------------------------------------------------------------------

describe("validateAmount", () => {
  it("returns null for 0.01 (minimum valid amount)", () => {
    expect(validateAmount("0.01")).toBeNull();
  });

  it("returns null for 999999999.99 (maximum valid amount)", () => {
    expect(validateAmount("999999999.99")).toBeNull();
  });

  it("returns null for a whole number", () => {
    expect(validateAmount("50")).toBeNull();
  });

  it("returns null for one decimal place", () => {
    expect(validateAmount("12.5")).toBeNull();
  });

  it("rejects an empty string", () => {
    expect(validateAmount("")).not.toBeNull();
  });

  it("rejects a whitespace-only string", () => {
    expect(validateAmount("   ")).not.toBeNull();
  });

  it("rejects non-numeric input", () => {
    expect(validateAmount("abc")).not.toBeNull();
  });

  it("rejects 0.00", () => {
    expect(validateAmount("0.00")).not.toBeNull();
  });

  it("rejects 0", () => {
    expect(validateAmount("0")).not.toBeNull();
  });

  it("rejects negative values", () => {
    expect(validateAmount("-1")).not.toBeNull();
  });

  it("rejects a value greater than 999999999.99", () => {
    expect(validateAmount("1000000000")).not.toBeNull();
  });

  it("rejects three decimal places", () => {
    expect(validateAmount("1.001")).not.toBeNull();
  });

  it("rejects four decimal places", () => {
    expect(validateAmount("0.0100")).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateCategory
// ---------------------------------------------------------------------------

describe("validateCategory", () => {
  it('returns null for "Food"', () => {
    expect(validateCategory("Food")).toBeNull();
  });

  it('returns null for "Transport"', () => {
    expect(validateCategory("Transport")).toBeNull();
  });

  it('returns null for "Entertainment"', () => {
    expect(validateCategory("Entertainment")).toBeNull();
  });

  it('returns null for "Health"', () => {
    expect(validateCategory("Health")).toBeNull();
  });

  it('returns null for "Other"', () => {
    expect(validateCategory("Other")).toBeNull();
  });

  it("rejects an empty string", () => {
    expect(validateCategory("")).not.toBeNull();
  });

  it("rejects a lowercase variant", () => {
    expect(validateCategory("food")).not.toBeNull();
  });

  it("rejects an all-uppercase variant", () => {
    expect(validateCategory("FOOD")).not.toBeNull();
  });

  it("rejects an arbitrary string", () => {
    expect(validateCategory("Groceries")).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateDate
// ---------------------------------------------------------------------------

describe("validateDate", () => {
  it("returns null for a valid date within range", () => {
    expect(validateDate("2023-06-15")).toBeNull();
  });

  it("returns null for the minimum boundary date 2000-01-01", () => {
    expect(validateDate("2000-01-01")).toBeNull();
  });

  it("returns null for today's date", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(validateDate(today)).toBeNull();
  });

  it("rejects an empty string", () => {
    expect(validateDate("")).not.toBeNull();
  });

  it("rejects a date before 2000-01-01", () => {
    expect(validateDate("1999-12-31")).not.toBeNull();
  });

  it("rejects a date in the future", () => {
    const future = "2099-01-01";
    expect(validateDate(future)).not.toBeNull();
  });

  it("rejects an invalid date string", () => {
    expect(validateDate("not-a-date")).not.toBeNull();
  });
});
