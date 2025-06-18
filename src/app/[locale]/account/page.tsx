"use client"

import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  CreditCard, 
  Settings,
  ShoppingBag,
  Calendar,
  Mail,
  Phone
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import Link from 'next/link'

export default function AccountPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30 flex items-center justify-center">
        <div className="animate-pulse bg-white/90 backdrop-blur-xl border border-pink-200/30 rounded-3xl p-8 w-96 h-64" />
      </div>
    )
  }

  const accountStats = [
    { label: 'Total Orders', value: '12', icon: Package },
    { label: 'Wishlist Items', value: '5', icon: Heart },
    { label: 'Saved Addresses', value: '2', icon: MapPin },
    { label: 'Payment Methods', value: '1', icon: CreditCard },
  ]

  const quickActions = [
    { 
      title: 'My Orders', 
      description: 'Track and manage your orders',
      icon: Package,
      href: '/account/orders',
      badge: '2 Active'
    },
    { 
      title: 'Profile Settings', 
      description: 'Update your personal information',
      icon: User,
      href: '/account/profile',
      badge: null
    },
    { 
      title: 'Addresses', 
      description: 'Manage shipping addresses',
      icon: MapPin,
      href: '/account/addresses',
      badge: null
    },
    { 
      title: 'Wishlist', 
      description: 'View your saved items',
      icon: Heart,
      href: '/account/wishlist',
      badge: '5 Items'
    },
    { 
      title: 'Payment Methods', 
      description: 'Manage cards and payment options',
      icon: CreditCard,
      href: '/account/payments',
      badge: null
    },
    { 
      title: 'Account Settings', 
      description: 'Security and preferences',
      icon: Settings,
      href: '/account/settings',
      badge: null
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30">
      <Container className="py-8">
        <Breadcrumbs className="mb-6" showHome />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)] rounded-3xl p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.firstName || 'there'}!
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.emailAddresses[0]?.emailAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Member since {new Date(user?.createdAt || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                Verified
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {accountStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)] p-6 text-center">
                  <stat.icon className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)] rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={action.href}>
                    <Card className="p-6 hover:shadow-md transition-all duration-200 cursor-pointer border border-pink-200/30 hover:border-pink-300/50 bg-white/50">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <action.icon className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                            {action.badge && (
                              <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-800">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{action.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)] rounded-3xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-pink-200/30">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Order #1234 delivered</p>
                  <p className="text-sm text-gray-600">Your Pink Summer Hat order was delivered successfully</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-pink-200/30">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Added to wishlist</p>
                  <p className="text-sm text-gray-600">Purple Designer Cap added to your wishlist</p>
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
            </div>
          </div>

        </motion.div>
      </Container>
    </div>
  )
}