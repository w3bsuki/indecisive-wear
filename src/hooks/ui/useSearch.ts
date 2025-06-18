import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from './useDebounce'

interface SearchResult {
  products: {
    id: string
    name: string
    category: string
    price: number
    image?: string
  }[]
  categories: {
    name: string
    count: number
  }[]
  collections: {
    name: string
    count: number
  }[]
}

interface UseSearchProps {
  onClose?: () => void
}

export function useSearch({ onClose }: UseSearchProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult>({
    products: [],
    categories: [],
    collections: []
  })

  const debouncedQuery = useDebounce(query, 300)

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({
        products: [],
        categories: [],
        collections: []
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulated API response (replace with actual API call when backend is ready)
      const data = {
        products: [
          { id: '1', name: 'Classic Dad Hat', category: 'Hats', price: 29.99 },
          { id: '2', name: 'Vintage Snapback', category: 'Hats', price: 34.99 },
          { id: '3', name: 'Urban Beanie', category: 'Hats', price: 24.99 },
        ].filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        categories: [
          { name: 'All Hats', count: 45 },
          { name: 'Dad Hats', count: 12 },
          { name: 'Snapbacks', count: 18 },
          { name: 'Beanies', count: 15 },
        ].filter(c => 
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        collections: [
          { name: 'Summer Collection', count: 24 },
          { name: 'Winter Essentials', count: 18 },
          { name: 'Limited Edition', count: 8 },
        ].filter(c => 
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }

      setResults(data)
    } catch (error) {
      // Reset results on error and log in development
      setResults({ products: [], categories: [], collections: [] })
      if (process.env.NODE_ENV === 'development') {
        console.error('Search error:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    search(debouncedQuery)
  }, [debouncedQuery, search])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false)
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    isLoading,
    results
  }
} 