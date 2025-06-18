"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EmailInput } from "@/components/forms/EmailInput"
import { cn } from "@/lib/utils"
import { sanitizeEmail } from "@/lib/utils/xss-protection"

export default function EmailSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Sanitize and validate email
    const sanitizedEmail = sanitizeEmail(email)
    if (!sanitizedEmail || !sanitizedEmail.includes("@") || sanitizedEmail.length < 5) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative z-20 flex flex-col gap-4">
        <div className="relative">
          <EmailInput
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 px-6 bg-black/30 border border-white/10 text-white placeholder:text-white/50 rounded-full backdrop-blur-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={isSubmitting || isSuccess}
          className={cn(
            "w-full h-14 rounded-full",
            isSuccess && "bg-green-500/80 hover:bg-green-500/90",
          )}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              <span>Joining...</span>
            </div>
          ) : isSuccess ? (
            <span>You're in the gang! 🎉</span>
          ) : (
            <span>JOIN THE GANG</span>
          )}
        </Button>
      </form>

      {isSuccess && (
        <p className="text-green-400 text-sm mt-2 text-center">Thanks for signing up! We'll keep you updated.</p>
      )}
    </div>
  )
}
