"use client"

import { SignIn } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Glass morphism container */}
        <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)] rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to your Indecisive Wear account
            </p>
          </div>

          {/* Clerk Sign In */}
          <div className="flex justify-center">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200",
                  card: "bg-transparent shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: 
                    "border-2 border-pink-200/50 hover:border-pink-300/50 hover:bg-pink-50/30 text-gray-700 rounded-xl py-3 font-medium transition-all duration-200",
                  formFieldInput: 
                    "border-2 border-pink-200/50 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-100/50 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500",
                  formFieldLabel: "text-gray-700 font-medium",
                  dividerLine: "bg-pink-200/50",
                  dividerText: "text-gray-500",
                  footerActionLink: "text-pink-600 hover:text-pink-700 font-medium",
                  identityPreviewText: "text-gray-600",
                  identityPreviewEditButton: "text-pink-600 hover:text-pink-700",
                }
              }}
              redirectUrl="/shop"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-pink-600 hover:text-pink-700 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}