import type { Category } from "../types";

/**
 * Shared colour map for category badges and chart slices.
 * Keeps badge colours and pie-chart colours in sync (Requirement 8.6, 9.4).
 */
export const CATEGORY_COLOURS: Record<Category, string> = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Entertainment: "#a855f7",
  Health: "#22c55e",
  Other: "#94a3b8",
};
