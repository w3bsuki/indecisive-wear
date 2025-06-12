/**
 * Professional Component Patterns
 * Reusable styling patterns inspired by Magic UI and modern design systems
 */

import { designSystem } from './professional-tokens'

// Glass Morphism Patterns
export const glassMorphism = {
  // Primary glass card
  card: 'bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl',
  
  // Secondary glass card (lighter)
  cardLight: 'bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg',
  
  // Glass container with gradient border
  containerWithBorder: 'relative p-0.5 rounded-2xl bg-gradient-to-br from-pink-200/50 via-purple-200/30 to-pink-300/50',
  
  // Glass overlay
  overlay: 'absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-pink-50/20 pointer-events-none rounded-2xl',
}

// Gradient Border Patterns
export const gradientBorders = {
  // Primary gradient border
  primary: 'bg-gradient-to-br from-pink-200/50 via-purple-200/30 to-pink-300/50',
  
  // Secondary gradient border
  secondary: 'bg-gradient-to-br from-pink-100/40 via-purple-100/25 to-pink-200/40',
  
  // Hover gradient border
  hover: 'hover:from-pink-300/60 hover:via-purple-300/40 hover:to-pink-400/60',
  
  // Animated gradient border
  animated: 'bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-size-200 animate-gradient-x',
}

// Interactive Element Patterns
export const interactions = {
  // Hover transforms
  hoverLift: 'transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-[1.02]',
  hoverScale: 'transition-transform duration-200 hover:scale-105 active:scale-95',
  hoverGlow: 'transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25',
  
  // Button interactions
  button: 'transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg focus:ring-2 focus:ring-pink-500/50 focus:ring-offset-2',
  
  // Card interactions
  card: 'transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl cursor-pointer',
  
  // Image interactions
  image: 'transition-all duration-500 group-hover:scale-[1.02] group-hover:contrast-110',
}

// Typography Patterns
export const typography = {
  // Headings with gradient text
  heroHeading: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent',
  sectionHeading: 'text-2xl sm:text-3xl font-bold text-gray-900',
  cardHeading: 'text-lg font-semibold text-gray-900',
  
  // Body text
  bodyLarge: 'text-base sm:text-lg text-gray-600 leading-relaxed',
  bodyMedium: 'text-sm sm:text-base text-gray-600',
  bodySmall: 'text-xs sm:text-sm text-gray-500',
  
  // Special text
  accent: 'text-pink-600 font-medium',
  muted: 'text-gray-400',
}

// Layout Patterns
export const layouts = {
  // Container patterns
  container: 'container mx-auto px-4 relative',
  containerWide: 'container mx-auto px-4 max-w-7xl',
  containerNarrow: 'container mx-auto px-4 max-w-4xl',
  
  // Section patterns
  section: 'py-12 sm:py-16 md:py-20',
  sectionCompact: 'py-8 sm:py-12',
  
  // Grid patterns
  gridCards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  gridFeatures: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
  
  // Flex patterns
  centerContent: 'flex items-center justify-center',
  spaceBetween: 'flex items-center justify-between',
  stackVertical: 'flex flex-col space-y-4 sm:space-y-6',
}

// Animation Patterns
export const animations = {
  // Entrance animations
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
  scaleIn: 'animate-in zoom-in-95 duration-300',
  
  // Loading animations
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
  
  // Hover animations
  float: 'hover:animate-pulse',
  glow: 'hover:animate-pulse hover:shadow-lg hover:shadow-pink-500/25',
}

// State Patterns
export const states = {
  // Loading states
  loading: 'opacity-50 cursor-not-allowed',
  skeleton: 'animate-pulse bg-gray-200 rounded',
  
  // Interactive states
  active: 'bg-pink-50 border-pink-300 text-pink-700',
  selected: 'ring-2 ring-pink-500 ring-offset-2',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  
  // Validation states
  error: 'border-red-300 text-red-700 focus:ring-red-500',
  success: 'border-green-300 text-green-700 focus:ring-green-500',
  warning: 'border-yellow-300 text-yellow-700 focus:ring-yellow-500',
}

// Component-Specific Patterns
export const components = {
  // Carousel patterns
  carousel: {
    container: 'relative w-full',
    track: 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4',
    item: 'flex-shrink-0 snap-center',
    indicators: 'flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/30 shadow-lg',
  },
  
  // Card patterns
  card: {
    base: 'bg-white rounded-xl border border-gray-200 shadow-sm',
    glass: 'bg-white/95 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl',
    interactive: 'bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer',
  },
  
  // Button patterns
  button: {
    primary: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200',
    secondary: 'bg-white border border-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200',
    ghost: 'text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200',
  },
  
  // Input patterns
  input: {
    base: 'w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200',
    glass: 'w-full px-3 py-2 bg-white/60 backdrop-blur-md border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200',
  },
}

// Utility Patterns
export const utilities = {
  // Accessibility
  screenReader: 'sr-only',
  focusVisible: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2',
  
  // Performance
  willChange: 'will-change-transform',
  gpuAcceleration: 'transform-gpu',
  backfaceHidden: 'backface-visibility-hidden',
  
  // Scrolling
  smoothScroll: 'scroll-smooth',
  hideScrollbar: 'scrollbar-hide',
  
  // Touch
  touchManipulation: 'touch-manipulation',
  touchPanX: 'touch-pan-x',
}

// Export all patterns
export const componentPatterns = {
  glassMorphism,
  gradientBorders,
  interactions,
  typography,
  layouts,
  animations,
  states,
  components,
  utilities,
}

export default componentPatterns