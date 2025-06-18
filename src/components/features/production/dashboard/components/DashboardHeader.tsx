/**
 * Dashboard Header
 * 
 * Header section with title, description, and refresh button
 * Extracted from ProductionDashboard for better component organization
 */

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw } from 'lucide-react'

interface DashboardHeaderProps {
  lastUpdated: Date
  onRefresh: () => void
}

export function DashboardHeader({ lastUpdated, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Production Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time performance monitoring and error tracking
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onRefresh} size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Badge variant="secondary">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </Badge>
      </div>
    </div>
  )
}