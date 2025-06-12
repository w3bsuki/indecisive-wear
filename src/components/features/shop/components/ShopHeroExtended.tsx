"use client"

import { motion } from "framer-motion"

interface ShopHeroExtendedProps {
  onScrollToProducts: () => void
}

export function ShopHeroExtended({ onScrollToProducts }: ShopHeroExtendedProps) {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Brand Messaging */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:pr-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-2 text-sm font-medium text-pink-700 mb-6">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            New Collection Available
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Can't Decide What
            <span className="block text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
              to Wear?
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-700 font-medium mt-2">
              Perfect. We Get It.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
            Premium streetwear for beautifully indecisive moments. Express your authentic self with hats that understand the struggle.
          </p>

          {/* Social Proof */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-700 font-medium">4.9/5</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">5,000+ happy customers</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={onScrollToProducts}
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Shop Collection
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
              View Lookbook
            </button>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center p-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Free Shipping</span>
              <span className="text-xs text-gray-500">On all orders</span>
            </div>
            
            <div className="flex flex-col items-center p-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">30-Day Returns</span>
              <span className="text-xs text-gray-500">Hassle-free</span>
            </div>
            
            <div className="flex flex-col items-center p-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Secure Payment</span>
              <span className="text-xs text-gray-500">SSL protected</span>
            </div>
            
            <div className="flex flex-col items-center p-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">5K+ Reviews</span>
              <span className="text-xs text-gray-500">Happy customers</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Visual Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Main Product Showcase */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12">
            {/* Featured Product */}
            <div className="relative">
              <img
                src="/images/hat-indecisive-purple.png"
                alt="Indecisive Wear Hat"
                className="w-full max-w-sm mx-auto object-contain"
              />
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-sm font-semibold text-gray-900">$29.99</div>
                <div className="text-xs text-gray-500">Free shipping</div>
              </div>
            </div>

            {/* Customer Quote */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-pink-700">S</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-500">Verified buyer</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "Finally, a brand that gets it! Love my Indecisive hat - it's exactly how I feel every morning. Quality is amazing too! 💜"
              </p>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}