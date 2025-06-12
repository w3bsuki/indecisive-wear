"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useSimpleI18n } from "@/hooks"
import { useModernForm } from "@/hooks/forms/useModernForm"
import { waitlistFormSchema, defaultWaitlistFormValues } from "@/lib/validations/waitlist"
import { ModernFormSubmit, ModernTextField, ModernCheckboxField } from "@/components/forms/ModernFormField"
import type { WaitlistSignupRequest, WaitlistSignupResponse } from "@/lib/types/waitlist"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Sparkles } from 'lucide-react'
import { Heart } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import { Instagram } from 'lucide-react'
import { TikTokIcon } from "@/components/icons/TikTok"

interface WaitlistDialogProps {
  children: React.ReactNode
  className?: string
}

const WaitlistDialogComponent = ({ children, className }: WaitlistDialogProps) => {
  const { t } = useSimpleI18n()
  const [open, setOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Modern form with React Hook Form + Zod + TanStack Query + Zustand
  const form = useModernForm({
    schema: waitlistFormSchema,
    defaultValues: defaultWaitlistFormValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    showToasts: true,
    successMessage: (data) => t('waitlist.successMessage', { name: data.firstName }),
    errorMessage: (error) => error.message || t('waitlist.errors.general'),
    onSubmit: async (data) => {
      const requestData: WaitlistSignupRequest = {
        email: data.email?.trim() || '',
        name: data.firstName?.trim() || '',
        source: 'website',
        locale: navigator.language?.split('-')[0] || 'en',
        interests: data.marketingConsent ? ['marketing_updates'] : [],
      }

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      const responseData: WaitlistSignupResponse = await response.json()

      if (!responseData.success) {
        throw new Error(responseData.message || t('waitlist.errors.general'))
      }

      return responseData
    },
    onSuccess: (data, response) => {
      setSuccessMessage((response as WaitlistSignupResponse)?.message || t('waitlist.successMessage'))
      setIsSuccess(true)
      
      // Auto-close dialog after success
      setTimeout(() => {
        form.form.reset()
        setIsSuccess(false)
        setSuccessMessage("")
        setOpen(false)
      }, 4000)
    },
    invalidateQueries: [['waitlist']] // Invalidate waitlist queries on success
  })

  const resetForm = () => {
    form.form.reset()
    setIsSuccess(false)
    setSuccessMessage("")
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen)
      if (!newOpen) {
        resetForm()
      }
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={cn(
        "w-[95vw] max-w-md sm:max-w-lg", 
        "overflow-hidden rounded-2xl border-0 shadow-2xl", 
        "bg-white/98 backdrop-blur-sm",
        "max-h-[90vh] overflow-y-auto", // Reduced from 95vh to 90vh for better mobile fit
        "p-0", // Remove default padding to control spacing better
        className
      )}>
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/60 via-white/80 to-pink-50/60" />
        
        <div className="relative p-6">
          {/* Screen reader announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {form.isSubmitting && "Submitting your request..."}
            {isSuccess && successMessage}
            {form.isError && form.mutation.error && `Error: ${form.mutation.error.message}`}
          </div>
          
          <DialogHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-pink-50/80 backdrop-blur-sm text-pink-700 hover:bg-pink-50/80 border border-pink-200/50 rounded-full px-4 py-2 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                <Sparkles className="w-3 h-3 mr-1" />
                {t('waitlist.exclusiveAccess')}
              </Badge>
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              <span className="relative inline-block">
                <span className="relative inline-block bg-gradient-to-r from-pink-600 to-pink-400 text-white transform -skew-x-6 font-bold tracking-tighter px-3 py-1 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                  {t('waitlist.brandTitle')}
                </span>
              </span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 leading-relaxed">
              {t('waitlist.ctaTitle')}
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-4"
            >
              {/* Beautiful glassmorphism success container */}
              <div className="relative w-full max-w-sm mx-auto">
                {/* Gradient background layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-pink-400/10 to-pink-500/15 rounded-2xl opacity-60" />
                
                {/* Main success card */}
                <div className="relative bg-white/96 border border-pink-200/50 rounded-2xl p-6 shadow-[0_8px_32px_rgba(236,72,153,0.25)]">
                  {/* Success icon with glassmorphism effect */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex items-center justify-center mx-auto mb-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-green-400/10 to-green-500/15 rounded-2xl" />
                      <div className="relative flex items-center justify-center w-16 h-16 bg-white/95 border border-green-200/50 rounded-2xl shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Success title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-center text-gray-900 mb-2"
                  >
                    {t('waitlist.successTitle')}
                  </motion.h3>
                  
                  {/* Success message */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-center leading-relaxed mb-4 text-sm"
                  >
                    {successMessage || t('waitlist.successMessage')}
                  </motion.p>
                  
                  {/* Additional perks */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-1.5 mb-4"
                  >
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                      <span>{t('waitlist.earlyAccess')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                      <span>{t('waitlist.memberDiscounts')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                      <span>{t('waitlist.limitedPreviews')}</span>
                    </div>
                  </motion.div>
                  
                  {/* Social Media Icons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center gap-3 pt-1"
                  >
                    <span className="text-xs text-gray-500">{t('waitlist.followUs')}</span>
                    <button
                      type="button"
                      onClick={() => window.open('https://www.instagram.com/indecisive_wear/', '_blank')}
                      className="flex items-center justify-center w-11 h-11 bg-white/80 border border-pink-200/50 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors duration-150 group shadow-sm touch-manipulation"
                      aria-label="Follow us on Instagram"
                    >
                      <Instagram className="w-4 h-4 text-gray-600 group-hover:text-pink-600 transition-colors" />
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open('https://www.tiktok.com/@indecisive.wear', '_blank')}
                      className="flex items-center justify-center w-11 h-11 bg-white/80 border border-gray-200/50 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-150 group shadow-sm touch-manipulation"
                      aria-label="Follow us on TikTok"
                    >
                      <TikTokIcon className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={form.handleSubmit} className="space-y-5">
              {/* Name Field */}
              <ModernTextField
                form={form.form}
                name="firstName"
                label={t('waitlist.name')}
                placeholder={t('waitlist.namePlaceholder')}
                autoComplete="given-name"
                className="px-4 h-12 bg-white/95 backdrop-blur-sm border border-pink-200/50 rounded-xl focus:border-pink-500/50 focus:ring-2 focus:ring-pink-100/50 transition-all duration-200 shadow-sm hover:shadow-md hover:bg-white"
                disabled={form.isSubmitting}
                required
              />

              {/* Email Field */}
              <ModernTextField
                form={form.form}
                name="email"
                label={t('waitlist.email')}
                placeholder={t('waitlist.emailFormat')}
                type="email"
                autoComplete="email"
                inputMode="email"
                className="px-4 h-12 bg-white/95 backdrop-blur-sm border border-pink-200/50 rounded-xl focus:border-pink-500/50 focus:ring-2 focus:ring-pink-100/50 transition-all duration-200 shadow-sm hover:shadow-md hover:bg-white"
                disabled={form.isSubmitting}
                required
              />

              {/* Agree to Updates Checkbox */}
              <div className="p-4 bg-white/80 backdrop-blur-sm border border-pink-100/50 rounded-xl">
                <ModernCheckboxField
                  form={form.form}
                  name="agreeToTerms"
                  label={t('waitlist.agreeToTerms')}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500 rounded-md shadow-sm"
                  disabled={form.isSubmitting}
                />
              </div>

              {/* Error Message */}
              {form.mutation.error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 border border-red-200 rounded-xl p-3"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-sm text-red-600">{form.mutation.error.message}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <ModernFormSubmit
                form={form}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 active:from-pink-700 active:to-pink-800 text-white font-medium shadow-[0_8px_32px_rgba(236,72,153,0.25)] hover:shadow-[0_12px_40px_rgba(236,72,153,0.35)] transition-all duration-200 h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                loadingText={t('waitlist.joiningClub')}
                icon={<Heart className="w-4 h-4" />}
              >
                {t('waitlist.joinTheClub')}
              </ModernFormSubmit>

              {/* Footer */}
              <p className="text-xs text-gray-500 text-center bg-white/30 backdrop-blur-sm border border-pink-100/30 rounded-lg p-3 leading-relaxed">
                {t('waitlist.noSpam')}
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Simple memo comparison - only re-render if className changes
export const WaitlistDialog = React.memo(WaitlistDialogComponent, (prevProps, nextProps) => {
  return prevProps.className === nextProps.className
})

// Export as default for lazy loading
export default WaitlistDialog 