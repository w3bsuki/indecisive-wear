/**
 * Dashboard Utilities
 * 
 * Helper functions for dashboard ratings, colors, and calculations
 * Extracted from ProductionDashboard for better organization
 */

import { CheckCircle } from 'lucide-react'
import { AlertTriangle } from 'lucide-react'
import { AlertCircle } from 'lucide-react'
import { Monitor } from 'lucide-react'

export interface PerformanceMetric {
  name: string
  value: number
  unit: string
  rating: 'good' | 'needs-improvement' | 'poor'
  threshold: { good: number; poor: number }
  description: string
}

export const getRatingColor = (rating: string) => {
  switch (rating) {
    case 'good': return 'text-green-600 bg-green-50 border-green-200'
    case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'poor': return 'text-red-600 bg-red-50 border-red-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export const getRatingIcon = (rating: string) => {
  switch (rating) {
    case 'good': return CheckCircle
    case 'needs-improvement': return AlertTriangle
    case 'poor': return AlertCircle
    default: return Monitor
  }
}

export const getOverallRating = (score: number): 'good' | 'needs-improvement' | 'poor' => {
  return score >= 90 ? 'good' : score >= 70 ? 'needs-improvement' : 'poor'
}

export const formatMetricValue = (metric: PerformanceMetric): string => {
  if (metric.value <= 0) return '--'
  
  if (metric.name === 'Cumulative Layout Shift') {
    return metric.value.toFixed(3)
  }
  
  return Math.round(metric.value).toString()
}