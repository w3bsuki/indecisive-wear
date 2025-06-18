import { cn } from "@/lib/utils"

interface NotificationBadgeProps {
  count: number
  className?: string
  maxCount?: number
}

export function NotificationBadge({ 
  count, 
  className, 
  maxCount = 99 
}: NotificationBadgeProps) {
  if (count <= 0) return null
  
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString()
  
  return (
    <span
      className={cn(
        "absolute -top-1 -right-1 z-10",
        "min-w-[18px] h-[18px] px-1",
        "bg-red-500 text-white text-xs font-medium",
        "rounded-full flex items-center justify-center",
        "transform-gpu transition-all duration-200",
        "ring-2 ring-white",
        className
      )}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  )
} 