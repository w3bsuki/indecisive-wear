"use client"

interface NotificationBadgeProps {
  count: number
  className?: string
  size?: 'small' | 'medium'
}

export function NotificationBadge({ count, className = "", size = 'medium' }: NotificationBadgeProps) {
  if (count === 0) return null
  
  const sizeClasses = {
    small: "h-3.5 w-3.5 text-[9px] -top-0.5 -right-0.5",
    medium: "h-4 w-4 text-[10px] -top-1 -right-1"
  }
  
  return (
    <span 
      className={`absolute ${sizeClasses[size]} flex items-center justify-center bg-pink-500 font-medium text-white rounded-full border border-white ${className}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
} 