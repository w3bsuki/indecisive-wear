/**
 * Test Wrapper Component
 * Provides all necessary providers for testing
 * 
 * Phase 11: Developer Experience & Testing
 */

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'
import { vi } from 'vitest'
import type { UIState, UserState, CartState, WaitlistState, AppState } from '@/lib/types/stores'

// Mock Zustand stores
const mockUIStore = {
  showToast: vi.fn(),
  isNavigationOpen: false,
  toggleNavigation: vi.fn(),
  closeNavigation: vi.fn(),
  searchQuery: '',
  setSearchQuery: vi.fn(),
  isLoading: false,
  setLoading: vi.fn(),
  theme: 'light' as const,
  setTheme: vi.fn(),
}

const mockUserStore = {
  user: null,
  isAuthenticated: false,
  login: vi.fn(),
  logout: vi.fn(),
  updateProfile: vi.fn(),
}

const mockCartStore = {
  items: [],
  total: 0,
  itemCount: 0,
  addItem: vi.fn(),
  removeItem: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
}

const mockWaitlistStore = {
  entries: [],
  isLoading: false,
  addEntry: vi.fn(),
  removeEntry: vi.fn(),
}

const mockAppStore = {
  isOnline: true,
  lastUpdated: Date.now(),
  featureFlags: {},
  performance: {
    lcp: 0,
    fid: 0,
    cls: 0,
    inp: 0,
  },
}

// Mock store hooks
vi.mock('@/stores/ui-store', () => ({
  useUIStore: <T = UIState>(selector?: (state: UIState) => T): T | UIState => {
    if (selector) {
      return selector(mockUIStore as unknown as UIState)
    }
    return mockUIStore as unknown as UIState
  },
  useUIActions: () => ({
    showToast: mockUIStore.showToast,
    toggleNavigation: mockUIStore.toggleNavigation,
    closeNavigation: mockUIStore.closeNavigation,
    setSearchQuery: mockUIStore.setSearchQuery,
    setLoading: mockUIStore.setLoading,
    setTheme: mockUIStore.setTheme,
  }),
}))

vi.mock('@/stores/user-store', () => ({
  useUserStore: <T = UserState>(selector?: (state: UserState) => T): T | UserState => {
    if (selector) {
      return selector(mockUserStore as unknown as UserState)
    }
    return mockUserStore as unknown as UserState
  },
}))

vi.mock('@/stores/cart-store', () => ({
  useCartStore: <T = CartState>(selector?: (state: CartState) => T): T | CartState => {
    if (selector) {
      return selector(mockCartStore as unknown as CartState)
    }
    return mockCartStore as unknown as CartState
  },
}))

vi.mock('@/stores/waitlist-store', () => ({
  useWaitlistStore: <T = WaitlistState>(selector?: (state: WaitlistState) => T): T | WaitlistState => {
    if (selector) {
      return selector(mockWaitlistStore as unknown as WaitlistState)
    }
    return mockWaitlistStore as unknown as WaitlistState
  },
}))

vi.mock('@/stores/app-store', () => ({
  useAppStore: <T = AppState>(selector?: (state: AppState) => T): T | AppState => {
    if (selector) {
      return selector(mockAppStore as unknown as AppState)
    }
    return mockAppStore as unknown as AppState
  },
}))

// Create a new QueryClient for each test
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
        gcTime: 0, // Disable caching for tests
      },
      mutations: {
        retry: false,
      },
    },
  })
}

interface TestProviderProps {
  children: React.ReactNode
  queryClient?: QueryClient
}

/**
 * Test Provider that wraps components with all necessary providers
 */
export const TestProvider: React.FC<TestProviderProps> = ({ 
  children, 
  queryClient = createTestQueryClient() 
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Custom render function that wraps components with TestProvider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient, ...renderOptions } = options

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TestProvider queryClient={queryClient}>
      {children}
    </TestProvider>
  )

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient: queryClient || createTestQueryClient(),
  }
}

// Export everything from testing library but with our custom render
export * from '@testing-library/react'
export { renderWithProviders as render }

// Export the TestWrapper as an alias for TestProvider for backwards compatibility
export { TestProvider as TestWrapper } 