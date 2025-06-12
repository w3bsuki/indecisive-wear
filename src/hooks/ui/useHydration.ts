/**
 * Hydration Hook
 * Safely checks if the component has hydrated on the client
 */

import { useEffect, useState } from 'react'

/**
 * Hook to check if the component has hydrated
 * Returns true only after the component has mounted on the client
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // This will only run on the client after hydration
    setIsHydrated(true)
  }, [])

  return isHydrated
}

/**
 * Hook to safely access stores only after hydration
 * Prevents SSR issues with Zustand stores
 */
export function useSafeStore<T>(
  storeHook: () => T,
  fallback: T
): T {
  const isHydrated = useHydration()
  
  if (!isHydrated) {
    return fallback
  }
  
  try {
    return storeHook()
  } catch (error) {
    // Store access failed, returning fallback
    return fallback
  }
} 