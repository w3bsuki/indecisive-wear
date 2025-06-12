/**
 * Navigation State Management Hook
 * Tracks navigation history, breadcrumbs, and page transitions
 */

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useUIStore } from '@/stores'

interface NavigationState {
  currentPath: string
  previousPath: string | null
  history: string[]
  isNavigating: boolean
  direction: 'forward' | 'backward' | null
  scrollPositions: Map<string, number>
}

interface UseNavigationStateReturn extends NavigationState {
  // Actions
  saveScrollPosition: () => void
  restoreScrollPosition: (path?: string) => void
  clearHistory: () => void
  goBack: () => void
  // Computed
  canGoBack: boolean
  breadcrumbs: Array<{ label: string; href: string }>
}

const MAX_HISTORY_SIZE = 10

export function useNavigationState(): UseNavigationStateReturn {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const fullPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  
  const [state, setState] = useState<NavigationState>({
    currentPath: fullPath,
    previousPath: null,
    history: [fullPath],
    isNavigating: false,
    direction: null,
    scrollPositions: new Map(),
  })
  
  const isNavigatingRef = useRef(false)
  const setGlobalLoading = useUIStore(state => state.setGlobalLoading)
  
  // Track navigation changes
  useEffect(() => {
    if (fullPath !== state.currentPath) {
      // Determine navigation direction
      const currentIndex = state.history.indexOf(fullPath)
      const isBackward = currentIndex !== -1 && currentIndex < state.history.length - 1
      
      setState(prev => {
        const newHistory = isBackward
          ? prev.history.slice(0, currentIndex + 1)
          : [...prev.history.slice(-MAX_HISTORY_SIZE + 1), fullPath]
          
        return {
          ...prev,
          currentPath: fullPath,
          previousPath: prev.currentPath,
          history: newHistory,
          isNavigating: false,
          direction: isBackward ? 'backward' : 'forward',
        }
      })
      
      // Set loading state
      isNavigatingRef.current = true
      setGlobalLoading(true)
      
      // Reset loading state after navigation
      const timer = setTimeout(() => {
        isNavigatingRef.current = false
        setGlobalLoading(false)
        setState(prev => ({ ...prev, isNavigating: false }))
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [fullPath, state.currentPath, state.history, setGlobalLoading])
  
  // Save scroll position for current path
  const saveScrollPosition = useCallback(() => {
    const scrollY = window.scrollY
    setState(prev => {
      const newScrollPositions = new Map(prev.scrollPositions)
      newScrollPositions.set(prev.currentPath, scrollY)
      return { ...prev, scrollPositions: newScrollPositions }
    })
  }, [])
  
  // Restore scroll position for a path
  const restoreScrollPosition = useCallback((path?: string) => {
    const targetPath = path || state.currentPath
    const savedPosition = state.scrollPositions.get(targetPath)
    
    if (savedPosition !== undefined) {
      // Use requestAnimationFrame for smooth scroll restoration
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant' as ScrollBehavior,
        })
      })
    }
  }, [state.currentPath, state.scrollPositions])
  
  // Clear navigation history
  const clearHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      history: [prev.currentPath],
      previousPath: null,
      scrollPositions: new Map(),
    }))
  }, [])
  
  // Navigate back
  const goBack = useCallback(() => {
    if (state.history.length > 1) {
      // Save current scroll position
      saveScrollPosition()
      
      // Use browser back
      window.history.back()
    }
  }, [state.history, saveScrollPosition])
  
  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs(pathname)
  
  // Save scroll position before unmount
  useEffect(() => {
    const handleBeforeUnload = () => saveScrollPosition()
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [saveScrollPosition])
  
  // Restore scroll position after navigation
  useEffect(() => {
    if (!isNavigatingRef.current && state.direction === 'backward') {
      restoreScrollPosition()
    }
  }, [state.direction, restoreScrollPosition])
  
  return {
    ...state,
    saveScrollPosition,
    restoreScrollPosition,
    clearHistory,
    goBack,
    canGoBack: state.history.length > 1,
    breadcrumbs,
  }
}

// Generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): Array<{ label: string; href: string }> {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Array<{ label: string; href: string }> = []
  
  let currentPath = ''
  segments.forEach((segment) => {
    // Skip locale segments
    if (['en', 'bg', 'es', 'fr', 'de', 'it'].includes(segment)) {
      currentPath = `/${segment}`
      return
    }
    
    currentPath += `/${segment}`
    breadcrumbs.push({
      label: formatSegmentLabel(segment),
      href: currentPath,
    })
  })
  
  return breadcrumbs
}

// Format URL segment as readable label
function formatSegmentLabel(segment: string): string {
  // Handle special cases
  const specialLabels: Record<string, string> = {
    'shop': 'Shop',
    'products': 'Products',
    'collections': 'Collections',
    'about': 'About',
    'contact': 'Contact',
    'cart': 'Cart',
    'checkout': 'Checkout',
    'account': 'Account',
    'orders': 'Orders',
    'wishlist': 'Wishlist',
    'search': 'Search',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'returns': 'Returns',
  }
  
  const label = specialLabels[segment.toLowerCase()]
  if (label) return label
  
  // Format as title case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}