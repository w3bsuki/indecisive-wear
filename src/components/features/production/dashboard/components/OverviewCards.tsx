/**
 * Overview Cards
 * 
 * Overview metrics cards for the dashboard
 * Extracted from ProductionDashboard for better component organization
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Activity } from 'lucide-react'
import { AlertTriangle } from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import { Gauge } from 'lucide-react'
import { TrendingUp } from 'lucide-react'
import { Eye } from 'lucide-react'
import { getRatingColor, getRatingIcon, getOverallRating } from '../utils/dashboardUtils'
import type { ErrorSummary, VitalsData } from '@/lib/types/stores'

interface OverviewCardsProps {
  vitalsData: VitalsData
  errorSummary: ErrorSummary
}

export function OverviewCards({ vitalsData, errorSummary }: OverviewCardsProps) {
  const overallScore = vitalsData?.score || 0
  const overallRating = getOverallRating(overallScore)
  const RatingIcon = getRatingIcon(overallRating)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Overall Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Core Web Vitals Score</CardTitle>
          <Gauge className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallScore}/100</div>
          <div className="flex items-center space-x-2 mt-2">
            <Badge className={getRatingColor(overallRating)}>
              <RatingIcon className="h-4 w-4" />
              <span className="ml-1 capitalize">{overallRating}</span>
            </Badge>
          </div>
          <Progress value={overallScore} className="mt-2" />
        </CardContent>
      </Card>

      {/* Error Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0.02%</div>
          <p className="text-xs text-muted-foreground">
            {errorSummary.lastHour} errors in last hour
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary">
              {errorSummary.total} total
            </Badge>
            {errorSummary.critical > 0 && (
              <Badge variant="destructive">
                {errorSummary.critical} critical
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uptime */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">99.9%</div>
          <p className="text-xs text-muted-foreground">
            Last 30 days
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge className="text-green-600 bg-green-50 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Operational
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Traffic */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">
            +12% from yesterday
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary">
              <TrendingUp className="h-3 w-3 mr-1" />
              Growing
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}