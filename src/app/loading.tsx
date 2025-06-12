/**
 * Root loading UI
 * Shows during route transitions
 */
import { NavigationSkeleton, Skeleton } from "@/components/ui/skeleton"

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation skeleton */}
      <NavigationSkeleton />
      
      {/* Main content skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page header skeleton */}
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}