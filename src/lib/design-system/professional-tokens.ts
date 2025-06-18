/**
 * Professional Design Tokens System
 * Inspired by Magic UI, Shadcn/UI, and Aceternity patterns
 */

// Color System - Professional gradients and glass morphism
export const colors = {
  // Primary Barbie theme with professional variants
  primary: {
    50: 'rgb(253 242 248)', // Very light pink
    100: 'rgb(252 231 243)', // Light pink
    200: 'rgb(251 207 232)', // Soft pink
    300: 'rgb(249 168 212)', // Medium pink
    400: 'rgb(244 114 182)', // Bright pink
    500: 'rgb(236 72 153)',  // Main pink
    600: 'rgb(219 39 119)',  // Dark pink
    700: 'rgb(190 24 93)',   // Darker pink
    800: 'rgb(157 23 77)',   // Deep pink
    900: 'rgb(131 24 67)',   // Deepest pink
  },
  
  // Glass morphism backgrounds
  glass: {
    white: 'rgba(255, 255, 255, 0.95)',
    whiteLight: 'rgba(255, 255, 255, 0.60)',
    whiteUltraLight: 'rgba(255, 255, 255, 0.30)',
    pink: 'rgba(253, 242, 248, 0.90)',
    pinkLight: 'rgba(253, 242, 248, 0.60)',
  },
  
  // Professional gradients
  gradients: {
    // Border gradients for glass morphism
    borderPrimary: 'linear-gradient(135deg, rgba(244, 114, 182, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(244, 114, 182, 0.5) 100%)',
    borderSecondary: 'linear-gradient(135deg, rgba(251, 207, 232, 0.4) 0%, rgba(196, 181, 253, 0.3) 50%, rgba(251, 207, 232, 0.4) 100%)',
    
    // Background gradients
    hero: 'linear-gradient(135deg, rgba(253, 242, 248, 0.8) 0%, rgba(255, 255, 255, 1) 50%, rgba(253, 242, 248, 0.6) 100%)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.90) 100%)',
    
    // Interactive gradients
    button: 'linear-gradient(135deg, rgb(236, 72, 153) 0%, rgb(168, 85, 247) 100%)',
    buttonHover: 'linear-gradient(135deg, rgb(219, 39, 119) 0%, rgb(147, 51, 234) 100%)',
  }
}

// Spacing System - Consistent rhythm
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '6rem',    // 96px
  '6xl': '8rem',    // 128px
}

// Typography System - Professional hierarchy
export const typography = {
  // Font families
  fontFamily: {
    heading: ['Cal Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
  },
  
  // Font sizes with responsive scaling
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
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  
  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  }
}

// Shadow System - Professional depth
export const shadows = {
  // Glass morphism shadows
  glass: {
    sm: '0 1px 2px 0 rgba(236, 72, 153, 0.05)',
    md: '0 4px 6px -1px rgba(236, 72, 153, 0.1), 0 2px 4px -1px rgba(236, 72, 153, 0.06)',
    lg: '0 10px 15px -3px rgba(236, 72, 153, 0.1), 0 4px 6px -2px rgba(236, 72, 153, 0.05)',
    xl: '0 20px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)',
  },
  
  // Professional shadows
  card: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.03)',
  cardHover: '0 8px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.05)',
  
  // Interactive shadows
  button: '0 2px 4px rgba(236, 72, 153, 0.2)',
  buttonHover: '0 4px 8px rgba(236, 72, 153, 0.3)',
}

// Border Radius System - Modern rounded corners
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
}

// Animation System - Smooth micro-interactions
export const animations = {
  // Timing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Duration presets
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slowest: '700ms',
  },
  
  // Transform presets
  transform: {
    hover: 'translateY(-2px) scale(1.02)',
    press: 'translateY(0px) scale(0.98)',
    float: 'translateY(-4px)',
  }
}

// Component Presets - Reusable component styling
export const componentPresets = {
  // Glass morphism card
  glassCard: {
    background: colors.glass.white,
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: borderRadius['2xl'],
    boxShadow: shadows.card,
  },
  
  // Professional button
  button: {
    background: colors.gradients.button,
    borderRadius: borderRadius.xl,
    boxShadow: shadows.button,
    fontWeight: typography.fontWeight.semibold,
    transition: `all ${animations.duration.normal} ${animations.easing.default}`,
  },
  
  // Input field
  input: {
    background: colors.glass.whiteLight,
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(236, 72, 153, 0.2)',
    borderRadius: borderRadius.lg,
    transition: `all ${animations.duration.fast} ${animations.easing.default}`,
  }
}

// Responsive Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// Export everything as a single design system object
export const designSystem = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  animations,
  componentPresets,
  breakpoints,
}

export default designSystem