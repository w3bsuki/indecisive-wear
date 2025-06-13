/**
 * Medusa Products API Hooks
 * TanStack Query hooks for fetching products from Medusa backend
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { medusa } from '@/lib/medusa/client'
import type { StoreProduct } from '@medusajs/types'

// Types for product queries
export interface ProductListParams {
  q?: string
  limit?: number
  offset?: number
  category_id?: string[]
  collection_id?: string[]
  tags?: string[]
  order?: string
}

interface ProductFilters {
  category?: string
  priceRange?: [number, number]
  tags?: string[]
  colors?: string[]
  sizes?: string[]
  inStock?: boolean
  searchQuery?: string
}

// Query keys for cache management
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductListParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
}

/**
 * Hook to fetch a list of products
 */
export function useMedusaProducts(params: ProductListParams = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: async () => {
      const response = await medusa.store.product.list(params)
      return response
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to fetch a single product by ID
 */
export function useMedusaProduct(productId: string, enabled = true) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: async () => {
      const response = await medusa.store.product.retrieve(productId)
      return response
    },
    enabled: enabled && !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

/**
 * Hook for infinite scrolling product list
 */
export function useMedusaProductsInfinite(params: ProductListParams = {}) {
  const limit = params.limit || 20
  
  return useInfiniteQuery({
    queryKey: [...productKeys.lists(), 'infinite', params],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await medusa.store.product.list({
        ...params,
        limit,
        offset: pageParam * limit,
      })
      return response
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.products.length === limit
      return hasMore ? allPages.length : undefined
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Hook to search products with advanced filters
 */
export function useSearchMedusaProducts(filters: ProductFilters, enabled = true) {
  const params: ProductListParams = {
    q: filters.searchQuery,
    tags: filters.tags,
    limit: 50, // Get more results for filtering
  }
  
  return useQuery({
    queryKey: [...productKeys.lists(), 'search', filters],
    queryFn: async () => {
      const response = await medusa.store.product.list(params)
      
      // Apply client-side filters that Medusa doesn't support yet
      let filtered = response.products
      
      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
        filtered = filtered.filter(product => {
          const variant = product.variants?.[0]
          const price = variant?.calculated_price?.calculated_amount || 0
          const priceInDollars = price / 100
          return priceInDollars >= min && priceInDollars <= max
        })
      }
      
      // Category filter
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(product =>
          product.categories?.some(cat => 
            cat.name.toLowerCase() === filters.category?.toLowerCase()
          )
        )
      }
      
      // Stock filter
      if (filters.inStock) {
        filtered = filtered.filter(product =>
          product.variants?.some(variant => 
            variant.inventory_quantity > 0 || variant.allow_backorder
          )
        )
      }
      
      return {
        ...response,
        products: filtered,
        count: filtered.length
      }
    },
    enabled: enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000,
  })
}

/**
 * Hook to get product recommendations
 */
export function useMedusaProductRecommendations(productId?: string, limit = 4) {
  return useQuery({
    queryKey: [...productKeys.all, 'recommendations', productId, limit],
    queryFn: async () => {
      // For now, get random products as recommendations
      // In production, this could use a recommendation engine
      const response = await medusa.store.product.list({ limit: limit * 2 })
      
      // Filter out the current product and return random selection
      const available = (response.products as any[]).filter((p: any) => p.id !== productId)
      const shuffled = available.sort(() => 0.5 - Math.random())
      
      return {
        products: shuffled.slice(0, limit) as any,
        count: shuffled.length
      }
    },
    enabled: !!productId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}