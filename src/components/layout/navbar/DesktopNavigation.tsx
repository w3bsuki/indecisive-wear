"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSimpleI18n } from '@/hooks/i18n/useSimpleI18n'
import { cn } from '@/lib/utils'

interface DesktopNavigationProps {
  onMenuClick: (section: string) => void
}

// Animation variants for nav items
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  })
}

const underlineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 }
}

export function DesktopNavigation({ onMenuClick }: DesktopNavigationProps) {
  const { t } = useSimpleI18n()
  const router = useRouter()
  
  const navigationItems = [
    { key: 'NEW', label: t('new'), action: () => onMenuClick('NEW') },
    { key: 'HOT', label: t('hot'), action: () => onMenuClick('HOT') },
    { key: 'SALE', label: t('sale'), action: () => onMenuClick('SALE') },
    { key: 'SHOP', label: t('shop'), action: () => router.push('/shop'), isActive: true }
  ]
  
  return (
    <motion.nav 
      className="flex items-center justify-center space-x-8 xl:space-x-12"
      aria-label="Main navigation"
      initial="hidden"
      animate="visible"
      role="navigation"
    >
      {navigationItems.map((item, index) => (
        <motion.button
          key={item.key}
          type="button"
          onClick={item.action}
          custom={index}
          variants={navItemVariants}
          className={cn(
            "group relative px-4 py-2.5 rounded-lg transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2",
            "hover:bg-pink-50/50",
            item.isActive ? "bg-pink-50/30" : ""
          )}
          aria-label={`Navigate to ${item.label} section`}
          role="menuitem"
        >
          <span className={cn(
            "font-mono text-lg tracking-wide font-bold transition-colors duration-200",
            item.isActive 
              ? "text-pink-600 group-hover:text-pink-700" 
              : "text-gray-900 group-hover:text-pink-600"
          )}>
            {item.label}
          </span>
          
          {/* Enhanced underline animation */}
          <motion.span 
            className={cn(
              "absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full",
              item.isActive ? "w-3/4" : "w-0"
            )}
            style={{ transform: 'translateX(-50%)' }}
            variants={underlineVariants}
            initial="hidden"
            whileHover="visible"
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-pink-400/5 to-pink-500/5 rounded-lg opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      ))}
    </motion.nav>
  )
} 