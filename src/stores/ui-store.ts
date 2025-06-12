/**
 * UI Store - Global UI State Management
 * Fixed SSR implementation using Zustand v4 patterns
 */

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { UIState, Toast } from '@/lib/types/stores'

// Helper to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Initial state
const initialState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  activeModal: null,
  modals: {},
  globalLoading: false,
  toasts: [],
}

// Create store
const useUIStoreImpl = create<UIState>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    
    // Navigation Actions
    setMobileMenuOpen: (open: boolean) => {
      set({ isMobileMenuOpen: open })
    },
    
    setSearchOpen: (open: boolean) => {
      set((state) => ({
        isSearchOpen: open,
        isMobileMenuOpen: open ? false : state.isMobileMenuOpen
      }))
    },
    
    // Modal Actions
    openModal: (modalId: string) => {
      set((state) => ({
        activeModal: modalId,
        modals: {
          ...state.modals,
          [modalId]: true
        },
        isMobileMenuOpen: false
      }))
    },
    
    closeModal: (modalId: string) => {
      set((state) => ({
        activeModal: state.activeModal === modalId ? null : state.activeModal,
        modals: {
          ...state.modals,
          [modalId]: false
        }
      }))
    },
    
    closeAllModals: () => {
      set((state) => {
        const updatedModals: Record<string, boolean> = {}
        Object.keys(state.modals).forEach(modalId => {
          updatedModals[modalId] = false
        })
        
        return {
          activeModal: null,
          modals: updatedModals
        }
      })
    },
    
    // Loading Actions
    setGlobalLoading: (loading: boolean) => {
      set({ globalLoading: loading })
    },
    
    // Toast Actions
    addToast: (toast: Omit<Toast, 'id'>) => {
      const id = generateId()
      const newToast: Toast = {
        id,
        duration: 5000,
        ...toast,
      }
      
      set((state) => ({
        toasts: [...state.toasts, newToast]
      }))
      
      if (typeof window !== 'undefined' && newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          get().removeToast(id)
        }, newToast.duration)
      }
    },
    
    removeToast: (id: string) => {
      set((state) => ({
        toasts: state.toasts.filter(toast => toast.id !== id)
      }))
    },
    
    clearToasts: () => {
      set({ toasts: [] })
    },
  }))
)

// SSR-safe hook wrapper
export const useUIStore = ((selector) => {
  return useUIStoreImpl(selector)
}) as typeof useUIStoreImpl

// Actions hook with stable reference
let cachedActions: any = null

export const useUIActions = () => {
  // Cache actions to prevent recreation
  if (!cachedActions) {
    const state = useUIStoreImpl.getState()
    cachedActions = {
      setMobileMenuOpen: state.setMobileMenuOpen,
      setSearchOpen: state.setSearchOpen,
      openModal: state.openModal,
      closeModal: state.closeModal,
      closeAllModals: state.closeAllModals,
      setGlobalLoading: state.setGlobalLoading,
      addToast: state.addToast,
      removeToast: state.removeToast,
      clearToasts: state.clearToasts,
    }
  }
  return cachedActions
}

// Individual selectors
export const useIsMobileMenuOpen = () => useUIStore((state) => state.isMobileMenuOpen)
export const useIsSearchOpen = () => useUIStore((state) => state.isSearchOpen)
export const useActiveModal = () => useUIStore((state) => state.activeModal)
export const useIsModalOpen = (modalId: string) => useUIStore((state) => state.modals[modalId] || false)
export const useGlobalLoading = () => useUIStore((state) => state.globalLoading)
export const useToasts = () => useUIStore((state) => state.toasts)