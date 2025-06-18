/**
 * Design System Entry Point
 * 
 * Central export for all design system utilities
 * Import from here for consistency
 */

// Core tokens
export * from './tokens'

// Component styles
export * from './component-styles'

// Animation utilities
export * from './animations'

// Composite utilities
export { cn } from '@/lib/utils'

// Quick access helpers
import { tokens } from './tokens'
import { 
  buttonVariants, 
  cardVariants, 
  inputVariants, 
  badgeVariants,
  containerStyles,
  sectionStyles,
  flexStyles,
  gridStyles,
  textStyles,
  mobileStyles,
  focusStyles,
  hoverStyles,
} from './component-styles'
import { animations, staggerAnimations, pageTransitions, carouselAnimations, loadingAnimations, shouldReduceMotion } from './animations'

// Design system namespace for easy access
export const designSystem = {
  tokens,
  variants: {
    button: buttonVariants,
    card: cardVariants,
    input: inputVariants,
    badge: badgeVariants,
  },
  layout: {
    container: containerStyles,
    section: sectionStyles,
    flex: flexStyles,
    grid: gridStyles,
  },
  text: textStyles,
  mobile: mobileStyles,
  interactive: {
    focus: focusStyles,
    hover: hoverStyles,
  },
  animations: {
    presets: animations,
    stagger: staggerAnimations,
    page: pageTransitions,
    carousel: carouselAnimations,
    loading: loadingAnimations,
  },
  utils: {
    shouldReduceMotion,
  },
} as const

// Type exports
export type { ButtonProps, CardProps, InputProps, BadgeProps } from './component-styles'