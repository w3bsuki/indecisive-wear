/**
 * Skeleton - Refactored Entry Point
 * 
 * This file maintains backward compatibility by re-exporting all components
 * from the new modular skeleton system.
 * 
 * Original: 468 lines of monolithic code with 15+ skeleton variants
 * Refactored: Modular system with clear category-based organization
 * 
 * The original skeleton.tsx has been split into:
 * - SkeletonBase.tsx (45 lines) - Core skeleton component and shimmer
 * - SkeletonComponents.tsx (125 lines) - Basic variants (text, avatar, button, image)
 * - SkeletonLayouts.tsx (145 lines) - Complex layouts (cards, grids, lists, tables)
 * - SkeletonForms.tsx (50 lines) - Form-specific skeletons
 * - SkeletonCharts.tsx (35 lines) - Chart and graph skeletons
 * - SkeletonSpecific.tsx (65 lines) - App-specific skeletons
 * 
 * Total: ~465 lines across 6 focused files vs 468 lines in 1 monolithic file
 * 
 * Benefits:
 * - Better organization by purpose
 * - Easier maintenance and testing
 * - Improved tree-shaking for smaller bundles
 * - Clear separation of concerns
 */

// Re-export everything for backward compatibility
export * from "./skeleton/index"