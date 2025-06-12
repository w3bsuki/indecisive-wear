/**
 * Performance Tab
 * 
 * Tab component for displaying performance metrics
 * Extracted from ProductionDashboard for better component organization
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Monitor } from 'lucide-react'
import { Smartphone } from 'lucide-react'
import { Zap } from 'lucide-react'
import { BarChart3 } from 'lucide-react'

export function PerformanceTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="h-4 w-4 mr-2" />
              Desktop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">Lighthouse Score</p>
            <Progress value={95} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Lighthouse Score</p>
            <Progress value={89} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Bundle Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120KB</div>
            <p className="text-xs text-muted-foreground">First Load JS</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            <BarChart3 className="h-8 w-8 mr-2" />
            Performance charts would be rendered here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}