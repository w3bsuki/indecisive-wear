/**
 * Clean Component Patterns
 * Minimal, professional patterns based on successful carousel and categories design
 */

import { cleanDesignSystem } from './clean-tokens'

// Clean Glass Morphism Patterns (minimal usage)
export const cleanGlass = {
  // Primary glass container (like carousel)
  container: 'bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl shadow-pink-500/5',
  
  // Light glass container
  containerLight: 'bg-white/80 backdrop-blur-md rounded-xl border border-white/30 shadow-lg shadow-gray-900/5',
  
  // Subtle glass overlay
  overlay: 'bg-white/95 backdrop-blur-sm',
  
  // Clean card (no heavy glass effects)
  card: 'bg-white rounded-xl border border-gray-200/50 shadow-lg shadow-gray-900/5',
}

// Minimal Border Patterns
export const cleanBorderPatterns = {
  // Standard borders
  default: 'border border-gray-200/50',
  medium: 'border border-gray-300/60',
  
  // Pink accent borders (very subtle)
  pinkSubtle: 'border border-pink-200/30',
  pink: 'border border-pink-200/50',
  
  // Glass borders
  glass: 'border border-white/50',
  glassLight: 'border border-white/30',
}

// Professional Shadow Patterns
export const cleanShadowPatterns = {
  // Card shadows
  card: 'shadow-lg shadow-gray-900/5',
  cardHover: 'shadow-xl shadow-gray-900/8',
  
  // Minimal pink shadows (like carousel)
  pinkSubtle: 'shadow-lg shadow-pink-500/3',
  pink: 'shadow-xl shadow-pink-500/5',
  pinkHover: 'shadow-2xl shadow-pink-500/8',
  
  // Button shadows
  button: 'shadow-md shadow-gray-900/8',
  buttonHover: 'shadow-lg shadow-gray-900/12',
  
  // Glow effects (very subtle)
  glow: 'shadow-[0_0_20px_rgba(236,72,153,0.06)]',
  glowHover: 'shadow-[0_0_25px_rgba(236,72,153,0.08)]',
}

// Clean Interactive Patterns (minimal animations)
export const cleanInteractions = {
  // Subtle hover effects
  cardHover: 'hover:shadow-xl hover:shadow-gray-900/8 transition-all duration-200',
  liftHover: 'hover:transform hover:-translate-y-0.5 transition-all duration-200',
  scaleHover: 'hover:scale-[1.01] transition-transform duration-200',
  
  // Button interactions
  button: 'transition-all duration-200 hover:shadow-lg active:scale-[0.98]',
  
  // Focus states
  focus: 'focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:ring-offset-2',
  
  // Minimal loading states
  loading: 'opacity-60 cursor-not-allowed',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
}

// Clean Typography Patterns
export const cleanTypographyPatterns = {
  // Section headers
  sectionHeader: 'text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2',
  sectionSubtitle: 'text-gray-600 text-sm sm:text-base max-w-md mx-auto text-center',
  
  // Card content
  cardTitle: 'text-lg font-semibold text-gray-900',
  cardSubtitle: 'text-sm text-gray-600',
  cardDescription: 'text-xs text-gray-500 leading-relaxed',
  
  // Navigation
  navLink: 'text-gray-700 font-medium hover:text-pink-600 transition-colors duration-200',
  
  // Buttons
  buttonText: 'font-semibold',
  buttonTextSecondary: 'font-medium',
}

// Clean Layout Patterns
export const cleanLayoutPatterns = {
  // Page layouts
  page: 'min-h-screen bg-white',
  section: 'py-12 sm:py-16 md:py-20',
  sectionCompact: 'py-8 sm:py-12',
  
  // Container patterns
  container: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
  containerNarrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl',
  
  // Grid patterns (clean spacing)
  cardGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  featureGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  
  // Flex patterns
  centerContent: 'flex items-center justify-center',
  spaceBetween: 'flex items-center justify-between',
  stackVertical: 'flex flex-col space-y-4',
  stackVerticalLarge: 'flex flex-col space-y-6 sm:space-y-8',
}

// Component-Specific Clean Patterns
export const cleanComponentPatterns = {
  // Hero section patterns
  hero: {
    container: 'relative min-h-screen flex items-center justify-center py-20',
    background: 'absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white',
    content: 'relative z-10 text-center space-y-8',
  },
  
  // Card patterns (based on carousel success)
  card: {
    base: 'bg-white rounded-xl border border-gray-200/50 shadow-lg shadow-gray-900/5',
    hover: 'hover:shadow-xl hover:shadow-gray-900/8 transition-all duration-200',
    glass: 'bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl shadow-pink-500/5',
    content: 'p-4 sm:p-6',
  },
  
  // Button patterns
  button: {
    primary: 'bg-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-pink-600 hover:shadow-lg transition-all duration-200',
    secondary: 'bg-white text-pink-600 border border-pink-200 font-medium px-6 py-3 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all duration-200',
    ghost: 'text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200',
    small: 'px-4 py-2 text-sm rounded-lg',
  },
  
  // Navigation patterns
  nav: {
    container: 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm',
    content: 'container mx-auto px-4 sm:px-6 lg:px-8',
    link: 'text-gray-700 font-medium hover:text-pink-600 transition-colors duration-200',
  },
  
  // Form patterns
  form: {
    field: 'space-y-2',
    label: 'text-sm font-medium text-gray-700',
    input: 'w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500/50 focus:border-pink-300 transition-all duration-200',
    error: 'text-sm text-red-600',
  },
  
  // Carousel patterns (based on existing success)
  carousel: {
    container: 'bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl shadow-pink-500/5 p-6 sm:p-8',
    track: 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4',
    item: 'flex-shrink-0 snap-center',
    indicators: 'flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/30 shadow-lg',
  },
}

// Accessibility Patterns
export const cleanAccessibilityPatterns = {
  // Screen reader
  srOnly: 'sr-only',
  
  // Focus management
  focusVisible: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2',
  
  // Touch targets (44px minimum)
  touchTarget: 'min-h-[44px] min-w-[44px]',
  
  // Skip links
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded-lg shadow-lg z-50',
}

// Performance Patterns
export const cleanPerformancePatterns = {
  // GPU acceleration
  gpu: 'transform-gpu',
  willChange: 'will-change-transform',
  
  // Scroll optimization
  smoothScroll: 'scroll-smooth',
  touchScroll: '-webkit-overflow-scrolling: touch',
  
  // Image optimization
  imageContainer: 'relative overflow-hidden',
  image: 'object-cover transition-transform duration-300',
}

// Export all clean patterns
export const cleanPatterns = {
  glass: cleanGlass,
  borders: cleanBorderPatterns,
  shadows: cleanShadowPatterns,
  interactions: cleanInteractions,
  typography: cleanTypographyPatterns,
  layouts: cleanLayoutPatterns,
  components: cleanComponentPatterns,
  accessibility: cleanAccessibilityPatterns,
  performance: cleanPerformancePatterns,
}

export default cleanPatterns