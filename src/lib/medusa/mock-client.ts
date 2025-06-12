/**
 * Mock Medusa Client for Development
 * Simulates Medusa API responses using static data
 * This allows frontend development without backend dependency
 */

import { hatsList } from "@/lib/constants/product-data"

// Transform static data to Medusa-like format
const transformToMedusaProducts = () => {
  console.log('🎭 Mock client: transforming', hatsList.length, 'products')
  return hatsList.map((hat, index) => ({
    id: `prod_${hat.id}`,
    title: hat.name,
    handle: hat.name.toLowerCase().replace(/\s+/g, '-'),
    description: hat.slogan || `Stylish ${hat.name} perfect for any occasion`,
    status: 'published',
    thumbnail: hat.image,
    images: [{ url: hat.image, id: `img_${hat.id}` }],
    options: [
      {
        id: `opt_${hat.id}_size`,
        title: 'Size',
        values: ['One Size']
      },
      {
        id: `opt_${hat.id}_color`,
        title: 'Color',
        values: [hat.color]
      }
    ],
    variants: [
      {
        id: `variant_${hat.id}`,
        title: `${hat.name} - ${hat.color}`,
        sku: `HAT-${hat.id}`,
        inventory_quantity: 100,
        allow_backorder: false,
        calculated_price: {
          original_amount: 1700,
          calculated_amount: 1700,
          currency_code: 'usd'
        },
        original_price: 1700,
        calculated_price_type: 'sale',
        options: [
          { option_id: `opt_${hat.id}_size`, value: 'One Size' },
          { option_id: `opt_${hat.id}_color`, value: hat.color }
        ]
      }
    ],
    tags: hat.isNew ? [{ value: 'new' }] : [],
    categories: [{ name: 'Hats' }],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}

// Mock cart state
let mockCart = {
  id: 'cart_mock_123',
  items: [] as any[],
  region: {
    id: 'reg_01',
    currency_code: 'usd',
    name: 'US'
  },
  total: 0,
  subtotal: 0,
  tax_total: 0,
  shipping_total: 0,
}

// Mock Medusa client that mimics real API
export const mockMedusaClient = {
  store: {
    product: {
      list: async (params?: any) => {
        console.log('🎭 Mock client: product.list called with params:', params)
        const products = transformToMedusaProducts()
        console.log('🎭 Mock client: transformed products count:', products.length)
        
        // Apply basic filtering
        let filtered = products
        if (params?.q) {
          filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(params.q.toLowerCase())
          )
        }
        
        const result = {
          products: filtered,
          count: filtered.length,
          offset: params?.offset || 0,
          limit: params?.limit || 20
        }
        console.log('🎭 Mock client: returning result:', result)
        return result
      },
      
      retrieve: async (id: string) => {
        const products = transformToMedusaProducts()
        const product = products.find(p => p.id === id)
        if (!product) throw new Error('Product not found')
        return { product }
      }
    },
    
    cart: {
      create: async (body = {}, query = {}, headers = {}) => {
        return { cart: mockCart }
      },
      
      retrieve: async (id: string, query = {}, headers = {}) => {
        return { cart: mockCart }
      },
      
      lineItems: {
        create: async (cartId: string, body: any, query = {}, headers = {}) => {
          const newItem = {
            id: `item_${Date.now()}`,
            variant_id: body.variant_id,
            quantity: body.quantity,
            unit_price: 1700,
            total: 1700 * body.quantity,
            ...body
          }
          mockCart.items.push(newItem)
          mockCart.total = mockCart.items.reduce((sum, item) => sum + item.total, 0)
          mockCart.subtotal = mockCart.total
          
          return { cart: mockCart }
        },
        
        update: async (cartId: string, itemId: string, body: any, query = {}, headers = {}) => {
          const item = mockCart.items.find(i => i.id === itemId)
          if (item) {
            item.quantity = body.quantity
            item.total = item.unit_price * item.quantity
            mockCart.total = mockCart.items.reduce((sum, item) => sum + item.total, 0)
            mockCart.subtotal = mockCart.total
          }
          return { cart: mockCart }
        },
        
        delete: async (cartId: string, itemId: string, headers = {}) => {
          mockCart.items = mockCart.items.filter(i => i.id !== itemId)
          mockCart.total = mockCart.items.reduce((sum, item) => sum + item.total, 0)
          mockCart.subtotal = mockCart.total
          return { cart: mockCart }
        }
      }
    },
    
    customer: {
      create: async (data: any) => {
        return {
          customer: {
            id: `cust_${Date.now()}`,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            created_at: new Date().toISOString()
          }
        }
      }
    }
  }
}

// Use mock in development, real client in production
const USE_MOCK = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_MEDUSA_URL?.includes('prod')

export const medusaClient = USE_MOCK ? mockMedusaClient : null // Will use real client when available