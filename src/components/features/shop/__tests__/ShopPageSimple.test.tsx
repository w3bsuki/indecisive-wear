/**
 * ShopPageSimple Component Tests
 * Comprehensive testing for the main shop page component
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { ShopPageSimple } from '../ShopPageSimple'
import { TestWrapper } from '@/lib/testing'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock the hooks
vi.mock('@/hooks/useSimpleI18n', () => ({
  useSimpleI18n: () => ({
    t: (key: string, variables?: Record<string, any>) => {
      const translations: Record<string, string> = {
        'shop.title': 'Shop',
        'shop.description': 'Browse our collection',
        'shop.filters': 'Filters',
        'shop.sortBy': 'Sort by',
        'shop.noProducts': 'No products found',
        'shop.showingResults': 'Showing {count} results',
      }
      let translation = translations[key] || key
      
      if (variables && translation.includes('{')) {
        Object.entries(variables).forEach(([varKey, value]) => {
          translation = translation.replace(`{${varKey}}`, String(value))
        })
      }
      
      return translation
    },
    formatPrice: (price: number) => `$${price}`,
  }),
}))

// Mock the product data module first (hoisted)
vi.mock('@/lib/constants/product-data', () => ({
  hatsList: [
    {
      id: 1,
      name: 'Test Hat 1',
      price: 25,
      image: '/test-image-1.jpg',
      category: 'hats',
      color: 'black',
      size: 'M',
      isNew: true,
      isBestSeller: false,
      slogan: 'Test slogan 1',
    },
    {
      id: 2,
      name: 'Test Hat 2',
      price: 30,
      image: '/test-image-2.jpg',
      category: 'hats',
      color: 'pink',
      size: 'L',
      isNew: false,
      isBestSeller: true,
      slogan: 'Test slogan 2',
    },
  ],
}))

// Mock intersection observer for lazy loading
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('ShopPageSimple', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset viewport to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('renders shop page with products', () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    expect(screen.getByText('Test Hat 1')).toBeInTheDocument()
    expect(screen.getByText('Test Hat 2')).toBeInTheDocument()
    expect(screen.getByText('Showing 2 results')).toBeInTheDocument()
  })

  it('displays filters button on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })

    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  it('allows searching products', async () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    fireEvent.change(searchInput, { target: { value: 'Test Hat 1' } })

    await waitFor(() => {
      expect(screen.getByText('Test Hat 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Hat 2')).not.toBeInTheDocument()
    })
  })

  it('filters products by category', async () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    // Find and click the category filter
    const categoryFilter = screen.getByLabelText(/category/i)
    fireEvent.change(categoryFilter, { target: { value: 'hats' } })

    await waitFor(() => {
      expect(screen.getByText('Test Hat 1')).toBeInTheDocument()
      expect(screen.getByText('Test Hat 2')).toBeInTheDocument()
    })
  })

  it('sorts products by price', async () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    const sortSelect = screen.getByLabelText(/sort by/i)
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } })

    await waitFor(() => {
      const products = screen.getAllByTestId(/product-card/i)
      expect(products).toHaveLength(2)
      // Test Hat 1 ($25) should come before Test Hat 2 ($30)
      expect(products[0]).toHaveTextContent('Test Hat 1')
      expect(products[1]).toHaveTextContent('Test Hat 2')
    })
  })

  it('shows empty state when no products match filters', async () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    fireEvent.change(searchInput, { target: { value: 'nonexistent product' } })

    await waitFor(() => {
      expect(screen.getByText(/no products found/i)).toBeInTheDocument()
    })
  })

  it('handles price range filtering', async () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    // Simulate price range change
    const priceRangeMin = screen.getByLabelText(/minimum price/i)
    const priceRangeMax = screen.getByLabelText(/maximum price/i)

    fireEvent.change(priceRangeMin, { target: { value: '25' } })
    fireEvent.change(priceRangeMax, { target: { value: '28' } })

    await waitFor(() => {
      expect(screen.getByText('Test Hat 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Hat 2')).not.toBeInTheDocument()
    })
  })

  it('toggles between grid layouts', () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    const gridToggle = screen.getByLabelText(/grid layout/i)
    fireEvent.click(gridToggle)

    // Should update the grid layout class
    const productGrid = screen.getByTestId('product-grid')
    expect(productGrid).toHaveClass(/grid-cols-3/i)
  })

  it('handles mobile filter drawer', async () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })

    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    const filtersButton = screen.getByText('Filters')
    fireEvent.click(filtersButton)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('maintains filter state across interactions', async () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    // Apply search filter
    const searchInput = screen.getByPlaceholderText(/search/i)
    fireEvent.change(searchInput, { target: { value: 'Hat' } })

    // Apply sort
    const sortSelect = screen.getByLabelText(/sort by/i)
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } })

    await waitFor(() => {
      // Both filters should be applied
      expect(screen.getByText('Test Hat 2')).toBeInTheDocument()
      expect(screen.getByText('Test Hat 1')).toBeInTheDocument()
      
      // Products should be sorted by price descending (Hat 2 first)
      const products = screen.getAllByTestId(/product-card/i)
      expect(products[0]).toHaveTextContent('Test Hat 2')
      expect(products[1]).toHaveTextContent('Test Hat 1')
    })
  })

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    // Check for proper ARIA labels
    expect(screen.getByLabelText(/search products/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('displays loading state during async operations', async () => {
    render(
      <TestWrapper>
        <ShopPageSimple />
      </TestWrapper>
    )

    // Trigger search
    const searchInput = screen.getByPlaceholderText(/search/i)
    fireEvent.change(searchInput, { target: { value: 'searching...' } })

    // Should show loading state briefly
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })
})