"use client"

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSimpleI18n } from '@/hooks'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}


export function Breadcrumbs({ items, className, showHome = true }: BreadcrumbsProps) {
  const pathname = usePathname()
  const { t, locale } = useSimpleI18n()
  
  // Generate breadcrumbs from pathname if not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname, locale, t)
  
  // Add home if requested and not already present
  const allItems = showHome && breadcrumbItems[0]?.href !== '/' 
    ? [{ label: t('home'), href: '/' }, ...breadcrumbItems]
    : breadcrumbItems
    
  if (allItems.length <= 1) return null
  
  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-1 text-sm",
        className
      )}
    >
      <ol 
        className="flex items-center space-x-1"
        role="list"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          
          return (
            <li 
              key={item.href}
              className="flex items-center"
            >
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 text-gray-400 mx-1 flex-shrink-0" 
                  aria-hidden="true"
                />
              )}
              
              {isLast ? (
                <span 
                  className={cn(
                    "font-medium text-gray-900",
                    "px-2 py-1 rounded-md",
                    "bg-pink-50/50"
                  )}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center",
                    "text-gray-600 hover:text-pink-600",
                    "px-2 py-1 rounded-md",
                    "hover:bg-pink-50/30",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                  )}
                >
                  {index === 0 && showHome && (
                    <Home className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  )}
                  <span className="group-hover:underline underline-offset-2">
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbsFromPath(
  pathname: string, 
  locale: string,
  t: (key: string, params?: Record<string, string>) => string
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  
  let currentPath = ''
  segments.forEach((segment, index) => {
    // Skip locale segment
    if (index === 0 && ['en', 'bg', 'es', 'fr', 'de', 'it'].includes(segment)) {
      currentPath = `/${segment}`
      return
    }
    
    currentPath += `/${segment}`
    const label = getSegmentLabel(segment, t)
    
    breadcrumbs.push({
      label,
      href: currentPath,
      current: index === segments.length - 1
    })
  })
  
  return breadcrumbs
}

// Map URL segments to readable labels
function getSegmentLabel(segment: string, t: (key: string) => string): string {
  const labelMap: Record<string, string> = {
    'shop': t('shop'),
    'products': t('shop'),
    'collections': t('shop'),
    'about': t('about'),
    'contact': t('contact'),
    'cart': t('cart.title'),
    'checkout': t('cart.checkout'),
    'account': t('footer.company'),
    'orders': t('footer.orderStatus'),
    'wishlist': t('shop'),
    'search': t('common:navigation.searchPlaceholder'),
    'privacy': t('footer.privacy'),
    'terms': t('footer.terms'),
    'returns': t('footer.returns'),
  }
  
  // Try to get translated label
  const label = labelMap[segment.toLowerCase()]
  if (label) return label
  
  // Format segment as title case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}