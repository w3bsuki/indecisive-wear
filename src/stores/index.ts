/**
 * Store Index - Centralized State Management Exports
 * Main entry point for all Zustand stores and state management utilities
 */

// Store Types
export type * from '@/lib/types/stores'

// Store Utilities
export * from '@/lib/stores/utils'

// UI Store
export {
  useUIStore,
  useIsMobileMenuOpen,
  useIsSearchOpen,
  useActiveModal,
  useIsModalOpen,
  useGlobalLoading,
  useToasts,
  useUIActions
} from './ui-store'

// User Store
export {
  useUserStore,
  useUser,
  useIsAuthenticated,
  useUserStatus,
  useUserError,
  useUserPreferences,
  useUserTheme,
  useUserFullName,
  useUserInitials,
  useUserActions
} from './user-store'

// Cart Store
export {
  useCartStore,
  useCartItems,
  useCartTotalItems,
  useCartTotalPrice,
  useCartStatus,
  useIsCartEmpty,
  useCartItemCount,
  useCartItemById,
  useIsInCart,
  useFormattedCartTotal,
  useCartActions,
  useCartBatchActions
} from './cart-store'

// Waitlist Store
export {
  useWaitlistStore,
  useWaitlistEntries,
  useWaitlistStatus,
  useWaitlistError,
  useWaitlistSubmissionCount,
  useIsWaitlistLoading,
  useIsWaitlistSuccess,
  useIsWaitlistError,
  useHasJoinedWaitlist,
  useWaitlistAnalytics,
  useWaitlistActions,
  useWaitlistIntegration
} from './waitlist-store'

// App Store
export {
  useAppStore,
  useAppVersion,
  useIsOnline,
  useDeviceType,
  useFeatureFlags,
  usePerformanceMetrics,
  useIsSearchEnabled,
  useIsCartEnabled,
  useIsWaitlistEnabled,
  useIsSocialLoginEnabled,
  useIsPWAEnabled,
  useIsAnalyticsEnabled,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsMobileOrTablet,
  useIsGoodPerformance,
  useAppActions,
  useFeatureFlag,
  useConditionalRender
} from './app-store'

// Monitoring Store
export {
  useMonitoringStore,
  useVitalsData,
  useErrorSummary,
  useSystemHealth,
  useMonitoringStatus,
  useIsMonitoringLoading,
  useLastUpdated,
  useMonitoringActions
} from './monitoring-store'

// Store references for development debugging (only store functions, not hooks)
export const stores = {
  ui: () => import('./ui-store').then(m => m.useUIStore),
  user: () => import('./user-store').then(m => m.useUserStore),
  cart: () => import('./cart-store').then(m => m.useCartStore),
  waitlist: () => import('./waitlist-store').then(m => m.useWaitlistStore),
  app: () => import('./app-store').then(m => m.useAppStore),
}

// Development utilities (only in dev mode)
if (process.env.NODE_ENV === 'development') {
  // Expose stores to window for debugging
  if (typeof window !== 'undefined') {
    (window as typeof window & { storeDebug?: typeof stores }).storeDebug = stores
  }
}

// Combined store hooks for common patterns (custom hooks - must be called within React components)
export const useStoreActions = () => {
  // Import actions directly to avoid circular dependency issues
  const { useUIActions } = require('./ui-store')
  const { useUserActions } = require('./user-store')
  const { useCartActions } = require('./cart-store')
  const { useWaitlistActions } = require('./waitlist-store')
  const { useAppActions } = require('./app-store')
  const { useMonitoringActions } = require('./monitoring-store')
  
  const uiActions = useUIActions()
  const userActions = useUserActions() 
  const cartActions = useCartActions()
  const waitlistActions = useWaitlistActions()
  const appActions = useAppActions()
  const monitoringActions = useMonitoringActions()
  
  return {
    ui: uiActions,
    user: userActions,
    cart: cartActions,
    waitlist: waitlistActions,
    app: appActions,
    monitoring: monitoringActions,
  }
}

// Global state reset utility (custom hook - must be called within React components)
export const useResetAllStores = () => {
  // Import actions directly to avoid circular dependency issues
  const { useUserActions } = require('./user-store')
  const { useCartActions } = require('./cart-store')
  
  const userActions = useUserActions()
  const cartActions = useCartActions()
  
  return () => {
    userActions.clearUser()
    cartActions.clearCart()
    // Note: Waitlist, UI state and app state typically don't need full reset
    // They reset automatically or maintain state intentionally
  }
}

// Store status aggregator (custom hook - must be called within React components)  
export const useGlobalStoreStatus = () => {
  // Import status hooks directly to avoid circular dependency issues
  const { useUserStatus } = require('./user-store')
  const { useCartStatus } = require('./cart-store')
  const { useWaitlistStatus } = require('./waitlist-store')
  const { useGlobalLoading } = require('./ui-store')
  
  const userStatus = useUserStatus()
  const cartStatus = useCartStatus()
  const waitlistStatus = useWaitlistStatus()
  const globalLoading = useGlobalLoading()
  
  return {
    isLoading: globalLoading || [userStatus, cartStatus, waitlistStatus].includes('loading'),
    hasError: [userStatus, cartStatus, waitlistStatus].includes('error'),
    isSuccess: [userStatus, cartStatus, waitlistStatus].every(status => 
      status === 'success' || status === 'idle'
    ),
  }
} 