/**
 * Lazy Loading Utilities
 * 
 * Provides utilities for dynamic imports and component lazy loading
 */

import React, { lazy, ComponentType, LazyExoticComponent } from 'react';

// Lazy loading with error boundaries
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ComponentType
): LazyExoticComponent<T> {
  const LazyComponent = lazy(async () => {
    try {
      const module = await importFunc();
      return module;
    } catch (error) {
      // Failed to load component
      
      // Return fallback component if provided
      if (fallback) {
        return { default: fallback };
      }
      
      // Return minimal error component
      return {
        default: (() => (
          <div className="p-4 text-center text-red-500">
            Failed to load component. Please refresh the page.
          </div>
        )) as unknown as T
      };
    }
  });

  return LazyComponent as LazyExoticComponent<T>;
}

// Pre-load component when hovering/focusing
export function preloadComponent(
  importFunc: () => Promise<any>
): () => void {
  let preloadPromise: Promise<any> | null = null;
  
  return () => {
    if (!preloadPromise) {
      preloadPromise = importFunc().catch((error) => {
        // Failed to preload component
        preloadPromise = null; // Reset so it can be retried
      });
    }
  };
}

// Route-based code splitting helpers
export const LazyComponents = {
  // Heavy components that should be loaded on demand
  ProductGrid: createLazyComponent(
    () => import('@/components/features/shop/ProductGrid').then(mod => ({ default: mod.ProductGrid })),
    () => <div className="animate-pulse bg-gray-200 h-64 rounded" />
  ),
  
  WaitlistOverlay: createLazyComponent(
    () => import('@/components/features/waitlist/WaitlistOverlay').then(mod => ({ default: mod.WaitlistOverlay })),
    () => <div className="animate-pulse bg-gray-200 h-32 rounded" />
  ),

  // Admin or infrequently used components
  // AdminPanel: createLazyComponent(
  //   () => import('@/components/admin/AdminPanel').catch(() => 
  //     import('@/components/fallback/NotAvailable')
  //   )
  // ),
};

// Preload functions for important components
export const preloaders = {
  productGrid: preloadComponent(() => import('@/components/features/shop/ProductGrid').then(mod => ({ default: mod.ProductGrid }))),
  waitlistOverlay: preloadComponent(() => import('@/components/features/waitlist/WaitlistOverlay').then(mod => ({ default: mod.WaitlistOverlay }))),
};

// Intersection Observer for lazy loading images/components
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Hook for lazy loading components based on visibility
export function useLazyVisible(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer?.disconnect();
        }
      },
      options
    );

    if (observer) {
      observer.observe(element);
      return () => observer.disconnect();
    }
    
    return undefined;
  }, [ref, options]);

  return isVisible;
} 