/**
 * Unified Layout Constants for Consistent UI
 * Mobile-first approach with React Native-like experience
 */

export const LAYOUT = {
  // Maximum width - matches navbar exactly
  maxWidth: 'max-w-[1600px]',
  
  // Responsive padding system - matches navbar exactly
  padding: {
    // Mobile: tight padding for more content
    mobile: 'px-3',
    // Tablet: comfortable padding
    tablet: 'sm:px-4 md:px-6',
    // Desktop: generous padding
    desktop: 'lg:px-8 xl:px-12',
    // Combined responsive padding
    responsive: 'px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12'
  },
  
  // Container with consistent width and padding
  container: {
    // Base container matching navbar
    base: 'max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12',
    // Fluid container for full-width sections
    fluid: 'w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12',
    // Narrow container for focused content
    narrow: 'max-w-4xl mx-auto px-3 sm:px-4 md:px-6'
  },
  
  // Navbar specific (to ensure consistency)
  navbar: {
    height: {
      mobile: 'h-14',
      tablet: 'sm:h-16',
      desktop: 'lg:h-18'
    },
    padding: 'px-3 sm:px-6 md:px-10'
  },
  
  // Safe areas for mobile devices
  safeArea: {
    top: 'pt-safe pt-14', // Account for navbar
    bottom: 'pb-safe',
    paddingTop: 'safe-area-inset-top',
    paddingBottom: 'safe-area-inset-bottom'
  },
  
  // Touch targets
  touch: {
    minimum: 'min-h-[44px] min-w-[44px]',
    comfortable: 'min-h-[48px] min-w-[48px]',
    large: 'min-h-[56px] min-w-[56px]'
  },
  
  // Breakpoints (matching Tailwind)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  
  // Z-index scale
  zIndex: {
    behind: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    notification: 80,
    navbar: 90
  }
}

// Helper function to get consistent container classes
export function getContainer(type: 'base' | 'fluid' | 'narrow' = 'base') {
  return LAYOUT.container[type]
}

// Helper function for responsive padding
export function getPadding(responsive = true) {
  if (responsive) {
    return LAYOUT.padding.responsive
  }
  return `${LAYOUT.padding.mobile} ${LAYOUT.padding.tablet} ${LAYOUT.padding.desktop}`
}