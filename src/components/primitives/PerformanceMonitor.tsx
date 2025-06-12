"use client"

import { useEffect, useState } from 'react'
import { vitalsTracker, getVitalsScore } from '@/lib/performance/vitals'
import { cn } from '@/lib/utils'

interface PerformanceMonitorProps {
  className?: string
  debug?: boolean
}

export function PerformanceMonitor({ className, debug = false }: PerformanceMonitorProps) {
  const [score, setScore] = useState<number>(0)
  const [metrics, setMetrics] = useState<Record<string, { value: number; rating: string }>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Initialize vitals tracking
    vitalsTracker.init()

    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      const vitalsData = getVitalsScore()
      setScore(vitalsData.score)
      setMetrics(vitalsData.breakdown)
    }, 5000)

    // Initial update after page load
    setTimeout(() => {
      const vitalsData = getVitalsScore()
      setScore(vitalsData.score)
      setMetrics(vitalsData.breakdown)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!debug && process.env.NODE_ENV === 'production') {
    return null
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-500'
      case 'needs-improvement': return 'text-yellow-500'
      case 'poor': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={cn(
          "fixed bottom-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg border",
          "transition-all duration-200 hover:scale-110",
          getScoreColor(score),
          className
        )}
        aria-label="Toggle performance monitor"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Performance Monitor</h3>
            <span className={cn("text-2xl font-bold", getScoreColor(score))}>{score}</span>
          </div>

          <div className="space-y-2">
            {Object.entries(metrics).map(([name, data]) => (
              <div key={name} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-900">{Math.round(data.value)}ms</span>
                  <span className={cn("text-xs", getRatingColor(data.rating))}>
                    {data.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t text-xs text-gray-500">
            <p>Updated every 5 seconds</p>
            <p>Higher scores = better performance</p>
          </div>
        </div>
      )}
    </>
  )
}