"use client"

import { useEffect, useState, useMemo, memo } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  compact?: boolean;
  className?: string;
}

// Memoized time unit component to prevent unnecessary re-renders
const TimeUnit = memo(({ value, label, className }: { value: string; label: string; className?: string }) => (
  <div className={cn("flex flex-col items-center gap-1", className)}>
    <div className="bg-white border border-gray-200 rounded-lg px-2 py-1 min-w-[45px] shadow-sm">
      <span className="tabular-nums font-bold text-lg text-gray-900 block text-center">
        {value}
      </span>
    </div>
    <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
      {label}
    </span>
  </div>
))

TimeUnit.displayName = 'TimeUnit'

function CountdownTimer({ compact = false, className = "" }: CountdownTimerProps) {
  // Use useMemo to create the launch date only once
  const launchDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date
  }, [])

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Define the calculation function inside useEffect
    const calculateTimeLeft = () => {
      const difference = +launchDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Set up interval
    const timer = setInterval(calculateTimeLeft, 1000)

    // Clean up interval
    return () => clearInterval(timer)
  }, [launchDate]) // Only depend on the memoized launchDate

  // Memoize formatted values to prevent recalculation on each render
  const formattedValues = useMemo(() => ({
    days: timeLeft.days.toString(),
    hours: timeLeft.hours.toString().padStart(2, '0'),
    minutes: timeLeft.minutes.toString().padStart(2, '0'),
    seconds: timeLeft.seconds.toString().padStart(2, '0')
  }), [timeLeft])

  if (compact) {
    return (
      <div className={cn("flex items-center justify-center font-roboto-mono", className)}>
        <div className="flex items-center gap-2">
          <TimeUnit value={formattedValues.days} label="DAYS" />
          <div className="text-gray-400 text-sm font-bold">:</div>
          <TimeUnit value={formattedValues.hours} label="HRS" />
          <div className="text-gray-400 text-sm font-bold">:</div>
          <TimeUnit value={formattedValues.minutes} label="MIN" />
          <div className="text-gray-400 text-sm font-bold">:</div>
          <TimeUnit value={formattedValues.seconds} label="SEC" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-6">
      <TimeUnit value={formattedValues.days} label="DAYS" />
      <div className="text-gray-300 text-2xl font-bold">:</div>
      <TimeUnit value={formattedValues.hours} label="HOURS" />
      <div className="text-gray-300 text-2xl font-bold">:</div>
      <TimeUnit value={formattedValues.minutes} label="MINUTES" />
      <div className="text-gray-300 text-2xl font-bold">:</div>
      <TimeUnit value={formattedValues.seconds} label="SECONDS" />
    </div>
  )
}

// Export as memoized component to prevent unnecessary re-renders from parent
export default memo(CountdownTimer)
