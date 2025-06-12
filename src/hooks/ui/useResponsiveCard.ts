"use client"

import { useState, useEffect } from "react"

/**
 * Hook to determine if mobile-optimized cards should be used
 * Based on screen size and device capabilities
 */
export function useResponsiveCard() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      // Mobile breakpoint: < 768px (md breakpoint in Tailwind)
      const isMobileScreen = window.innerWidth < 768
      
      // Additional mobile detection based on user agent (optional)
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      
      // Use mobile cards if either condition is true
      setIsMobile(isMobileScreen || isMobileDevice)
      setIsLoaded(true)
    }

    // Initial check
    checkDevice()

    // Listen for resize events
    window.addEventListener('resize', checkDevice)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return {
    isMobile,
    isLoaded, // Prevents hydration mismatch
    isDesktop: !isMobile && isLoaded
  }
}

/**
 * Alternative hook for more granular responsive control
 */
export function useResponsiveBreakpoints() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      
      if (width < 768) {
        setBreakpoint('mobile')
      } else if (width < 1024) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
      
      setIsLoaded(true)
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  return {
    breakpoint,
    isLoaded,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop'
  }
}