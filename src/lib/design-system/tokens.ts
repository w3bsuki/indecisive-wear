/**
 * Design System Tokens
 * 
 * Centralized design tokens for consistent UI/UX
 * Maintains the white + pink "Barbie-style" aesthetic
 */

export const tokens = {
  // Color palette - Pink and white theme
  colors: {
    pink: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Primary pink
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  // Spacing scale - Consistent spacing throughout
  spacing: {
    // Component padding
    component: {
      xs: 'p-2',      // 8px
      sm: 'p-3',      // 12px
      md: 'p-4',      // 16px
      lg: 'p-6',      // 24px
      xl: 'p-8',      // 32px
    },
    // Section padding
    section: {
      mobile: 'py-12 px-4',      // 48px vertical, 16px horizontal
      tablet: 'md:py-16 md:px-6', // 64px vertical, 24px horizontal
      desktop: 'lg:py-24 lg:px-8', // 96px vertical, 32px horizontal
    },
    // Gap spacing for flex/grid
    gap: {
      xs: 'gap-2',    // 8px
      sm: 'gap-3',    // 12px
      md: 'gap-4',    // 16px
      lg: 'gap-6',    // 24px
      xl: 'gap-8',    // 32px
      '2xl': 'gap-12', // 48px
    },
  },

  // Border radius - Soft, rounded corners
  borderRadius: {
    none: 'rounded-none',
    sm: 'rounded-md',     // 6px
    md: 'rounded-lg',     // 8px
    lg: 'rounded-xl',     // 12px
    xl: 'rounded-2xl',    // 16px
    full: 'rounded-full',
  },

  // Border styles - Subtle pink borders
  borders: {
    default: 'border border-pink-100',
    hover: 'hover:border-pink-200',
    focus: 'focus:border-pink-300',
    card: 'border border-pink-100/50',
    input: 'border-2 border-gray-200 focus:border-pink-400',
  },

  // Shadows - Soft, elegant shadows
  shadows: {
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    pink: 'shadow-pink-200/20',
    hover: 'hover:shadow-md',
    card: 'shadow-sm hover:shadow-md',
  },

  // Animation - Smooth, delightful animations
  animation: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    scale: {
      subtle: 'scale-[1.02]',
      normal: 'scale-105',
      large: 'scale-110',
    },
  },

  // Typography - Clean, modern type scale
  typography: {
    // Font families
    fontFamily: {
      sans: 'var(--font-inter)',
      heading: 'var(--font-cal)',
      mono: 'var(--font-roboto-mono)',
    },
    // Font sizes with line heights
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
    },
    // Font weights
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },

  // Layout - Consistent layout patterns
  layout: {
    container: {
      base: 'container mx-auto',
      padded: 'container mx-auto px-4 md:px-6 lg:px-8',
      narrow: 'max-w-4xl mx-auto',
      wide: 'max-w-7xl mx-auto',
    },
    grid: {
      cols1: 'grid grid-cols-1',
      cols2: 'grid grid-cols-1 md:grid-cols-2',
      cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    },
    flex: {
      center: 'flex items-center justify-center',
      between: 'flex items-center justify-between',
      start: 'flex items-center justify-start',
      end: 'flex items-center justify-end',
      col: 'flex flex-col',
    },
  },

  // Mobile-specific tokens
  mobile: {
    touchTarget: {
      min: 'min-h-[44px] min-w-[44px]', // iOS minimum
      recommended: 'min-h-[48px] min-w-[48px]', // Recommended
    },
    safeArea: {
      top: 'pt-safe',
      bottom: 'pb-safe',
      x: 'px-safe',
      y: 'py-safe',
    },
    viewport: {
      height: 'h-[100dvh]', // Dynamic viewport height
      minHeight: 'min-h-[100dvh]',
    },
  },

  // Z-index scale
  zIndex: {
    base: 'z-0',
    above: 'z-10',
    dropdown: 'z-20',
    sticky: 'z-30',
    overlay: 'z-40',
    modal: 'z-50',
    popover: 'z-60',
    tooltip: 'z-70',
  },
} as const

// Type-safe token getter
export function getToken<T extends keyof typeof tokens>(
  category: T
): typeof tokens[T] {
  return tokens[category]
}

// CSS variables for runtime access
export const cssVariables = `
  :root {
    /* Colors */
    --color-pink-50: #fdf2f8;
    --color-pink-100: #fce7f3;
    --color-pink-200: #fbcfe8;
    --color-pink-300: #f9a8d4;
    --color-pink-400: #f472b6;
    --color-pink-500: #ec4899;
    --color-pink-600: #db2777;
    
    /* Animation */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
    --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* Border Radius */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
  }
`