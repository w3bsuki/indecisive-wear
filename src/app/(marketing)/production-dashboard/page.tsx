import LazyProductionDashboard from '@/components/features/production/LazyProductionDashboard'
import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  ...pageMetadata.home(),
  title: 'Production Dashboard - Real-time Monitoring',
  description: 'Real-time performance monitoring, error tracking, and Core Web Vitals dashboard for Indecisive Wear.',
}

export default function ProductionDashboardPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <LazyProductionDashboard />
    </div>
  )
} 