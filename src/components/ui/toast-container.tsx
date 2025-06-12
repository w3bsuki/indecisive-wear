/**
 * Toast Container Component
 * Displays toast notifications from the UI store
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import { AlertCircle } from 'lucide-react'
import { AlertTriangle } from 'lucide-react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Toast } from '@/lib/types/stores'

const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.9 },
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const iconStyles = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
}

export function ToastContainer() {
  const [mounted, setMounted] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [removeToast, setRemoveToast] = useState<((id: string) => void) | null>(null)

  useEffect(() => {
    // Only run on client after hydration
    if (typeof window === 'undefined') return

    let unsubscribe: (() => void) | undefined

    const setupStores = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { useToasts, useUIActions } = await import('@/stores')
        
        // Get the store instances (not the hook results)
        const toastStore = useToasts
        const actionsStore = useUIActions
        
        // Get initial toasts and actions
        const initialToasts = toastStore()
        const { removeToast: removeToastAction } = actionsStore()
        
        // Ensure initialToasts is an array
        const toastsArray = Array.isArray(initialToasts) ? initialToasts : []
        setToasts(toastsArray)
        setRemoveToast(() => removeToastAction)
        setMounted(true)

        // Subscribe to toast changes using the store's subscribe method
        // We need to access the store instance's subscribe method
        const storeInstance = (toastStore as unknown as { 
          __store?: { subscribe: (callback: (state: { toasts: Toast[] }) => void) => () => void },
          getState?: { subscribe: (callback: (state: { toasts: Toast[] }) => void) => () => void }
        }).__store || (toastStore as unknown as { 
          __store?: { subscribe: (callback: (state: { toasts: Toast[] }) => void) => () => void },
          getState?: { subscribe: (callback: (state: { toasts: Toast[] }) => void) => () => void }
        }).getState
        
        if (storeInstance && typeof storeInstance.subscribe === 'function') {
          unsubscribe = storeInstance.subscribe((state: { toasts: Toast[] }) => {
            setToasts(state.toasts || [])
          })
        }
      } catch (error) {
        // Failed to setup stores
      }
    }

    setupStores()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  // Handle escape key to close all toasts
  useEffect(() => {
    if (!mounted || !removeToast) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toasts.forEach((toast: Toast) => removeToast(toast.id))
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mounted, toasts, removeToast])

  // Don't render anything during SSR or before stores are ready
  if (!mounted || toasts.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast: Toast) => {
          const Icon = toastIcons[toast.type as keyof typeof toastIcons]
          
          return (
            <motion.div
              key={toast.id}
              variants={toastVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                'flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm',
                toastStyles[toast.type as keyof typeof toastStyles]
              )}
              role="alert"
              aria-live="polite"
            >
              {/* Icon */}
              <Icon 
                className={cn('w-5 h-5 mt-0.5 flex-shrink-0', iconStyles[toast.type as keyof typeof iconStyles])} 
                aria-hidden="true"
              />
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">
                  {toast.title}
                </div>
                {toast.description && (
                  <div className="mt-1 text-sm opacity-90">
                    {toast.description}
                  </div>
                )}
              </div>
              
              {/* Close button */}
              <button
                onClick={() => removeToast && removeToast(toast.id)}
                className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Hook for programmatic toast creation
export function useToast() {
  const [mounted, setMounted] = useState(false)
  const [addToast, setAddToast] = useState<((toast: Omit<Toast, 'id'>) => void) | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const setupStores = async () => {
      try {
        const { useUIActions } = await import('@/stores')
        const { addToast: addToastAction } = useUIActions()
        setAddToast(() => addToastAction)
        setMounted(true)
      } catch (error) {
        // Failed to setup stores
      }
    }

    setupStores()
  }, [])

  if (!mounted || !addToast) {
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      warning: () => {},
      info: () => {},
    }
  }

  return {
    toast: addToast,
    success: (title: string, description?: string) => 
      addToast({ type: 'success', title, description }),
    error: (title: string, description?: string) => 
      addToast({ type: 'error', title, description }),
    warning: (title: string, description?: string) => 
      addToast({ type: 'warning', title, description }),
    info: (title: string, description?: string) => 
      addToast({ type: 'info', title, description }),
  }
} 