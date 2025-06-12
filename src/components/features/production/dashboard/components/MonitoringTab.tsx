/**
 * Monitoring Tab
 * 
 * Tab component for displaying system monitoring information
 * Extracted from ProductionDashboard for better component organization
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle } from 'lucide-react'
import { Clock } from 'lucide-react'

export function MonitoringTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Health Checks</CardTitle>
          <CardDescription>System status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>API Endpoints</span>
              <Badge className="text-green-600 bg-green-50 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Database</span>
              <Badge className="text-green-600 bg-green-50 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>CDN</span>
              <Badge className="text-green-600 bg-green-50 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>External APIs</span>
              <Badge className="text-yellow-600 bg-yellow-50 border-yellow-200">
                <Clock className="h-3 w-3 mr-1" />
                Slow
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Infrastructure</CardTitle>
          <CardDescription>Resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Bandwidth</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}