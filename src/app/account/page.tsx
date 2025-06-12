import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { UserCircle, Package, MapPin, Settings, Heart, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default async function AccountPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const accountLinks = [
    {
      title: 'Profile Settings',
      description: 'Manage your personal information',
      icon: UserCircle,
      href: '/account/profile',
      color: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Order History',
      description: 'View and track your orders',
      icon: Package,
      href: '/account/orders',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Addresses',
      description: 'Manage your shipping addresses',
      icon: MapPin,
      href: '/account/addresses',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Wishlist',
      description: 'Items you\'ve saved for later',
      icon: Heart,
      href: '/account/wishlist',
      color: 'from-pink-500 to-red-500',
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment options',
      icon: CreditCard,
      href: '/account/payment',
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'Preferences',
      description: 'Customize your experience',
      icon: Settings,
      href: '/account/settings',
      color: 'from-gray-500 to-gray-700',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-cal text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account and track your orders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${link.color}`} 
                />
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${link.color} text-white mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {link.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-cal text-2xl font-bold text-gray-900 mb-6">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">0</div>
              <div className="text-sm text-gray-600 mt-1">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600 mt-1">Wishlist Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">0</div>
              <div className="text-sm text-gray-600 mt-1">Reward Points</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@indecisivewear.com" className="text-pink-600 hover:text-pink-700">
              support@indecisivewear.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}