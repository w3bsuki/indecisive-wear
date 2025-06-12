import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Glass morphism style presets for consistent UI
 */
export const glassStyles = {
  light: "bg-white/80 backdrop-blur-xl",
  medium: "bg-white/90 backdrop-blur-xl", 
  strong: "bg-white/95 backdrop-blur-xl",
  subtle: "bg-white/70 backdrop-blur-md",
  withBorder: "bg-white/90 backdrop-blur-xl border border-white/20",
  withShadow: "bg-white/90 backdrop-blur-xl shadow-xl",
  full: "bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl shadow-gray-900/8"
} as const

/**
 * Get consistent glass morphism classes
 */
export function getGlassClasses(variant: keyof typeof glassStyles = 'medium', additional?: string) {
  return cn(glassStyles[variant], additional)
}

/**
 * Pink gradient presets for consistent branding
 */
export const gradientStyles = {
  primary: "bg-gradient-to-r from-pink-500 to-purple-600",
  subtle: "bg-gradient-to-r from-pink-400 to-pink-600",
  intense: "bg-gradient-to-br from-pink-500 via-pink-600 to-purple-700",
  light: "bg-gradient-to-r from-pink-300 to-purple-400",
  button: "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
  text: "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent",
  background: "bg-gradient-to-br from-pink-50 via-white to-purple-50"
} as const

/**
 * Get consistent gradient classes
 */
export function getGradientClasses(variant: keyof typeof gradientStyles = 'primary', additional?: string) {
  return cn(gradientStyles[variant], additional)
}

/**
 * Consistent spacing scale
 */
export const spacing = {
  xs: "space-y-2",
  sm: "space-y-4", 
  md: "space-y-6",
  lg: "space-y-8",
  xl: "space-y-12",
  "2xl": "space-y-16",
  section: "space-y-8 sm:space-y-12 md:space-y-16",
  page: "space-y-12 sm:space-y-16 md:space-y-20"
} as const

/**
 * Consistent shadow values
 */
export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
  pink: "shadow-lg shadow-pink-500/20",
  glow: "shadow-[0_0_20px_rgba(236,72,153,0.3)]"
} as const