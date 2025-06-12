import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../cart-store'

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useCartStore.setState({
      items: [],
      totalPrice: 0,
      totalItems: 0,
      status: 'idle'
    })
  })

  describe('addItem', () => {
    it('adds new item to cart', () => {
      const { addItem } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        image: '/test.jpg',
        quantity: 1
      })

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toMatchObject({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        image: '/test.jpg',
        quantity: 1
      })
      expect(state.items[0].id).toBeDefined()
      expect(state.totalPrice).toBe(29.99)
      expect(state.totalItems).toBe(1)
    })

    it('increments quantity when adding existing item', () => {
      const { addItem } = useCartStore.getState()
      
      // Add first item
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        quantity: 1
      })
      
      // Add same item again
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        quantity: 2
      })

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0]!.quantity).toBe(3)
      expect(state.totalPrice).toBe(89.97)
      expect(state.totalItems).toBe(3)
    })

    it('adds different items separately', () => {
      const { addItem } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product 1',
        price: 29.99,
        quantity: 1
      })
      
      addItem({
        productId: 'product-2',
        name: 'Test Product 2',
        price: 19.99,
        quantity: 2
      })

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(2)
      expect(state.totalPrice).toBe(69.97)
      expect(state.totalItems).toBe(3)
    })

    it('handles items with different sizes as separate items', () => {
      const { addItem } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        quantity: 1,
        size: 'M'
      })
      
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        quantity: 1,
        size: 'L'
      })

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(2)
      expect(state.totalPrice).toBe(59.98)
      expect(state.totalItems).toBe(2)
    })
  })

  describe('removeItem', () => {
    it('removes item from cart', () => {
      const { addItem, removeItem } = useCartStore.getState()
      
      // Add item first
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        quantity: 1
      })

      const itemId = useCartStore.getState().items[0]?.id
      expect(itemId).toBeDefined()
      
      // Remove the item
      if (itemId) {
        removeItem(itemId)
      }

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(0)
      expect(state.totalPrice).toBe(0)
      expect(state.totalItems).toBe(0)
    })

    it('only removes specified item', () => {
      const { addItem, removeItem } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product 1',
        price: 29.99,
        quantity: 1
      })
      
      addItem({
        productId: 'product-2',
        name: 'Test Product 2',
        price: 19.99,
        quantity: 1
      })

      const firstItemId = useCartStore.getState().items[0]?.id
      if (firstItemId) {
        removeItem(firstItemId)
      }

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(1)
      expect(state.items[0]?.productId).toBe('product-2')
      expect(state.totalPrice).toBe(19.99)
      expect(state.totalItems).toBe(1)
    })
  })

  describe('updateQuantity', () => {
    it('updates item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        quantity: 1
      })

      const itemId = useCartStore.getState().items[0]?.id
      if (itemId) {
        updateQuantity(itemId, 3)
      }

      const state = useCartStore.getState()
      expect(state.items[0]?.quantity).toBe(3)
      expect(state.totalPrice).toBe(89.97)
      expect(state.totalItems).toBe(3)
    })

    it('removes item when quantity is set to 0', () => {
      const { addItem, updateQuantity } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product',
        price: 29.99,
        quantity: 1
      })

      const itemId = useCartStore.getState().items[0]?.id
      if (itemId) {
        updateQuantity(itemId, 0)
      }

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(0)
      expect(state.totalPrice).toBe(0)
      expect(state.totalItems).toBe(0)
    })
  })

  describe('clearCart', () => {
    it('clears all items from cart', () => {
      const { addItem, clearCart } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product 1',
        price: 29.99,
        quantity: 1
      })
      
      addItem({
        productId: 'product-2',
        name: 'Test Product 2',
        price: 19.99,
        quantity: 2
      })

      clearCart()

      const state = useCartStore.getState()
      expect(state.items).toHaveLength(0)
      expect(state.totalPrice).toBe(0)
      expect(state.totalItems).toBe(0)
    })
  })

  describe('calculateTotals', () => {
    it('recalculates totals correctly', () => {
      const { addItem, calculateTotals } = useCartStore.getState()
      
      addItem({
        productId: 'product-1',
        name: 'Test Product 1',
        price: 29.99,
        quantity: 2
      })
      
      addItem({
        productId: 'product-2',
        name: 'Test Product 2',
        price: 19.99,
        quantity: 3
      })

      calculateTotals()

      const state = useCartStore.getState()
      expect(state.totalPrice).toBe(119.95)
      expect(state.totalItems).toBe(5)
    })
  })
})