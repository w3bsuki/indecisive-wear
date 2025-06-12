/**
 * User Store - User Authentication and Profile Management
 * Manages user state, authentication, and preferences with persistence
 */

import { createStore } from '@/lib/stores/utils'
import type { UserState, User, UserPreferences } from '@/lib/types/stores'

const initialState: Omit<UserState, 'setUser' | 'updateUser' | 'updatePreferences' | 'clearUser' | 'setStatus' | 'setError'> = {
  user: null,
  isAuthenticated: false,
  status: 'idle' as const,
  error: null,
}

const defaultPreferences: UserPreferences = {
  theme: 'system' as const,
  notifications: true,
  marketing: false,
}

export const useUserStore = createStore<UserState>(
  (set, _get) => ({
    ...initialState,
    
    // User Actions
    setUser: (user: User) => {
      set(() => ({
        user: {
          ...user,
          preferences: {
            ...defaultPreferences,
            ...user.preferences
          }
        },
        isAuthenticated: true,
        status: 'success' as const,
        error: null
      }))
    },
    
    updateUser: (updates: Partial<User>) => {
      set((state) => {
        if (!state.user) return {}
        
        return {
          user: {
            ...state.user,
            ...updates,
            preferences: {
              ...state.user.preferences,
              ...(updates.preferences || {})
            }
          }
        }
      })
    },
    
    updatePreferences: (preferences: Partial<UserPreferences>) => {
      set((state) => {
        if (!state.user) return {}
        
        return {
          user: {
            ...state.user,
            preferences: {
              ...state.user.preferences,
              ...preferences
            }
          }
        }
      })
    },
    
    clearUser: () => {
      set(() => ({
        user: null,
        isAuthenticated: false,
        status: 'idle' as const,
        error: null
      }))
    },
    
    setStatus: (status) => {
      set(() => ({
        status
      }))
    },
    
    setError: (error) => {
      set(() => ({
        error,
        status: error ? 'error' as const : 'idle' as const
      }))
    },
  }),
  {
    persist: true,
    persistKey: 'indecisive-wear-user',
    devtools: true
  }
)

// Selectors for user state
export const useUser = () => useUserStore(state => state.user)
export const useIsAuthenticated = () => useUserStore(state => state.isAuthenticated)
export const useUserStatus = () => useUserStore(state => state.status)
export const useUserError = () => useUserStore(state => state.error)
export const useUserPreferences = () => useUserStore(state => state.user?.preferences || defaultPreferences)
export const useUserTheme = () => useUserStore(state => state.user?.preferences.theme || 'system')

// Computed selectors
export const useUserFullName = () => useUserStore(state => {
  if (!state.user) return ''
  const { firstName, lastName } = state.user
  return [firstName, lastName].filter(Boolean).join(' ')
})

export const useUserInitials = () => useUserStore(state => {
  if (!state.user) return ''
  const { firstName, lastName } = state.user
  const first = firstName?.charAt(0).toUpperCase() || ''
  const last = lastName?.charAt(0).toUpperCase() || ''
  return first + last
})

// Action selectors
export const useUserActions = () => useUserStore(state => ({
  setUser: state.setUser,
  updateUser: state.updateUser,
  updatePreferences: state.updatePreferences,
  clearUser: state.clearUser,
  setStatus: state.setStatus,
  setError: state.setError,
})) 