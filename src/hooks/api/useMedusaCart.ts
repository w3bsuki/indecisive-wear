/**
 * Medusa Cart API Hooks
 * TanStack Query hooks for cart management with Medusa backend
 */

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { medusa } from '@/lib/medusa/client'
import { useCartStore } from '@/stores/cart-store'
import { useUIActions } from '@/stores'

// Types for cart operations
interface AddToCartParams {
  variantId: string
  quantity: number
}

interface UpdateCartItemParams {
  lineId: string
  quantity: number
}

interface CartResponse {
  cart: {
    id: string
    items: CartItem[]
    total: number
    subtotal: number
    tax_total: number
    shipping_total: number
    region: {
      currency_code: string
    }
  }
}

interface CartItem {
  id: string
  variant_id: string
  quantity: number
  unit_price: number
  total: number
  variant?: {
    product?: {
      title: string
      thumbnail: string
    }
  }
}

// Query keys for cart cache management
export const cartKeys = {
  all: ['cart'] as const,
  details: () => [...cartKeys.all, 'detail'] as const,
  detail: (id: string) => [...cartKeys.details(), id] as const,
}

/**
 * Hook to get or create a cart
 */
export function useMedusaCart() {
  const queryClient = useQueryClient()
  const { addToast } = useUIActions()
  
  // Get cart ID from localStorage or Zustand store
  const getCartId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('medusa-cart-id') || ''
    }
    return ''
  }
  
  return useQuery({
    queryKey: cartKeys.detail(getCartId()),
    queryFn: async () => {
      let cartId = getCartId()
      
      // Fetch or create cart
      
      // If no cart ID, create a new cart
      if (!cartId) {
        const createResponse = await (medusa as any).store.cart.create()
        cartId = createResponse.cart.id
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('medusa-cart-id', cartId)
        }
        
        return createResponse
      }
      
      // Try to retrieve existing cart
      try {
        const response = await (medusa as any).store.cart.retrieve(cartId)
        return response
      } catch (error) {
        // If cart not found, create a new one
        // Cart not found, create new cart
        const createResponse = await (medusa as any).store.cart.create()
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('medusa-cart-id', createResponse.cart.id)
        }
        
        return createResponse
      }
    },
    staleTime: 0, // Always refetch cart data
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  })
}

/**
 * Hook to add item to cart
 */
export function useAddToCart() {
  const queryClient = useQueryClient()
  const { addToast } = useUIActions()
  const cartQuery = useMedusaCart()
  
  return useMutation({
    mutationFn: async (params: AddToCartParams) => {
      const cartId = cartQuery.data?.cart.id
      if (!cartId) {
        throw new Error('No cart available')
      }
      
      // Add item to cart - using type assertion due to SDK type limitations
      const response = await (medusa.store as any).cart.lineItems.create(cartId, {
        variant_id: params.variantId,
        quantity: params.quantity,
      })
      
      return response
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch cart
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
      
      // Show success toast
      addToast({
        type: 'success',
        title: 'Added to cart!',
        description: `${variables.quantity} item(s) added to your cart`,
      })
      
      // Sync with Zustand store for immediate UI updates
      const { addItem } = useCartStore.getState()
      const newItem = data.cart.items[data.cart.items.length - 1]
      addItem({
        productId: variables.variantId,
        name: 'Product', // Will be updated with real data
        price: newItem.unit_price / 100,
        quantity: variables.quantity,
        image: '',
        size: 'One Size',
        color: 'Pink',
      })
    },
    onError: (error) => {
      // Handle error in UI instead
      addToast({
        type: 'error',
        title: 'Failed to add to cart',
        description: 'Please try again',
      })
    },
  })
}

/**
 * Hook to update cart item quantity
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient()
  const { addToast } = useUIActions()
  const cartQuery = useMedusaCart()
  
  return useMutation({
    mutationFn: async (params: UpdateCartItemParams) => {
      const cartId = cartQuery.data?.cart.id
      if (!cartId) {
        throw new Error('No cart available')
      }
      
      const response = await (medusa as any).store.cart.lineItems.update(
        cartId,
        params.lineId,
        { quantity: params.quantity }
      )
      
      return response
    },
    onSuccess: () => {
      // Invalidate and refetch cart
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
    onError: (error) => {
      // Handle error in UI instead
      addToast({
        type: 'error',
        title: 'Failed to update cart',
        description: 'Please try again',
      })
    },
  })
}

/**
 * Hook to remove item from cart
 */
export function useRemoveFromCart() {
  const queryClient = useQueryClient()
  const { addToast } = useUIActions()
  const cartQuery = useMedusaCart()
  
  return useMutation({
    mutationFn: async (lineId: string) => {
      const cartId = cartQuery.data?.cart.id
      if (!cartId) {
        throw new Error('No cart available')
      }
      
      const response = await (medusa as any).store.cart.lineItems.delete(cartId, lineId)
      return response
    },
    onSuccess: () => {
      // Invalidate and refetch cart
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
      
      addToast({
        type: 'success',
        title: 'Removed from cart',
        description: 'Item removed successfully',
      })
    },
    onError: (error) => {
      // Handle error in UI instead
      addToast({
        type: 'error',
        title: 'Failed to remove item',
        description: 'Please try again',
      })
    },
  })
}

/**
 * Hook to clear entire cart
 */
export function useClearCart() {
  const queryClient = useQueryClient()
  const { addToast } = useUIActions()
  
  return useMutation({
    mutationFn: async () => {
      // Create a new cart (effectively clearing the old one)
      const response = await (medusa as any).store.cart.create()
      
      // Update localStorage with new cart ID
      if (typeof window !== 'undefined') {
        localStorage.setItem('medusa-cart-id', response.cart.id)
      }
      
      return response
    },
    onSuccess: () => {
      // Invalidate all cart queries
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
      
      // Clear Zustand store
      const { clearCart } = useCartStore.getState()
      clearCart()
      
      addToast({
        type: 'success',
        title: 'Cart cleared',
        description: 'All items removed from cart',
      })
    },
    onError: (error) => {
      // Handle error in UI instead
      addToast({
        type: 'error',
        title: 'Failed to clear cart',
        description: 'Please try again',
      })
    },
  })
}

/**
 * Hook to sync Medusa cart with Zustand store
 * This ensures the UI state matches the backend state
 */
export function useSyncCartWithStore() {
  const cartQuery = useMedusaCart()
  const { clearCart, addItem } = useCartStore.getState()
  
  // Sync whenever cart data changes
  React.useEffect(() => {
    if (cartQuery.data?.cart) {
      const cart = cartQuery.data.cart
      
      // Clear existing items in Zustand store
      clearCart()
      
      // Add each Medusa cart item to Zustand store
      cart.items.forEach(item => {
        addItem({
          productId: item.variant_id,
          name: item.variant?.product?.title || 'Product',
          price: item.unit_price / 100, // Convert from cents
          quantity: item.quantity,
          image: item.variant?.product?.thumbnail || '',
          size: 'One Size',
          color: 'Pink',
        })
      })
    }
  }, [cartQuery.data, clearCart, addItem])
  
  return cartQuery
}