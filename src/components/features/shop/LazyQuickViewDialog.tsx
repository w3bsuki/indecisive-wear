import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load the QuickViewDialog
const QuickViewDialog = lazy(() => import('./QuickViewDialog').then(mod => ({ default: mod.QuickViewDialog })))

// Loading placeholder
const QuickViewSkeleton = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-8 w-48" />
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="aspect-square rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
)

// Wrapper component that handles lazy loading
export const LazyQuickViewDialog = (props: any) => {
  return (
    <Suspense fallback={<QuickViewSkeleton />}>
      <QuickViewDialog {...props} />
    </Suspense>
  )
}