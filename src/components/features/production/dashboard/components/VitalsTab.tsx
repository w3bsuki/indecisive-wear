/**
 * Core Web Vitals Tab
 * 
 * Tab component for displaying Core Web Vitals metrics
 * Extracted from ProductionDashboard for better component organization
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RefreshCw } from 'lucide-react'
import { getRatingColor, getRatingIcon, formatMetricValue, type PerformanceMetric } from '../utils/dashboardUtils'
import type { VitalsData } from '@/lib/types/stores'

interface VitalsTabProps {
  vitalsData: VitalsData
  isLoading: boolean
}

export function VitalsTab({ vitalsData, isLoading }: VitalsTabProps) {
  // Core Web Vitals metrics
  const coreMetrics: PerformanceMetric[] = [
    {
      name: 'Largest Contentful Paint',
      value: vitalsData?.breakdown.LCP?.value || 0,
      unit: 'ms',
      rating: (vitalsData?.breakdown.LCP?.rating || 'good') as 'good' | 'needs-improvement' | 'poor',
      threshold: { good: 2500, poor: 4000 },
      description: 'Time until the largest content element is rendered'
    },
    {
      name: 'First Input Delay',
      value: vitalsData?.breakdown.FID?.value || 0,
      unit: 'ms',
      rating: (vitalsData?.breakdown.FID?.rating || 'good') as 'good' | 'needs-improvement' | 'poor',
      threshold: { good: 100, poor: 300 },
      description: 'Time until the page responds to first user interaction'
    },
    {
      name: 'Cumulative Layout Shift',
      value: vitalsData?.breakdown.CLS?.value || 0,
      unit: '',
      rating: (vitalsData?.breakdown.CLS?.rating || 'good') as 'good' | 'needs-improvement' | 'poor',
      threshold: { good: 0.1, poor: 0.25 },
      description: 'Visual stability of the page during loading'
    },
    {
      name: 'First Contentful Paint',
      value: vitalsData?.breakdown.FCP?.value || 0,
      unit: 'ms',
      rating: (vitalsData?.breakdown.FCP?.rating || 'good') as 'good' | 'needs-improvement' | 'poor',
      threshold: { good: 1800, poor: 3000 },
      description: 'Time until first content is painted'
    }
  ]

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Loading metrics...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {coreMetrics.map((metric) => {
        const RatingIcon = getRatingIcon(metric.rating)
        
        return (
          <Card key={metric.name}>
            <CardHeader>
              <CardTitle className="text-base">{metric.name}</CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {formatMetricValue(metric)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {metric.unit}
                    </span>
                  </div>
                  <Badge className={getRatingColor(metric.rating)}>
                    <RatingIcon className="h-4 w-4" />
                    <span className="ml-1 capitalize">{metric.rating}</span>
                  </Badge>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Good: &lt;{metric.threshold.good}{metric.unit}</div>
                  <div>Poor: &gt;{metric.threshold.poor}{metric.unit}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}