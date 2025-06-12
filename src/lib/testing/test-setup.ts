/**
 * Test Setup Configuration
 * 
 * Global setup for Vitest testing environment
 */

import '@testing-library/jest-dom'
import { beforeAll, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'

// Global test setup
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  // Mock window.ResizeObserver
  class ResizeObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
  }
  
  global.ResizeObserver = ResizeObserverMock as any

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  }))

  // Mock window.requestIdleCallback
  global.requestIdleCallback = vi.fn((callback: IdleRequestCallback) => {
    return setTimeout(() => callback({
      didTimeout: false,
      timeRemaining: () => 50,
    }), 0) as unknown as number
  })

  global.cancelIdleCallback = vi.fn((id: number) => {
    clearTimeout(id)
  })

  // Mock window.scrollTo
  global.scrollTo = vi.fn()

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  }
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })

  // Mock sessionStorage  
  Object.defineProperty(window, 'sessionStorage', {
    value: { ...localStorageMock },
    writable: true,
  })

  // Mock fetch if not already available
  if (!global.fetch) {
    global.fetch = vi.fn()
  }

  // Mock console methods to reduce noise in tests
  global.console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }
})

// Clean up after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.resetAllMocks()
})

// Mock modules that cause issues in testing environment
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    return React.createElement('img', { src, alt, ...props })
  },
}))

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, prop) => {
      const MotionComponent = ({ children, ...props }: any) => {
        return React.createElement('div', props, children)
      }
      MotionComponent.displayName = `motion.${prop as string}`
      return MotionComponent
    },
  }),
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
}))

// Export test utilities
export const mockLocalStorage = window.localStorage
export const mockSessionStorage = window.sessionStorage
export const mockMatchMedia = window.matchMedia
export const mockResizeObserver = global.ResizeObserver
export const mockIntersectionObserver = global.IntersectionObserver