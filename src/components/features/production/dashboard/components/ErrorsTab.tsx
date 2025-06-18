/**
 * Error Tracking Tab
 * 
 * Tab component for displaying error tracking information
 * Extracted from ProductionDashboard for better component organization
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle } from 'lucide-react'
import { AlertCircle } from 'lucide-react'

export function ErrorsTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
          <CardDescription>Last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                TypeError in /products/[id] - 2 occurrences
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Network timeout in API /api/waitlist - 1 occurrence
              </AlertDescription>
            </Alert>
            <div className="text-sm text-muted-foreground">
              ✅ No critical errors detected
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Analytics</CardTitle>
          <CardDescription>Performance impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Error Rate</span>
                <span>0.02%</span>
              </div>
              <Progress value={0.02} className="mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Resolution Rate</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Avg Resolution Time</span>
                <span>2.4h</span>
              </div>
              <Progress value={75} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}