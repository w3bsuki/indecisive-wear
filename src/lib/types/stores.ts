/**
 * Store Types for Zustand State Management
 * Defines all store interfaces and types for the application
 */

import { LoadingState } from '@/lib/types'

// User State Management
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
  preferences: UserPreferences
  socialHandles?: {
    instagram?: string
    tiktok?: string
  }
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  marketing: boolean
  stylePreference?: string
}

export interface UserState {
  user: User | null
  isAuthenticated: boolean
  status: LoadingState
  error: string | null
  
  // Actions
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  clearUser: () => void
  setStatus: (status: LoadingState) => void
  setError: (error: string | null) => void
}

// UI State Management
export interface UIState {
  // Navigation
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  
  // Modals and Dialogs
  activeModal: string | null
  modals: Record<string, boolean>
  
  // Loading states
  globalLoading: boolean
  
  // Toast notifications
  toasts: Toast[]
  
  // Actions
  setMobileMenuOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
  closeAllModals: () => void
  setGlobalLoading: (loading: boolean) => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export interface Toast {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// E-commerce State Management
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
  image?: string
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  status: LoadingState
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  calculateTotals: () => void
}

// Waitlist State Management
export interface WaitlistEntry {
  email: string
  firstName: string
  source: string
  stylePreference: string
  socialHandles: {
    instagram: string
    tiktok: string
  }
  marketingConsent: boolean
}

export interface WaitlistState {
  entries: WaitlistEntry[]
  status: LoadingState
  error: string | null
  submissionCount: number
  
  // Actions
  addEntry: (entry: WaitlistEntry) => Promise<void>
  setStatus: (status: LoadingState) => void
  setError: (error: string | null) => void
  incrementSubmissions: () => void
}

// App-wide State Management
export interface AppState {
  // App info
  version: string
  isOnline: boolean
  deviceType: 'mobile' | 'tablet' | 'desktop'
  
  // Feature flags
  features: FeatureFlags
  
  // Performance
  metrics: PerformanceMetrics
  
  // Actions
  setOnlineStatus: (online: boolean) => void
  setDeviceType: (type: 'mobile' | 'tablet' | 'desktop') => void
  updateFeatureFlags: (flags: Partial<FeatureFlags>) => void
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void
}

export interface FeatureFlags {
  enableSearch: boolean
  enableCart: boolean
  enableWaitlist: boolean
  enableSocialLogin: boolean
  enablePWA: boolean
  enableAnalytics: boolean
}

export interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  interactionToNextPaint: number
  score: number
}

// Monitoring State Management
export interface VitalsData {
  score: number
  breakdown: Record<string, { value: number; rating: string }>
}

export interface ErrorSummary {
  total: number
  lastHour: number
  critical: number
  resolved: number
}

export interface SystemHealth {
  apiEndpoints: 'healthy' | 'slow' | 'down'
  database: 'healthy' | 'slow' | 'down'
  cdn: 'healthy' | 'slow' | 'down'
  externalApis: 'healthy' | 'slow' | 'down'
  cpuUsage: number
  memoryUsage: number
  bandwidth: number
}

export interface MonitoringState {
  vitalsData: VitalsData
  errorSummary: ErrorSummary
  systemHealth: SystemHealth
  isLoading: boolean
  lastUpdated: Date
  autoRefreshInterval: NodeJS.Timeout | null
  status: LoadingState
  
  // Actions
  loadVitalsData: () => Promise<void>
  refreshData: () => void
  updateVitals: (vitals: Partial<VitalsData>) => void
  updateErrors: (errors: Partial<ErrorSummary>) => void
  updateSystemHealth: (health: Partial<SystemHealth>) => void
  startAutoRefresh: () => void
  stopAutoRefresh: () => void
}

// Store Creation Utilities
export interface StoreOptions {
  persist?: boolean
  persistKey?: string
  devtools?: boolean
  middleware?: Array<(config: unknown) => unknown>
}

// Store Selectors
export type UserSelector<T> = (state: UserState) => T
export type UISelector<T> = (state: UIState) => T
export type CartSelector<T> = (state: CartState) => T
export type WaitlistSelector<T> = (state: WaitlistState) => T
export type AppSelector<T> = (state: AppState) => T
export type MonitoringSelector<T> = (state: MonitoringState) => T 