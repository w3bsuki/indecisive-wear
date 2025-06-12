/**
 * UI-specific Constants
 */

// Button variants and sizes
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  DESTRUCTIVE: 'destructive',
} as const;

export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

// Input types
export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  SEARCH: 'search',
} as const;

// Dialog/Modal sizes
export const DIALOG_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const;

// Toast variants
export const TOAST_VARIANTS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Animation types and directions
export const ANIMATION_TYPES = {
  FADE: 'fade',
  SLIDE: 'slide',
  SCALE: 'scale',
  ROTATE: 'rotate',
} as const;

export const ANIMATION_DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

// Loading variants
export const LOADING_VARIANTS = {
  SPINNER: 'spinner',
  DOTS: 'dots',
  PULSE: 'pulse',
} as const;

// Layout variants
export const LAYOUT_VARIANTS = {
  DEFAULT: 'default',
  CENTERED: 'centered',
  FULL_WIDTH: 'full-width',
} as const;

export const LAYOUT_PADDING = {
  NONE: 'none',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

// Common CSS classes
export const CSS_CLASSES = {
  CONTAINER: 'container mx-auto px-4',
  FLEX_CENTER: 'flex items-center justify-center',
  FLEX_BETWEEN: 'flex items-center justify-between',
  ABSOLUTE_CENTER: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  OVERLAY: 'fixed inset-0 bg-black/50 z-50',
  HIDDEN: 'sr-only',
} as const;

// Z-index values
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const; 