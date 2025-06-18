/**
 * Production Dashboard - Refactored
 * 
 * This component has been refactored from a 517-line monolithic component
 * into a clean, modular system with clear separation of concerns.
 * 
 * Original structure: Everything in one file
 * Refactored structure:
 * - useDashboardData.ts - Data management and API calls
 * - dashboardUtils.ts - Helper functions and utilities
 * - DashboardHeader.tsx - Header section
 * - OverviewCards.tsx - Metrics overview cards
 * - DashboardTabs.tsx - Main tabs container
 * - VitalsTab.tsx - Core Web Vitals section
 * - ErrorsTab.tsx - Error tracking section
 * - PerformanceTab.tsx - Performance metrics section
 * - MonitoringTab.tsx - System monitoring section
 * 
 * Benefits:
 * - Better separation of concerns
 * - Easier to maintain and test
 * - Improved code reusability
 * - Better developer experience
 */

'use client'

import { DashboardHeader } from './dashboard/components/DashboardHeader'
import { OverviewCards } from './dashboard/components/OverviewCards'
import { DashboardTabs } from './dashboard/components/DashboardTabs'
import { useVitalsData, useErrorSummary, useIsMonitoringLoading, useLastUpdated, useMonitoringActions } from '@/stores'

export function ProductionDashboard() {
  const vitalsData = useVitalsData()
  const errorSummary = useErrorSummary()
  const isLoading = useIsMonitoringLoading()
  const lastUpdated = useLastUpdated()
  const { refreshData } = useMonitoringActions()

  return (
    <div className="space-y-6">
      <DashboardHeader lastUpdated={lastUpdated} onRefresh={refreshData} />
      
      <OverviewCards vitalsData={vitalsData} errorSummary={errorSummary} />
      
      <DashboardTabs vitalsData={vitalsData} isLoading={isLoading} />
    </div>
  )
}