"use client"

import { useEffect } from 'react'

export function CoreWebVitalsTracker() {
  useEffect(() => {
    // Simple web vitals tracking - can be enhanced later
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Core Web Vitals tracking initialized
    }
  }, [])

  return null
} 