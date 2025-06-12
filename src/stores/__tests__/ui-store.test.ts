/**
 * UI Store Tests
 * Comprehensive testing for UI state management
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useUIStore, useUIActions } from '../ui-store'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('UI Store', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  describe('Navigation State', () => {
    it('initializes with mobile menu closed', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.isMobileMenuOpen).toBe(false)
    })

    it('toggles mobile menu state', () => {
      const { result: storeResult } = renderHook(() => useUIStore())
      const { result: actionsResult } = renderHook(() => useUIActions())

      act(() => {
        actionsResult.current.setMobileMenuOpen(true)
      })

      expect(storeResult.current.isMobileMenuOpen).toBe(true)

      act(() => {
        actionsResult.current.setMobileMenuOpen(false)
      })

      expect(storeResult.current.isMobileMenuOpen).toBe(false)
    })

    it('manages search dialog state', () => {
      const { result: storeResult } = renderHook(() => useUIStore())
      const { result: actionsResult } = renderHook(() => useUIActions())

      act(() => {
        actionsResult.current.setSearchOpen(true)
      })

      expect(storeResult.current.isSearchOpen).toBe(true)

      act(() => {
        actionsResult.current.setSearchOpen(false)
      })

      expect(storeResult.current.isSearchOpen).toBe(false)
    })
  })

  describe('Loading States', () => {
    it('manages global loading state', () => {
      const { result: storeResult } = renderHook(() => useUIStore())
      const { result: actionsResult } = renderHook(() => useUIActions())

      expect(storeResult.current.globalLoading).toBe(false)

      act(() => {
        actionsResult.current.setGlobalLoading(true)
      })

      expect(storeResult.current.globalLoading).toBe(true)
    })
  })

  describe('Modal and Dialog Management', () => {
    it('manages modal open/close state', () => {
      const { result: storeResult } = renderHook(() => useUIStore())
      const { result: actionsResult } = renderHook(() => useUIActions())

      act(() => {
        actionsResult.current.openModal('waitlist')
      })

      expect(storeResult.current.modals.waitlist).toBe(true)
      expect(storeResult.current.activeModal).toBe('waitlist')

      act(() => {
        actionsResult.current.closeModal('waitlist')
      })

      expect(storeResult.current.modals.waitlist).toBe(false)
      expect(storeResult.current.activeModal).toBe(null)
    })

    it('closes all modals', () => {
      const { result: storeResult } = renderHook(() => useUIStore())
      const { result: actionsResult } = renderHook(() => useUIActions())

      act(() => {
        actionsResult.current.openModal('waitlist')
        actionsResult.current.openModal('cart')
      })

      expect(storeResult.current.modals.waitlist).toBe(true)
      expect(storeResult.current.modals.cart).toBe(true)

      act(() => {
        actionsResult.current.closeAllModals()
      })

      expect(Object.values(storeResult.current.modals).every(isOpen => !isOpen)).toBe(true)
      expect(storeResult.current.activeModal).toBe(null)
    })
  })

  describe('Toast Notifications', () => {
    it('manages toast notifications', () => {
      const { result: storeResult } = renderHook(() => useUIStore())
      const { result: actionsResult } = renderHook(() => useUIActions())

      expect(storeResult.current.toasts).toHaveLength(0)

      const toast = {
        type: 'success' as const,
        title: 'Success',
        description: 'Operation completed successfully',
      }

      act(() => {
        actionsResult.current.addToast(toast)
      })

      expect(storeResult.current.toasts).toHaveLength(1)

      act(() => {
        actionsResult.current.clearToasts()
      })

      expect(storeResult.current.toasts).toHaveLength(0)
    })
  })

  // Test basic functionality that matches actual UIState interface
  describe('Integration', () => {
    it('handles multiple state changes', () => {
      const { result: storeResult } = renderHook(() => useUIStore())
      const { result: actionsResult } = renderHook(() => useUIActions())

      // Test multiple state changes work together
      act(() => {
        actionsResult.current.setMobileMenuOpen(true)
        actionsResult.current.setGlobalLoading(true)
        actionsResult.current.openModal('waitlist')
      })

      expect(storeResult.current.isMobileMenuOpen).toBe(true)
      expect(storeResult.current.globalLoading).toBe(true)
      expect(storeResult.current.modals.waitlist).toBe(true)
      expect(storeResult.current.activeModal).toBe('waitlist')
    })
  })
})