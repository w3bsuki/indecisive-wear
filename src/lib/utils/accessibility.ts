/**
 * Accessibility Utilities for WCAG 2.1 AA Compliance
 * 
 * Features:
 * - Focus management
 * - Screen reader announcements
 * - Keyboard navigation
 * - Color contrast validation
 * - ARIA helpers
 */

// Focus management
export interface FocusableElement extends HTMLElement {
  focus(): void;
  blur(): void;
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): FocusableElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    'audio[controls]',
    'video[controls]',
    'details > summary'
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)) as FocusableElement[];
}

/**
 * Trap focus within a container (for modals, dialogs)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) return () => {};

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Focus first element initially
  firstElement.focus();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab (backwards)
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forwards)
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Manage focus restoration after modal/dialog closes
 */
export function createFocusManager() {
  let previouslyFocusedElement: FocusableElement | null = null;

  return {
    saveFocus: () => {
      previouslyFocusedElement = document.activeElement as FocusableElement;
    },
    restoreFocus: () => {
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
      }
    }
  };
}

// Screen reader announcements
let announcementId = 0;

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite',
  timeout: number = 1000
): void {
  const announcement = document.createElement('div');
  const id = `announcement-${++announcementId}`;
  
  announcement.id = id;
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after timeout
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }, timeout);
}

/**
 * Create a live region for dynamic content updates
 */
export function createLiveRegion(
  priority: 'polite' | 'assertive' = 'polite'
): {
  element: HTMLElement;
  announce: (message: string) => void;
  destroy: () => void;
} {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  
  document.body.appendChild(liveRegion);

  return {
    element: liveRegion,
    announce: (message: string) => {
      liveRegion.textContent = message;
    },
    destroy: () => {
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    }
  };
}

// Keyboard navigation helpers
export interface KeyboardEventHandler {
  (event: KeyboardEvent): void | boolean;
}

/**
 * Handle common keyboard interactions
 */
export function handleKeyboardNavigation(handlers: {
  onEnter?: KeyboardEventHandler;
  onSpace?: KeyboardEventHandler;
  onEscape?: KeyboardEventHandler;
  onArrowUp?: KeyboardEventHandler;
  onArrowDown?: KeyboardEventHandler;
  onArrowLeft?: KeyboardEventHandler;
  onArrowRight?: KeyboardEventHandler;
  onHome?: KeyboardEventHandler;
  onEnd?: KeyboardEventHandler;
}): KeyboardEventHandler {
  return (event: KeyboardEvent) => {
    let handled = false;

    switch (event.key) {
      case 'Enter':
        if (handlers.onEnter) {
          handled = handlers.onEnter(event) !== false;
        }
        break;
      case ' ':
        if (handlers.onSpace) {
          handled = handlers.onSpace(event) !== false;
        }
        break;
      case 'Escape':
        if (handlers.onEscape) {
          handled = handlers.onEscape(event) !== false;
        }
        break;
      case 'ArrowUp':
        if (handlers.onArrowUp) {
          handled = handlers.onArrowUp(event) !== false;
        }
        break;
      case 'ArrowDown':
        if (handlers.onArrowDown) {
          handled = handlers.onArrowDown(event) !== false;
        }
        break;
      case 'ArrowLeft':
        if (handlers.onArrowLeft) {
          handled = handlers.onArrowLeft(event) !== false;
        }
        break;
      case 'ArrowRight':
        if (handlers.onArrowRight) {
          handled = handlers.onArrowRight(event) !== false;
        }
        break;
      case 'Home':
        if (handlers.onHome) {
          handled = handlers.onHome(event) !== false;
        }
        break;
      case 'End':
        if (handlers.onEnd) {
          handled = handlers.onEnd(event) !== false;
        }
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
}

// Color contrast utilities
/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance of a color
 */
function getLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 */
export function meetsContrastRequirement(
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  } else {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }
}

// ARIA helpers
/**
 * Generate unique ID for ARIA relationships
 */
let idCounter = 0;
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Create ARIA label with context
 */
export function createAriaLabel(text: string, context?: string): string {
  return context ? `${text}, ${context}` : text;
}

/**
 * Manage ARIA expanded state
 */
export function toggleAriaExpanded(element: HTMLElement): boolean {
  const currentState = element.getAttribute('aria-expanded') === 'true';
  const newState = !currentState;
  element.setAttribute('aria-expanded', newState.toString());
  return newState;
}

/**
 * Set ARIA pressed state for toggle buttons
 */
export function setAriaPressed(element: HTMLElement, pressed: boolean): void {
  element.setAttribute('aria-pressed', pressed.toString());
}

/**
 * Create ARIA description for complex interactions
 */
export function createAriaDescription(
  elementId: string,
  description: string
): HTMLElement {
  const descriptionId = `${elementId}-description`;
  let descriptionElement = document.getElementById(descriptionId);
  
  if (!descriptionElement) {
    descriptionElement = document.createElement('div');
    descriptionElement.id = descriptionId;
    descriptionElement.className = 'sr-only';
    document.body.appendChild(descriptionElement);
  }
  
  descriptionElement.textContent = description;
  
  // Add aria-describedby to the target element
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    targetElement.setAttribute('aria-describedby', descriptionId);
  }
  
  return descriptionElement;
}

// Reduced motion detection
/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Conditionally apply animation based on user preference
 */
export function respectMotionPreference<T>(
  animation: T,
  alternative: T | null = null
): T | null {
  return prefersReducedMotion() ? alternative : animation;
}

// Form accessibility helpers
/**
 * Associate label with form control
 */
export function associateLabel(
  inputId: string,
  labelText: string,
  isRequired: boolean = false
): HTMLLabelElement {
  let label = document.querySelector(`label[for="${inputId}"]`) as HTMLLabelElement;
  
  if (!label) {
    label = document.createElement('label');
    label.setAttribute('for', inputId);
    
    const input = document.getElementById(inputId);
    if (input && input.parentNode) {
      input.parentNode.insertBefore(label, input);
    }
  }
  
  label.textContent = labelText + (isRequired ? ' (required)' : '');
  
  return label;
}

/**
 * Add validation message with proper ARIA associations
 */
export function addValidationMessage(
  inputId: string,
  message: string,
  type: 'error' | 'success' | 'warning' = 'error'
): HTMLElement {
  const messageId = `${inputId}-${type}`;
  let messageElement = document.getElementById(messageId);
  
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = messageId;
    messageElement.className = `form-${type} sr-only`;
    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    
    const input = document.getElementById(inputId);
    if (input && input.parentNode) {
      input.parentNode.appendChild(messageElement);
    }
  }
  
  messageElement.textContent = message;
  
  // Update input's aria-describedby
  const input = document.getElementById(inputId);
  if (input) {
    const describedBy = input.getAttribute('aria-describedby') || '';
    const ids = describedBy.split(' ').filter(Boolean);
    
    if (!ids.includes(messageId)) {
      ids.push(messageId);
      input.setAttribute('aria-describedby', ids.join(' '));
    }
    
    // Set aria-invalid for errors
    if (type === 'error') {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }
  
  return messageElement;
}

 