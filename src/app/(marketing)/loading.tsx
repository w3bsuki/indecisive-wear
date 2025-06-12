/**
 * Loading UI for marketing pages
 * Shows while pages are loading
 */
import { HeroSectionSkeleton, ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero section skeleton */}
      <section className="container mx-auto px-4 py-12">
        <HeroSectionSkeleton />
      </section>
      
      {/* Product section skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Section header skeleton */}
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          
          {/* Product grid skeleton */}
          <ProductGridSkeleton items={8} />
        </div>
      </section>
      
      {/* Coming soon section skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-56 mx-auto" />
          </div>
          
          {/* Carousel skeleton */}
          <div className="overflow-hidden">
            <div className="flex gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-64 sm:w-72 md:w-80">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                    <Skeleton className="w-16 h-16 mx-auto rounded-xl" />
                    <Skeleton className="h-8 w-24 mx-auto" />
                    <Skeleton className="h-6 w-32 mx-auto" />
                    <Skeleton className="h-10 w-24 mx-auto rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}