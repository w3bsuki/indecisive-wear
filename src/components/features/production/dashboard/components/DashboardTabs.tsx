/**
 * Dashboard Tabs
 * 
 * Main tabs component containing all dashboard sections with lazy loading
 * Extracted from ProductionDashboard for better component organization
 */

import { lazy, Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import type { VitalsData } from '@/lib/types/stores'

// Lazy load tab components for better performance
const VitalsTab = lazy(() => import('@/components/features/production/dashboard/components/VitalsTab').then(mod => ({ default: mod.VitalsTab })))
const ErrorsTab = lazy(() => import('@/components/features/production/dashboard/components/ErrorsTab').then(mod => ({ default: mod.ErrorsTab })))
const PerformanceTab = lazy(() => import('@/components/features/production/dashboard/components/PerformanceTab').then(mod => ({ default: mod.PerformanceTab })))
const MonitoringTab = lazy(() => import('@/components/features/production/dashboard/components/MonitoringTab').then(mod => ({ default: mod.MonitoringTab })))

interface DashboardTabsProps {
  vitalsData: VitalsData
  isLoading: boolean
}

// Loading skeleton for tab content
const TabSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
    <Skeleton className="h-64 w-full" />
  </div>
)

export function DashboardTabs({ vitalsData, isLoading }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="vitals" className="space-y-4">
      <TabsList>
        <TabsTrigger value="vitals">Core Web Vitals</TabsTrigger>
        <TabsTrigger value="errors">Error Tracking</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
      </TabsList>

      <TabsContent value="vitals" className="space-y-4">
        <Suspense fallback={<TabSkeleton />}>
          <VitalsTab vitalsData={vitalsData} isLoading={isLoading} />
        </Suspense>
      </TabsContent>

      <TabsContent value="errors" className="space-y-4">
        <Suspense fallback={<TabSkeleton />}>
          <ErrorsTab />
        </Suspense>
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <Suspense fallback={<TabSkeleton />}>
          <PerformanceTab />
        </Suspense>
      </TabsContent>

      <TabsContent value="monitoring" className="space-y-4">
        <Suspense fallback={<TabSkeleton />}>
          <MonitoringTab />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}