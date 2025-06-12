/**
 * UI Utilities
 * 
 * Consolidates UI-related utility functions:
 * - Responsive helpers
 * - Animation utilities
 * - Focus management
 * - Accessibility helpers
 */

import { cn } from '../utils';

// Responsive utilities
export function getResponsiveClasses(
  mobile: string,
  tablet?: string,
  desktop?: string
): string {
  const classes = [mobile];
  
  if (tablet) {
    classes.push(`sm:${tablet}`);
  }
  
  if (desktop) {
    classes.push(`lg:${desktop}`);
  }
  
  return classes.join(' ');
}

// Conditional className helper
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass: string = ''
): string {
  return condition ? trueClass : falseClass;
}

// Variant class builder
export function buildVariantClass(
  base: string,
  variant: string | undefined,
  variants: Record<string, string>
): string {
  if (!variant || !variants[variant]) {
    return base;
  }
  
  return cn(base, variants[variant]);
}

// Size class builder
export function buildSizeClass(
  base: string,
  size: string | undefined,
  sizes: Record<string, string>
): string {
  if (!size || !sizes[size]) {
    return base;
  }
  
  return cn(base, sizes[size]);
}

// Animation delay generator
export function getAnimationDelay(index: number, baseDelay: number = 0.1): string {
  return `${baseDelay * index}s`;
}

// Focus management
export function focusElement(selector: string): void {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
}

export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }
  
  container.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

// Accessibility helpers
export function getAriaLabel(
  text: string,
  context?: string
): string {
  return context ? `${text} - ${context}` : text;
}

export function announceToScreenReader(message: string): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Viewport utilities
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function getViewportSize(): { width: number; height: number } {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
}

// Scroll utilities
export function scrollToElement(
  element: HTMLElement | string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void {
  const target = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;
  
  if (target) {
    target.scrollIntoView(options);
  }
}

export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

// Theme utilities
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
}

export function watchSystemTheme(
  callback: (theme: 'light' | 'dark') => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  function handleChange(e: MediaQueryListEvent) {
    callback(e.matches ? 'dark' : 'light');
  }
  
  mediaQuery.addEventListener('change', handleChange);
  
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

// Device detection utilities
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Copy to clipboard utility
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    // Failed to copy to clipboard
    return false;
  }
}

// Random ID generator for components
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Debounced class updater
export function createClassUpdater(element: HTMLElement) {
  let timeoutId: NodeJS.Timeout;
  
  return function updateClass(
    className: string,
    duration: number = 100
  ): void {
    element.classList.add(className);
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      element.classList.remove(className);
    }, duration);
  };
} 