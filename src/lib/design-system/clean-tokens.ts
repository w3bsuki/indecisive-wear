/**
 * Clean Design Tokens System
 * Focused on white + pink minimal aesthetic
 * Based on successful patterns from hat carousel and coming soon categories
 */

// Clean Color System - Minimal white + pink palette
export const cleanColors = {
  // White base system
  white: {
    pure: 'rgb(255, 255, 255)',
    glass: 'rgba(255, 255, 255, 0.90)', // Main glass background
    lightGlass: 'rgba(255, 255, 255, 0.60)', // Lighter glass
    overlay: 'rgba(255, 255, 255, 0.95)', // Strong white overlay
  },
  
  // Pink accent system (minimal usage)
  pink: {
    50: 'rgb(253, 242, 248)',   // Very light backgrounds
    100: 'rgb(252, 231, 243)',  // Light accents
    200: 'rgb(251, 207, 232)',  // Subtle borders/shadows
    300: 'rgb(249, 168, 212)',  // Light interactions
    400: 'rgb(244, 114, 182)',  // Medium accents
    500: 'rgb(236, 72, 153)',   // Primary pink
    600: 'rgb(219, 39, 119)',   // Darker interactions
  },
  
  // Gray system for text and subtle elements
  gray: {
    50: 'rgb(249, 250, 251)',
    100: 'rgb(243, 244, 246)',
    200: 'rgb(229, 231, 235)',   // Subtle borders
    300: 'rgb(209, 213, 219)',   // Light borders
    400: 'rgb(156, 163, 175)',   // Muted text
    500: 'rgb(107, 114, 128)',   // Secondary text
    600: 'rgb(75, 85, 99)',      // Primary text
    700: 'rgb(55, 65, 81)',      // Dark text
    800: 'rgb(31, 41, 55)',      // Headers
    900: 'rgb(17, 24, 39)',      // Strong headers
  }
}

// Minimal Background System
export const cleanBackgrounds = {
  // Primary container backgrounds
  glass: 'bg-white/90 backdrop-blur-xl',
  glassLight: 'bg-white/60 backdrop-blur-md',
  solid: 'bg-white',
  
  // Subtle accent backgrounds
  pinkGlass: 'bg-pink-50/80 backdrop-blur-sm',
  pinkLight: 'bg-pink-50/40',
  
  // Section backgrounds
  page: 'bg-white',
  section: 'bg-gray-50/30',
}

// Clean Border System
export const cleanBorders = {
  // Standard borders
  light: 'border border-gray-200/50',
  medium: 'border border-gray-200',
  strong: 'border border-gray-300',
  
  // Glass morphism borders
  glass: 'border border-white/50',
  glassLight: 'border border-white/30',
  
  // Pink accent borders
  pink: 'border border-pink-200/50',
  pinkMedium: 'border border-pink-300/60',
}

// Professional Shadow System (Enhanced)
export const cleanShadows = {
  // Multi-level shadow hierarchy
  subtle: 'shadow-sm shadow-gray-900/5',
  card: 'shadow-md shadow-gray-900/8',
  elevated: 'shadow-lg shadow-gray-900/12',
  floating: 'shadow-xl shadow-gray-900/15',
  dramatic: 'shadow-2xl shadow-gray-900/20',
  
  // Hover state shadows
  cardHover: 'shadow-xl shadow-gray-900/15',
  elevatedHover: 'shadow-2xl shadow-gray-900/18',
  floatingHover: 'shadow-2xl shadow-gray-900/25',
  
  // Glass morphism shadows
  glassSubtle: 'shadow-lg shadow-pink-500/5',
  glassMedium: 'shadow-xl shadow-pink-500/8',
  glassStrong: 'shadow-2xl shadow-pink-500/12',
  
  // Button shadows
  button: 'shadow-md shadow-gray-900/10',
  buttonHover: 'shadow-lg shadow-gray-900/15',
  buttonPressed: 'shadow-sm shadow-gray-900/15',
  
  // Special effects
  glow: 'shadow-[0_0_20px_rgba(236,72,153,0.08)]',
  glowHover: 'shadow-[0_0_30px_rgba(236,72,153,0.15)]',
  inset: 'inset shadow-sm shadow-gray-900/5',
}

// Clean Typography System
export const cleanTypography = {
  // Headers
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900',
  h2: 'text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900',
  h3: 'text-xl sm:text-2xl font-semibold text-gray-900',
  h4: 'text-lg sm:text-xl font-semibold text-gray-800',
  
  // Body text
  bodyLarge: 'text-base sm:text-lg text-gray-600 leading-relaxed',
  body: 'text-sm sm:text-base text-gray-600',
  bodySmall: 'text-xs sm:text-sm text-gray-500',
  
  // Special text
  accent: 'text-pink-600 font-medium',
  muted: 'text-gray-400',
  strong: 'text-gray-900 font-semibold',
}

// Minimal Animation System (reduced animations)
export const cleanAnimations = {
  // Subtle transitions
  transition: 'transition-all duration-200 ease-out',
  transitionSlow: 'transition-all duration-300 ease-out',
  
  // Hover effects (minimal)
  hoverLift: 'hover:transform hover:-translate-y-0.5',
  hoverScale: 'hover:scale-[1.01]',
  hoverShadow: 'hover:shadow-lg',
  
  // Focus states
  focus: 'focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:ring-offset-2',
}

// Clean Spacing System (Enhanced)
export const cleanSpacing = {
  // Section spacing (research-based)
  section: 'py-16 sm:py-20 md:py-24 lg:py-32',
  sectionMedium: 'py-12 sm:py-16 md:py-20',
  sectionCompact: 'py-8 sm:py-12 md:py-16',
  sectionTight: 'py-6 sm:py-8 md:py-10',
  
  // Container spacing
  container: 'px-4 sm:px-6 lg:px-8',
  containerWide: 'px-6 sm:px-8 lg:px-12',
  containerTight: 'px-3 sm:px-4 lg:px-6',
  
  // Element spacing (modern scale)
  cardPadding: 'p-6 sm:p-8 md:p-10',
  cardPaddingMedium: 'p-4 sm:p-6 md:p-8',
  cardPaddingCompact: 'p-3 sm:p-4 md:p-6',
  
  // Button spacing
  buttonPadding: 'px-4 py-2 sm:px-6 sm:py-3',
  buttonPaddingLarge: 'px-6 py-3 sm:px-8 sm:py-4',
  
  // Gap system (consistent scale)
  gap: 'gap-4 sm:gap-6',
  gapLarge: 'gap-6 sm:gap-8 md:gap-10',
  gapXLarge: 'gap-8 sm:gap-10 md:gap-12',
  gridGap: 'gap-4 sm:gap-6 md:gap-8',
  
  // Margin system
  marginSection: 'mb-12 sm:mb-16 md:mb-20',
  marginContainer: 'mb-8 sm:mb-12 md:mb-16',
  marginElement: 'mb-4 sm:mb-6 md:mb-8',
}

// Clean Component Patterns (Enhanced)
export const cleanComponents = {
  // Modern card patterns
  cardBase: 'bg-white rounded-xl border border-gray-200/50',
  cardGlass: 'bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20',
  cardSubtle: 'bg-white rounded-lg border border-gray-200/40',
  cardElevated: 'bg-white rounded-2xl border border-gray-200/30',
  
  // Card with shadows
  card: 'bg-white rounded-xl border border-gray-200/50 shadow-md shadow-gray-900/8',
  cardGlassWithShadow: 'bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-900/10',
  cardFloating: 'bg-white rounded-2xl border border-gray-200/30 shadow-xl shadow-gray-900/15',
  
  // Hover states
  cardHover: 'hover:shadow-xl hover:shadow-gray-900/15 transition-all duration-200',
  cardGlassHover: 'hover:shadow-2xl hover:shadow-pink-500/12 transition-all duration-300',
  cardLift: 'hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/15 transition-all duration-200',
  
  // Button patterns (enhanced)
  primary: 'bg-pink-500 text-white font-semibold rounded-xl shadow-md shadow-gray-900/10 hover:bg-pink-600 hover:shadow-lg hover:shadow-gray-900/15 transition-all duration-200',
  secondary: 'bg-white text-pink-600 border border-pink-200 font-medium rounded-xl shadow-sm shadow-gray-900/5 hover:bg-pink-50 hover:border-pink-300 hover:shadow-md hover:shadow-gray-900/10 transition-all duration-200',
  ghost: 'text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all duration-200',
  outline: 'border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200',
  
  // Input patterns
  input: 'w-full px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm shadow-gray-900/5 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-300 transition-all duration-200',
  inputGlass: 'w-full px-3 py-2 bg-white/90 backdrop-blur-sm border border-white/50 rounded-lg focus:ring-2 focus:ring-pink-500/50 transition-all duration-200',
  
  // Container patterns (modern nested approach)
  outerContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  innerContainer: 'max-w-4xl mx-auto',
  contentArea: 'bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-gray-900/10',
  glassContainer: 'bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl shadow-pink-500/8',
  section: 'bg-white rounded-xl border border-gray-200/50 shadow-lg shadow-gray-900/8',
  
  // Background patterns
  heroBackground: 'bg-gradient-to-br from-gray-50 via-white to-pink-50/30',
  heroBackgroundAccent: 'bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.05),transparent_50%)]',
  sectionBackground: 'bg-gradient-to-b from-gray-50/50 to-white',
}

// Layout Patterns (Enhanced)
export const cleanLayouts = {
  // Page layouts
  page: 'min-h-screen bg-white',
  container: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
  containerNarrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl',
  
  // Modern nested page layout system (using consistent layout)
  pageLayout: {
    superWide: 'max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16',
    contentArea: 'max-w-[1440px] mx-auto',
    mainContainer: 'bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-gray-900/8 p-4 sm:p-6 md:p-8 lg:p-12',
    sectionSpacing: 'space-y-8 sm:space-y-12 md:space-y-16',
    sectionPadding: 'py-6 sm:py-8 md:py-12',
    sectionPaddingCompact: 'py-4 sm:py-6 md:py-8',
  },
  
  // Page background system
  pageBackground: {
    main: 'relative min-h-screen overflow-hidden',
    gradient: 'absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-pink-50/20',
    content: 'relative z-10',
  },
  
  // Grid layouts
  cardGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  featureGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
  
  // Flex layouts
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  stack: 'flex flex-col space-y-4 sm:space-y-6',
}

// Export comprehensive clean design system
export const cleanDesignSystem = {
  colors: cleanColors,
  backgrounds: cleanBackgrounds,
  borders: cleanBorders,
  shadows: cleanShadows,
  typography: cleanTypography,
  animations: cleanAnimations,
  spacing: cleanSpacing,
  components: cleanComponents,
  layouts: cleanLayouts,
}

export default cleanDesignSystem