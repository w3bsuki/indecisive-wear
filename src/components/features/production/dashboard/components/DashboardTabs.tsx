/**
 * Dashboard Tabs
 * 
 * Main tabs component containing all dashboard sections
 * Extracted from ProductionDashboard for better component organization
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VitalsTab } from './VitalsTab'
import { ErrorsTab } from './ErrorsTab'
import { PerformanceTab } from './PerformanceTab'
import { MonitoringTab } from './MonitoringTab'
import type { VitalsData } from '@/lib/types/stores'

interface DashboardTabsProps {
  vitalsData: VitalsData
  isLoading: boolean
}

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
        <VitalsTab vitalsData={vitalsData} isLoading={isLoading} />
      </TabsContent>

      <TabsContent value="errors" className="space-y-4">
        <ErrorsTab />
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <PerformanceTab />
      </TabsContent>

      <TabsContent value="monitoring" className="space-y-4">
        <MonitoringTab />
      </TabsContent>
    </Tabs>
  )
}