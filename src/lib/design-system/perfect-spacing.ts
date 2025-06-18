/**
 * PERFECT SPACING SYSTEM
 * 🎯 Mathematical precision using 8-point grid
 * Mobile-first responsive scaling for flawless UI/UX
 */

// Base unit: 8px (0.5rem)
export const SPACING_UNIT = 8

// Spacing scale based on 8-point grid
export const SPACING_SCALE = {
  0: '0px',
  0.5: '4px',    // 0.5 × 8 = 4px (micro adjustments)
  1: '8px',      // 1 × 8 = 8px (base unit)
  1.5: '12px',   // 1.5 × 8 = 12px
  2: '16px',     // 2 × 8 = 16px (standard mobile padding)
  2.5: '20px',   // 2.5 × 8 = 20px
  3: '24px',     // 3 × 8 = 24px (standard desktop padding)
  4: '32px',     // 4 × 8 = 32px
  5: '40px',     // 5 × 8 = 40px
  6: '48px',     // 6 × 8 = 48px (minimum touch target)
  7: '56px',     // 7 × 8 = 56px
  8: '64px',     // 8 × 8 = 64px
  9: '72px',     // 9 × 8 = 72px
  10: '80px',    // 10 × 8 = 80px
  12: '96px',    // 12 × 8 = 96px
  16: '128px',   // 16 × 8 = 128px
  20: '160px',   // 20 × 8 = 160px
  24: '192px',   // 24 × 8 = 192px
} as const

// Fluid spacing helper - creates responsive clamp values
export const fluidSpace = (minPx: number, maxPx: number): string => {
  const minRem = minPx / 16
  const maxRem = maxPx / 16
  const slope = (maxPx - minPx) / (1280 - 375) // viewport range
  const intercept = minRem - slope * 375 / 16
  const preferred = `${intercept.toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw`
  return `clamp(${minRem}rem, ${preferred}, ${maxRem}rem)`
}

// Screen edge margins
export const SCREEN_MARGINS = {
  mobile: {
    minimum: SPACING_SCALE[2],      // 16px
    comfortable: SPACING_SCALE[2.5], // 20px
    spacious: SPACING_SCALE[3]      // 24px
  },
  tablet: {
    minimum: SPACING_SCALE[3],      // 24px
    comfortable: SPACING_SCALE[4],  // 32px
    spacious: SPACING_SCALE[5]      // 40px
  },
  desktop: {
    minimum: SPACING_SCALE[4],      // 32px
    comfortable: SPACING_SCALE[6],  // 48px
    spacious: SPACING_SCALE[8]      // 64px
  }
} as const

// Button spacing system
export const BUTTON_SPACING = {
  height: {
    small: SPACING_SCALE[4],   // 32px (desktop only)
    medium: SPACING_SCALE[5],  // 40px (desktop comfortable)
    large: SPACING_SCALE[6],   // 48px (mobile minimum)
    xlarge: SPACING_SCALE[7]   // 56px (mobile comfortable)
  },
  paddingX: {
    small: SPACING_SCALE[2],   // 16px
    medium: SPACING_SCALE[3],  // 24px
    large: SPACING_SCALE[4],   // 32px
    xlarge: SPACING_SCALE[5]   // 40px
  },
  gap: {
    tight: SPACING_SCALE[1],    // 8px
    normal: SPACING_SCALE[1.5], // 12px
    relaxed: SPACING_SCALE[2],  // 16px
    loose: SPACING_SCALE[3]     // 24px
  }
} as const

// Card spacing system
export const CARD_SPACING = {
  padding: {
    mobile: SPACING_SCALE[2],   // 16px
    tablet: SPACING_SCALE[2.5], // 20px
    desktop: SPACING_SCALE[3]   // 24px
  },
  gap: {
    mobile: SPACING_SCALE[2],   // 16px
    tablet: SPACING_SCALE[2.5], // 20px
    desktop: SPACING_SCALE[3]   // 24px
  },
  marginBottom: {
    mobile: SPACING_SCALE[3],   // 24px
    tablet: SPACING_SCALE[4],   // 32px
    desktop: SPACING_SCALE[5]   // 40px
  }
} as const

// Form spacing system
export const FORM_SPACING = {
  groupGap: SPACING_SCALE[3],      // 24px between form groups
  fieldGap: SPACING_SCALE[2],      // 16px between fields
  inputPadding: {
    y: SPACING_SCALE[1.5],         // 12px vertical
    x: SPACING_SCALE[2]            // 16px horizontal
  },
  labelMargin: SPACING_SCALE[1],   // 8px
  helpTextMargin: SPACING_SCALE[0.5] // 4px
} as const

// Typography spacing
export const TYPOGRAPHY_SPACING = {
  lineHeight: {
    none: 1,
    tight: 1.25,    // Headings
    snug: 1.375,    // Subheadings
    normal: 1.5,    // Body text
    relaxed: 1.625, // Small text
    loose: 2        // Paragraphs
  },
  heading: {
    h1: {
      marginTop: '0',
      marginBottom: SPACING_SCALE[4]    // 32px
    },
    h2: {
      marginTop: SPACING_SCALE[6],      // 48px
      marginBottom: SPACING_SCALE[3]    // 24px
    },
    h3: {
      marginTop: SPACING_SCALE[4],      // 32px
      marginBottom: SPACING_SCALE[2]    // 16px
    }
  },
  paragraph: {
    marginBottom: SPACING_SCALE[2]      // 16px
  },
  list: {
    marginBottom: SPACING_SCALE[2],     // 16px
    itemGap: SPACING_SCALE[1]           // 8px
  }
} as const

// Section spacing system
export const SECTION_SPACING = {
  padding: {
    mobile: { y: SPACING_SCALE[6] },    // 48px
    tablet: { y: SPACING_SCALE[8] },    // 64px
    desktop: { y: SPACING_SCALE[10] }   // 80px
  },
  gap: {
    mobile: SPACING_SCALE[8],           // 64px
    tablet: SPACING_SCALE[10],          // 80px
    desktop: SPACING_SCALE[12]          // 96px
  }
} as const

// Touch target optimization
export const TOUCH_TARGETS = {
  minimum: {
    general: '44px',     // iOS standard
    android: '48px',     // Android preference
    edge: '48px',        // Near screen edges
    thumb: '56px'        // Thumb-reachable areas
  },
  optimal: {
    primary: '56px',     // Primary actions
    secondary: '48px',   // Secondary actions
    tertiary: '44px'     // Less important
  },
  spacing: {
    minimum: SPACING_SCALE[1],      // 8px
    comfortable: SPACING_SCALE[1.5], // 12px
    spacious: SPACING_SCALE[2]      // 16px
  }
} as const

// Responsive container padding
export const CONTAINER_PADDING = {
  // Mobile first with fluid scaling
  base: `px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12`, // 16, 20, 24, 32, 48
  tight: `px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8`, // 12, 16, 20, 24, 32
  loose: `px-5 sm:px-6 md:px-8 lg:px-10 xl:px-16` // 20, 24, 32, 40, 64
} as const

// Vertical rhythm system
export const VERTICAL_RHYTHM = {
  micro: SPACING_SCALE[1],     // 8px
  small: SPACING_SCALE[2],     // 16px  
  medium: SPACING_SCALE[3],    // 24px
  large: SPACING_SCALE[4],     // 32px
  xlarge: SPACING_SCALE[6],    // 48px
  xxlarge: SPACING_SCALE[8],   // 64px
  huge: SPACING_SCALE[12]      // 96px
} as const

// Horizontal rhythm system
export const HORIZONTAL_RHYTHM = {
  tight: SPACING_SCALE[1],     // 8px - Between related elements
  normal: SPACING_SCALE[2],    // 16px - Standard gap
  relaxed: SPACING_SCALE[3],   // 24px - Between groups
  loose: SPACING_SCALE[4]      // 32px - Between sections
} as const

// CSS custom properties for fluid spacing
export const SPACING_CSS_VARS = `
  --space-0: 0px;
  --space-0-5: 4px;
  --space-1: 8px;
  --space-1-5: 12px;
  --space-2: 16px;
  --space-2-5: 20px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-7: 56px;
  --space-8: 64px;
  --space-9: 72px;
  --space-10: 80px;
  --space-12: 96px;
  --space-16: 128px;
  --space-20: 160px;
  --space-24: 192px;
  
  /* Fluid spacing */
  --space-fluid-sm: ${fluidSpace(16, 24)};
  --space-fluid-md: ${fluidSpace(24, 32)};
  --space-fluid-lg: ${fluidSpace(32, 48)};
  --space-fluid-xl: ${fluidSpace(48, 64)};
  
  /* Touch targets */
  --touch-target-min: 44px;
  --touch-target-comfortable: 48px;
  --touch-target-optimal: 56px;
  
  /* Safe areas */
  --safe-area-top: env(safe-area-inset-top);
  --safe-area-bottom: env(safe-area-inset-bottom);
  --safe-area-left: env(safe-area-inset-left);
  --safe-area-right: env(safe-area-inset-right);
`

// Master perfect spacing export
export const PERFECT_SPACING = {
  unit: SPACING_UNIT,
  scale: SPACING_SCALE,
  fluid: fluidSpace,
  screen: SCREEN_MARGINS,
  button: BUTTON_SPACING,
  card: CARD_SPACING,
  form: FORM_SPACING,
  typography: TYPOGRAPHY_SPACING,
  section: SECTION_SPACING,
  touch: TOUCH_TARGETS,
  container: CONTAINER_PADDING,
  vertical: VERTICAL_RHYTHM,
  horizontal: HORIZONTAL_RHYTHM,
  cssVars: SPACING_CSS_VARS
} as const

export default PERFECT_SPACING