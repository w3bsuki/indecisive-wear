/**
 * Skeleton Components - Refactored
 * 
 * Modular skeleton system split from the original 468-line monolithic component
 * 
 * Architecture:
 * - SkeletonBase: Core skeleton component and shimmer effect
 * - SkeletonComponents: Basic variants (text, avatar, button, image)
 * - SkeletonLayouts: Complex layouts (cards, grids, lists, tables, navigation)
 * - SkeletonForms: Form-specific skeletons
 * - SkeletonCharts: Chart and graph skeletons
 * - SkeletonSpecific: App-specific skeletons that match exact component dimensions
 * 
 * Benefits:
 * - Better organization by purpose
 * - Easier to maintain and extend
 * - Improved tree-shaking
 * - Clear separation of concerns
 */

// Core skeleton
export { Skeleton, SkeletonShimmer } from "./SkeletonBase"

// Basic components
export {
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  ButtonSkeleton,
  ImageSkeleton,
} from "./SkeletonComponents"

// Layout components
export {
  SkeletonCard,
  GridSkeleton,
  SkeletonList,
  SkeletonTable,
  SkeletonNavigation,
} from "./SkeletonLayouts"

// Form components
export {
  FormFieldSkeleton,
  SkeletonForm,
} from "./SkeletonForms"

// Chart components
export {
  SkeletonChart,
} from "./SkeletonCharts"

// App-specific components
export {
  ProductCardSkeleton,
  NavigationSkeleton,
  HeroSectionSkeleton,
  ProductGridSkeleton,
  WaitlistFormSkeleton,
} from "./SkeletonSpecific"

// Export types
export type { SkeletonProps } from "./SkeletonBase"