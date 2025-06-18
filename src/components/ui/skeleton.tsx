/**
 * Skeleton Components - Entry Point
 * 
 * Consolidated from 6 separate files into 2 for better maintainability:
 * - skeleton-consolidated.tsx: Core skeleton component and common variants
 * - skeleton-specific.tsx: App-specific skeletons for Indecisive Wear
 * 
 * Benefits:
 * - Reduced file count from 7 to 3 (including this entry point)
 * - Better organization and maintainability
 * - Preserved all functionality
 * - Improved tree-shaking
 */

// Re-export all skeleton components
export * from "./skeleton-consolidated"
export * from "./skeleton-specific"