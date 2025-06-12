/**
 * Cart Store - E-commerce Cart Management
 * Manages cart items, quantities, totals, and persistence
 */

import { createStore, generateId } from '@/lib/stores/utils'
import type { CartState, CartItem } from '@/lib/types/stores'

const initialState: Omit<CartState, 'addItem' | 'removeItem' | 'updateQuantity' | 'clearCart' | 'calculateTotals'> = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  status: 'idle' as const,
}

export const useCartStore = createStore<CartState>(
  (set, get) => ({
    ...initialState,
    
    // Add item to cart
    addItem: (item: Omit<CartItem, 'id'>) => {
      set((state) => {
        // Check if item already exists (same product, size, color)
        const existingItemIndex = state.items.findIndex(
          cartItem =>
            cartItem.productId === item.productId &&
            cartItem.size === item.size &&
            cartItem.color === item.color
        )
        
        let updatedItems: CartItem[]
        
        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          updatedItems = state.items.map((cartItem, index) =>
            index === existingItemIndex
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        } else {
          // Add new item
          const newItem: CartItem = {
            id: generateId(),
            ...item,
          }
          updatedItems = [...state.items, newItem]
        }
        
        return {
          items: updatedItems,
          status: 'success' as const
        }
      })
      
      // Recalculate totals after adding
      get().calculateTotals()
    },
    
    // Remove item from cart
    removeItem: (itemId: string) => {
      set((state) => ({
        items: state.items.filter(item => item.id !== itemId),
        status: 'success' as const
      }))
      
      // Recalculate totals after removing
      get().calculateTotals()
    },
    
    // Update item quantity
    updateQuantity: (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        get().removeItem(itemId)
        return
      }
      
      set((state) => ({
        items: state.items.map(item =>
          item.id === itemId
            ? { ...item, quantity }
            : item
        ),
        status: 'success' as const
      }))
      
      // Recalculate totals after updating
      get().calculateTotals()
    },
    
    // Clear entire cart
    clearCart: () => {
      set(() => ({
        items: [],
        totalItems: 0,
        totalPrice: 0,
        status: 'idle' as const
      }))
    },
    
    // Calculate totals
    calculateTotals: () => {
      set((state) => {
        const totals = state.items.reduce(
          (acc, item) => {
            acc.totalItems += item.quantity
            acc.totalPrice += item.price * item.quantity
            return acc
          },
          { totalItems: 0, totalPrice: 0 }
        )
        
        return {
          totalItems: totals.totalItems,
          totalPrice: Math.round(totals.totalPrice * 100) / 100 // Round to 2 decimal places
        }
      })
    },
  }),
  {
    persist: true,
    persistKey: 'indecisive-wear-cart',
    devtools: true
  }
)

// Selectors for cart state
export const useCartItems = () => useCartStore(state => state.items)
export const useCartTotalItems = () => useCartStore(state => state.totalItems)
export const useCartTotalPrice = () => useCartStore(state => state.totalPrice)
export const useCartStatus = () => useCartStore(state => state.status)
export const useIsCartEmpty = () => useCartStore(state => state.items.length === 0)

// Computed selectors
export const useCartItemCount = () => useCartStore(state => 
  state.items.reduce((total, item) => total + item.quantity, 0)
)

export const useCartItemById = (itemId: string) => useCartStore(state =>
  state.items.find(item => item.id === itemId)
)

export const useIsInCart = (productId: string, size?: string, color?: string) => 
  useCartStore(state =>
    state.items.some(item =>
      item.productId === productId &&
      (!size || item.size === size) &&
      (!color || item.color === color)
    )
  )

// Formatted price selector
export const useFormattedCartTotal = () => useCartStore(state => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(state.totalPrice)
})

// Action selectors
export const useCartActions = () => useCartStore(state => ({
  addItem: state.addItem,
  removeItem: state.removeItem,
  updateQuantity: state.updateQuantity,
  clearCart: state.clearCart,
  calculateTotals: state.calculateTotals,
}))

// Batch operations
export const useCartBatchActions = () => {
  const store = useCartStore()
  
  return {
    // Add multiple items at once
    addMultipleItems: (items: Omit<CartItem, 'id'>[]) => {
      items.forEach(item => store.addItem(item))
    },
    
    // Remove multiple items at once
    removeMultipleItems: (itemIds: string[]) => {
      itemIds.forEach(id => store.removeItem(id))
    },
    
    // Update multiple quantities at once
    updateMultipleQuantities: (updates: { itemId: string; quantity: number }[]) => {
      updates.forEach(({ itemId, quantity }) => store.updateQuantity(itemId, quantity))
    },
  }
} 