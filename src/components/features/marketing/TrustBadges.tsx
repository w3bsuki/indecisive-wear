/**
 * Professional trust badges for e-commerce credibility
 */

"use client"

import { Shield } from 'lucide-react'
import { Truck } from 'lucide-react'
import { RotateCcw } from 'lucide-react'
import { CreditCard } from 'lucide-react'
import { Award } from 'lucide-react'
import { Users } from 'lucide-react'
import { useSimpleI18n } from '@/hooks/i18n/useSimpleI18n'
import { cn } from '@/lib/utils'

interface TrustBadgesProps {
  variant?: 'footer' | 'checkout' | 'product'
  className?: string
}

export function TrustBadges({ variant = 'footer', className }: TrustBadgesProps) {
  const { locale } = useSimpleI18n()

  const badges = [
    {
      icon: Shield,
      title: locale === 'bg' ? 'Сигурно плащане' : 'Secure Payment',
      description: locale === 'bg' ? 'SSL криптиране' : 'SSL Encryption',
      color: 'text-green-600'
    },
    {
      icon: Truck,
      title: locale === 'bg' ? 'Безплатна доставка' : 'Free Shipping',
      description: locale === 'bg' ? 'Над 50 лв' : 'Over $25',
      color: 'text-blue-600'
    },
    {
      icon: RotateCcw,
      title: locale === 'bg' ? '30-дневна гаранция' : '30-Day Returns',
      description: locale === 'bg' ? 'Лесно връщане' : 'Easy Returns',
      color: 'text-purple-600'
    },
    {
      icon: CreditCard,
      title: locale === 'bg' ? 'Всички карти' : 'All Cards Accepted',
      description: locale === 'bg' ? 'Visa, MC, PayPal' : 'Visa, MC, PayPal',
      color: 'text-gray-600'
    }
  ]

  const statsCards = [
    {
      icon: Users,
      number: '10,000+',
      label: locale === 'bg' ? 'Доволни клиенти' : 'Happy Customers'
    },
    {
      icon: Award,
      number: '4.9/5',
      label: locale === 'bg' ? 'Рейтинг' : 'Rating'
    }
  ]

  if (variant === 'checkout') {
    return (
      <div className={cn("bg-gray-50 rounded-lg p-4", className)}>
        <div className="flex items-center justify-center gap-6">
          {badges.slice(0, 3).map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <badge.icon className={cn("h-4 w-4", badge.color)} />
              <span className="font-medium text-gray-700">{badge.title}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'product') {
    return (
      <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <badge.icon className={cn("h-5 w-5 flex-shrink-0", badge.color)} />
            <div>
              <div className="text-sm font-medium text-gray-900">{badge.title}</div>
              <div className="text-xs text-gray-500">{badge.description}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default footer variant
  return (
    <div className={cn("border-t border-gray-200 pt-8", className)}>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        {/* Trust badges */}
        {badges.map((badge, index) => (
          <div key={index} className="text-center">
            <badge.icon className={cn("h-8 w-8 mx-auto mb-2", badge.color)} />
            <div className="text-sm font-medium text-gray-900 mb-1">{badge.title}</div>
            <div className="text-xs text-gray-500">{badge.description}</div>
          </div>
        ))}
        
        {/* Stats cards */}
        {statsCards.map((stat, index) => (
          <div key={index} className="text-center">
            <stat.icon className="h-8 w-8 mx-auto mb-2 text-pink-600" />
            <div className="text-lg font-bold text-gray-900 mb-1">{stat.number}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}