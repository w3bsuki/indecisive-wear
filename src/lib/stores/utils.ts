/**
 * Store Utilities for Zustand
 * Provides consistent patterns for store creation with persistence and devtools
 */

import { create } from 'zustand'
import { persist, devtools, createJSONStorage, subscribeWithSelector } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
import type { StoreOptions } from '@/lib/types/stores'

// Global cache for server snapshots to ensure stable references
const serverSnapshotCache = new Map<string, unknown>()

/**
 * Creates a stable server snapshot for SSR
 */
function createStableServerSnapshot<T>(persistKey: string, storeFactory: (set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void, get: () => T) => T): T {
  // Return cached snapshot if it exists
  if (serverSnapshotCache.has(persistKey)) {
    return serverSnapshotCache.get(persistKey) as T
  }
  
  // Create a minimal initial state by calling the factory with no-op functions
  const noOpSet: (partial: Partial<T> | ((state: T) => Partial<T>)) => void = () => {}
  const noOpGet: () => T = () => ({} as T)
  
  try {
    const initialState = storeFactory(noOpSet, noOpGet)
    const serverState = {} as Partial<T>
    
    // Only include non-function properties
    for (const key in initialState) {
      if (Object.prototype.hasOwnProperty.call(initialState, key) && typeof initialState[key] !== 'function') {
        (serverState as any)[key] = initialState[key]
      }
    }
    
    // Cache the snapshot to ensure stable reference
    serverSnapshotCache.set(persistKey, serverState)
    return serverState as T
  } catch (error) {
    // Fallback to empty object if factory fails
    const fallback = {} as T
    serverSnapshotCache.set(persistKey, fallback)
    return fallback
  }
}

/**
 * Creates a Zustand store with standard middleware and proper SSR handling
 */
type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void
type GetState<T> = () => T

export function createStore<T>(
  storeFactory: (set: SetState<T>, get: GetState<T>) => T,
  options: StoreOptions = {}
) {
  const {
    persist: shouldPersist = false,
    persistKey = 'indecisive-wear-store',
    devtools: enableDevtools = process.env.NODE_ENV === 'development',
    middleware = []
  } = options

  // Always create the store the same way for consistency
  // SSR handling is done at the component level, not here

  // Client-side store creation with simplified typing
  let storeCreator: any = subscribeWithSelector<T>((set, get) => storeFactory(
    // Use functional updates to avoid mutation
    (updater: Partial<T> | ((state: T) => Partial<T>)) => {
      if (typeof updater === 'function') {
        set((state: T) => ({ ...state, ...updater(state) }))
      } else {
        set((state: T) => ({ ...state, ...updater }))
      }
    },
    get
  ))

  // Add persistence if requested (only on client)
  if (shouldPersist) {
    storeCreator = persist(
      storeCreator,
      {
        name: persistKey,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => {
          // Only persist non-function properties
          const stateObj = state as Record<string, unknown>
          const persistedState: Record<string, unknown> = {}
          
          for (const key in stateObj) {
            if (stateObj.hasOwnProperty(key) && typeof stateObj[key] !== 'function') {
              persistedState[key] = stateObj[key]
            }
          }
          
          return persistedState
        },
      }
    )
  }

  // Add devtools if requested (only in browser)
  if (enableDevtools) {
    storeCreator = devtools(
      storeCreator,
      { 
        name: persistKey.replace('indecisive-wear-', ''),
        enabled: true
      }
    )
  }

  // Create the store
  const store = create<T>()(storeCreator)

  // Handle SSR hydration for persisted stores
  if (shouldPersist) {
    // Delay rehydration to avoid SSR mismatch
    Promise.resolve().then(() => {
      if ('persist' in store && (store as any).persist?.rehydrate) {
        (store as any).persist.rehydrate()
      }
    })
  }

  return store
}

/**
 * Creates a selector hook for better TypeScript inference
 */
export function createSelector<T>() {
  return <U>(selector: (state: T) => U) => selector
}

/**
 * Utility to create typed store actions
 */
export function createActions<T>(actions: T): T {
  return actions
}

/**
 * Debounce utility for store actions
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Generate unique IDs for store items
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Store reset utility
 */
export function createResetAction<T>(initialState: T) {
  return (set: (state: T) => void) => {
    set(initialState)
  }
} 