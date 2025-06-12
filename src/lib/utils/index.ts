/**
 * Centralized Utilities Library
 * 
 * Consolidates all utility functions from across the codebase into organized modules:
 * - Format utilities (price, date, time, numbers)
 * - String utilities (validation, transformation)
 * - Array utilities (filtering, sorting, grouping)
 * - Object utilities (merging, transformation)
 * - UI utilities (className merging, responsive)
 * - Form utilities (validation helpers)
 */

// Re-export existing utils
export { cn } from '../utils';

// Format utilities
export * from './format';

// String utilities
export * from './string';

// Array utilities (excluding groupBy to avoid conflict)
export { 
  unique,
  chunk,
  shuffle,
  groupByArray,
  sortBy,
  intersection,
  difference,
  flattenArray,
  takeLast,
  take,
  compactArray,
  isEqualArray,
  move,
  partition,
  isEmptyArray,
  sample,
  sampleSize,
  range,
  removeAt,
  insertAt,
  groupBy as groupByArray2
} from './array';

// Object utilities
export * from './object';

// UI utilities
export * from './ui';

// Form utilities
export * from './form';

// Performance utilities
export * from './performance';

// Error utilities
export * from './error'; 