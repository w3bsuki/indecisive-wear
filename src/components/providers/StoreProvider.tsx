/**
 * Store Provider Component
 * Provides a context for accessing stores only after hydration
 */

'use client'

import { createContext, useContext, ReactNode } from 'react'

interface StoreContextType {
  isStoreReady: boolean
  stores: any
}

const StoreContext = createContext<StoreContextType>({
  isStoreReady: false,
  stores: null,
})

interface StoreProviderProps {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  // For now, just return children directly
  // This can be enhanced later with actual store providers like Zustand
  return <>{children}</>
}

export function useStoreContext() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider')
  }
  return context
}

// Safe store hook that only works after hydration
export function useSafeStore<T>(storeHook: string): T | null {
  const { isStoreReady, stores } = useStoreContext()
  
  if (!isStoreReady || !stores || !stores[storeHook]) {
    return null
  }
  
  try {
    return stores[storeHook]()
  } catch (error) {
    // Failed to use store hook
    return null
  }
} 