/**
 * 2025 Design Token System
 * Semantic design tokens following shadcn/ui best practices
 */

// Semantic Color System (Purpose-based, not color-based)
export const semanticColors = {
  // Surface colors
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  
  // Interactive colors  
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',
  
  secondary: 'hsl(var(--secondary))',
  secondaryForeground: 'hsl(var(--secondary-foreground))',
  
  // State colors
  success: 'hsl(142 76% 36%)',
  successForeground: 'hsl(138 62% 47%)',
  
  warning: 'hsl(48 96% 53%)', 
  warningForeground: 'hsl(26 83% 14%)',
  
  destructive: 'hsl(var(--destructive))',
  destructiveForeground: 'hsl(var(--destructive-foreground))',
  
  // Custom brand colors
  barbiePin: 'hsl(var(--barbie-pink))',
  barbiePinkForeground: 'hsl(var(--barbie-pink-foreground))',
  
  // Glass morphism
  glass: 'hsl(var(--barbie-glass))',
  glassForeground: 'hsl(var(--barbie-glass-foreground))',
} as const

// Component-specific tokens
export const componentTokens = {
  button: {
    height: {
      sm: '2.25rem', // 36px
      md: '2.5rem',  // 40px  
      lg: '2.75rem', // 44px (minimum touch target)
      xl: '3rem',    // 48px (comfortable touch target)
    },
    radius: 'var(--radius)',
    fontSize: {
      sm: '0.875rem',
      md: '1rem', 
      lg: '1.125rem',
    }
  },
  
  card: {
    radius: 'var(--radius)',
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
    shadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    }
  },
  
  input: {
    height: '2.5rem', // 40px minimum
    radius: 'calc(var(--radius) - 2px)',
    fontSize: '0.875rem',
  }
} as const

// Spacing system (8-point grid)
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
} as const

// Animation tokens
export const animations = {
  duration: {
    fast: '150ms',
    normal: '200ms', 
    slow: '300ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  }
} as const

// Export complete token system
export const designTokens = {
  colors: semanticColors,
  components: componentTokens,
  spacing,
  animations,
} as const

export type DesignTokens = typeof designTokens