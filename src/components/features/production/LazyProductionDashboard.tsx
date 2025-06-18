import { lazy, Suspense } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load the ProductionDashboard
const ProductionDashboard = lazy(() => import('./ProductionDashboard').then(mod => ({ default: mod.ProductionDashboard })))

// Loading placeholder that mimics the dashboard layout
const DashboardSkeleton = () => (
  <div className="container mx-auto p-6 space-y-6">
    {/* Header skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
    </div>

    {/* Overview cards skeleton */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-2 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Tabs skeleton */}
    <Card>
      <CardHeader>
        <div className="flex space-x-4 border-b">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <Skeleton className="h-64 w-full" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </CardContent>
    </Card>
  </div>
)

// Wrapper component that handles lazy loading
export default function LazyProductionDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ProductionDashboard />
    </Suspense>
  )
}