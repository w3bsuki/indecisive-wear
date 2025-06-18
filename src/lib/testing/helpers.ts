/**
 * Testing Helpers - Modernized for Vitest
 * 
 * Common utilities for testing React components and application logic
 * Updated for Phase 11: Developer Experience & Testing
 */

import { vi } from 'vitest'
import type { Product } from '@/lib/constants/product-data';
import type { WaitlistEntry } from '@/lib/types/waitlist';

// Component testing helpers
export const testHelpers = {
  // Mock window.matchMedia for responsive hooks
  mockMatchMedia: (matches: boolean = false) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  },

  // Mock IntersectionObserver
  mockIntersectionObserver: () => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
    window.IntersectionObserverEntry = vi.fn();
  },

  // Mock ResizeObserver
  mockResizeObserver: () => {
    const mockResizeObserver = vi.fn();
    mockResizeObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.ResizeObserver = mockResizeObserver;
  },

  // Mock requestAnimationFrame
  mockAnimationFrame: () => {
    global.requestAnimationFrame = vi.fn(cb => {
      setTimeout(cb, 0);
      return 1; // Return a number as required by requestAnimationFrame
    });
    global.cancelAnimationFrame = vi.fn(() => {});
  },

  // Mock performance.now
  mockPerformanceNow: () => {
    Object.defineProperty(global, 'performance', {
      writable: true,
      value: {
        now: vi.fn(() => Date.now()),
        mark: vi.fn(),
        measure: vi.fn(),
        navigation: { type: 'navigate' },
        timing: {
          navigationStart: Date.now(),
          loadEventEnd: Date.now() + 1000,
        },
      },
    });
  },

  // Mock Next.js router
  mockNextRouter: (overrides: Record<string, any> = {}) => {
    const mockRouter = {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn().mockResolvedValue(undefined),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
      isLocaleDomain: true,
      isReady: true,
      ...overrides,
    }
    
    vi.doMock('next/navigation', () => ({
      useRouter: () => mockRouter,
      usePathname: () => mockRouter.pathname,
      useSearchParams: () => new URLSearchParams(),
      notFound: vi.fn(),
      redirect: vi.fn(),
    }))
    
    return mockRouter
  },

  // Wait for next tick
  waitForNextTick: () => new Promise(resolve => setTimeout(resolve, 0)),

  // Wait for specific time
  wait: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Simulate user interaction delay
  simulateUserDelay: () => testHelpers.wait(100),

  // Advanced timing utilities
  advanceTimersByTime: (ms: number) => {
    vi.advanceTimersByTime(ms)
  },

  runAllTimers: () => {
    vi.runAllTimers()
  },

  runOnlyPendingTimers: () => {
    vi.runOnlyPendingTimers()
  },
};

// Form testing helpers
export const formHelpers = {
  // Fill form field with user event simulation
  fillField: async (input: HTMLInputElement, value: string) => {
    input.focus()
    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Submit form
  submitForm: async (form: HTMLFormElement) => {
    form.dispatchEvent(new Event('submit', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Clear form
  clearForm: async (form: HTMLFormElement) => {
    const inputs = form.querySelectorAll('input, textarea, select')
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.value = ''
        input.dispatchEvent(new Event('input', { bubbles: true }))
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
    await testHelpers.waitForNextTick()
  },

  // Validate form with modern validation API
  validateForm: (form: HTMLFormElement) => {
    return form.checkValidity()
  },

  // Get form data
  getFormData: (form: HTMLFormElement) => {
    return new FormData(form)
  },

  // Get form values as object
  getFormValues: (form: HTMLFormElement) => {
    const formData = new FormData(form)
    const values: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      values[key] = value
    }
    return values
  },
};

// API testing helpers (modernized for Vitest)
export const apiHelpers = {
  // Mock fetch response
  mockFetchResponse: (data: any, status: number = 200, ok: boolean = true) => {
    return Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
      headers: new Headers(),
      statusText: status === 200 ? 'OK' : 'Error',
      clone: vi.fn(),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
    } as unknown as Response)
  },

  // Mock fetch error
  mockFetchError: (message: string = 'Network error') => {
    return Promise.reject(new Error(message))
  },

  // Setup global fetch mock
  setupFetchMock: () => {
    global.fetch = vi.fn()
    return global.fetch as unknown as typeof vi.fn
  },

  // Reset fetch mock
  resetFetchMock: () => {
    if (global.fetch && 'mockReset' in global.fetch) {
      (global.fetch as any).mockReset()
    }
  },

  // Mock TanStack Query responses
  mockQueryResponse: <T>(data: T, isLoading = false, error: Error | null = null) => ({
    data,
    isLoading,
    isError: !!error,
    error,
    isSuccess: !error && !isLoading,
    refetch: vi.fn(),
    fetchStatus: 'idle' as const,
    status: error ? 'error' as const : isLoading ? 'pending' as const : 'success' as const,
  }),
};

// Component query helpers (enhanced)
export const queryHelpers = {
  // Get by test id
  getByTestId: (container: HTMLElement, testId: string) => {
    return container.querySelector(`[data-testid="${testId}"]`)
  },

  // Get all by test id
  getAllByTestId: (container: HTMLElement, testId: string) => {
    return Array.from(container.querySelectorAll(`[data-testid="${testId}"]`))
  },

  // Get by role with name
  getByRoleAndName: (container: HTMLElement, role: string, name: string) => {
    return container.querySelector(`[role="${role}"][aria-label*="${name}"], [role="${role}"][title*="${name}"]`)
  },

  // Get form by name
  getFormByName: (container: HTMLElement, name: string) => {
    return container.querySelector(`form[name="${name}"]`) as HTMLFormElement
  },

  // Get input by name
  getInputByName: (container: HTMLElement, name: string) => {
    return container.querySelector(`input[name="${name}"]`) as HTMLInputElement
  },

  // Enhanced accessibility queries
  getByAriaLabel: (container: HTMLElement, label: string) => {
    return container.querySelector(`[aria-label="${label}"]`)
  },

  getByPlaceholder: (container: HTMLElement, placeholder: string) => {
    return container.querySelector(`[placeholder="${placeholder}"]`)
  },

  getByText: (container: HTMLElement, text: string) => {
    return Array.from(container.querySelectorAll('*')).find(
      el => el.textContent?.trim() === text
    )
  },
};

// Assertion helpers (enhanced for Vitest)
export const assertionHelpers = {
  // Assert element exists
  assertElementExists: (element: Element | null, selector: string) => {
    if (!element) {
      throw new Error(`Element not found: ${selector}`)
    }
    return element
  },

  // Assert element has class
  assertHasClass: (element: Element, className: string) => {
    expect(element).toHaveClass(className)
  },

  // Assert element has attribute
  assertHasAttribute: (element: Element, attribute: string, value?: string) => {
    if (value !== undefined) {
      expect(element).toHaveAttribute(attribute, value)
    } else {
      expect(element).toHaveAttribute(attribute)
    }
  },

  // Assert element is visible
  assertIsVisible: (element: HTMLElement) => {
    expect(element).toBeVisible()
  },

  // Assert element is hidden
  assertIsHidden: (element: HTMLElement) => {
    expect(element).not.toBeVisible()
  },

  // Assert form is valid
  assertFormIsValid: (form: HTMLFormElement) => {
    expect(form.checkValidity()).toBe(true)
  },

  // Assert form is invalid
  assertFormIsInvalid: (form: HTMLFormElement) => {
    expect(form.checkValidity()).toBe(false)
  },

  // Assert element has focus
  assertHasFocus: (element: HTMLElement) => {
    expect(element).toHaveFocus()
  },

  // Assert accessibility
  assertAccessibleName: (element: Element, name: string) => {
    const accessibleName = element.getAttribute('aria-label') || 
                          element.getAttribute('aria-labelledby') ||
                          element.textContent?.trim()
    expect(accessibleName).toContain(name)
  },
};

// Event simulation helpers (enhanced)
export const eventHelpers = {
  // Simulate click
  click: async (element: HTMLElement) => {
    element.focus()
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate double click
  doubleClick: async (element: HTMLElement) => {
    element.focus()
    element.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, cancelable: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate hover
  hover: async (element: HTMLElement) => {
    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate unhover
  unhover: async (element: HTMLElement) => {
    element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
    element.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate focus
  focus: async (element: HTMLElement) => {
    element.focus()
    element.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate blur
  blur: async (element: HTMLElement) => {
    element.blur()
    element.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate key press
  keyPress: async (element: HTMLElement, key: string, options?: KeyboardEventInit) => {
    element.focus()
    element.dispatchEvent(new KeyboardEvent('keydown', { key, ...options, bubbles: true }))
    element.dispatchEvent(new KeyboardEvent('keypress', { key, ...options, bubbles: true }))
    element.dispatchEvent(new KeyboardEvent('keyup', { key, ...options, bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate input change
  changeInput: async (input: HTMLInputElement, value: string) => {
    input.focus()
    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },

  // Simulate file upload
  uploadFile: async (input: HTMLInputElement, file: File) => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    input.files = dataTransfer.files
    input.dispatchEvent(new Event('change', { bubbles: true }))
    await testHelpers.waitForNextTick()
  },
};

// Store testing helpers (for Zustand)
export const storeHelpers = {
  // Reset store to initial state
  resetStore: (store: any) => {
    store.setState(store.getState().getInitialState?.() || {})
  },

  // Mock store state
  mockStoreState: (store: any, state: Record<string, any>) => {
    store.setState(state)
  },

  // Subscribe to store changes
  subscribeToStore: (store: any, callback: (state: any) => void) => {
    return store.subscribe(callback)
  },

  // Wait for store update
  waitForStoreUpdate: async (store: any, predicate: (state: any) => boolean) => {
    return new Promise<void>((resolve) => {
      const unsubscribe = store.subscribe((state: any) => {
        if (predicate(state)) {
          unsubscribe()
          resolve()
        }
      })
    })
  },
};

// Animation testing helpers (enhanced)
export const animationHelpers = {
  // Skip all animations
  skipAnimations: () => {
    const style = document.createElement('style')
    style.textContent = `
      *, *::before, *::after {
        animation-delay: -1ms !important;
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        background-attachment: initial !important;
        scroll-behavior: auto !important;
        transition-duration: 1ms !important;
        transition-delay: -1ms !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  },

  // Enable animations
  enableAnimations: () => {
    const existingStyles = document.head.querySelectorAll('style')
    existingStyles.forEach(style => {
      if (style.textContent?.includes('animation-delay')) {
        style.remove()
      }
    })
  },

  // Wait for animation to complete
  waitForAnimation: (element: HTMLElement, timeout = 1000) => {
    return new Promise<void>(resolve => {
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd)
        element.removeEventListener('transitionend', handleAnimationEnd)
        resolve()
      }

      element.addEventListener('animationend', handleAnimationEnd)
      element.addEventListener('transitionend', handleAnimationEnd)

      // Fallback timeout
      setTimeout(resolve, timeout)
    })
  },

  // Mock Framer Motion
  mockFramerMotion: () => {
    vi.doMock('framer-motion', () => ({
      motion: new Proxy({}, {
        get: () => 'div'
      }),
      AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
      useAnimation: () => ({
        start: vi.fn(),
        stop: vi.fn(),
        set: vi.fn(),
      }),
      useMotionValue: (initial: any) => ({ get: () => initial, set: vi.fn() }),
      useTransform: () => ({ get: () => 0, set: vi.fn() }),
      useSpring: () => ({ get: () => 0, set: vi.fn() }),
      useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
      useInView: () => true,
    }))
  },
};

// Cleanup helpers (enhanced)
export const cleanupHelpers = {
  // Clean up DOM
  cleanupDOM: () => {
    document.body.innerHTML = ''
    document.head.querySelectorAll('style').forEach(style => {
      if (style.textContent?.includes('animation-delay')) {
        style.remove()
      }
    })
  },

  // Clean up timers
  cleanupTimers: () => {
    vi.clearAllTimers()
    vi.useRealTimers()
  },

  // Clean up mocks
  cleanupMocks: () => {
    vi.restoreAllMocks()
    apiHelpers.resetFetchMock()
  },

  // Clean up stores
  cleanupStores: (...stores: any[]) => {
    stores.forEach(store => {
      if (store.getState && store.setState) {
        storeHelpers.resetStore(store)
      }
    })
  },

  // Full cleanup
  fullCleanup: (...stores: any[]) => {
    cleanupHelpers.cleanupDOM()
    cleanupHelpers.cleanupTimers()
    cleanupHelpers.cleanupMocks()
    cleanupHelpers.cleanupStores(...stores)
  },
}; 