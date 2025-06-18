"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Heart } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useSimpleI18n } from '@/hooks'
import { useModernForm } from '@/hooks/forms/useModernForm'
import { ModernTextField, ModernSelectField, ModernSwitchField } from '@/components/forms/ModernFormField'
import type { WaitlistSignupRequest, WaitlistSignupResponse } from '@/lib/types/waitlist'
import { z } from 'zod'

// Schema for overlay form (simplified, step-by-step)
const overlayFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  firstName: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  source: z.string().min(1, 'Please let us know how you found us'),
  stylePreference: z.string().min(1, 'Please select your style preference'),
  marketingConsent: z.boolean().default(true),
})

type OverlayFormData = z.infer<typeof overlayFormSchema>

// Default values
const defaultOverlayFormValues: Partial<OverlayFormData> = {
  email: '',
  firstName: '',
  source: '',
  stylePreference: '',
  marketingConsent: true,
}

// Memoized button styles for better render performance
const buttonStyles = {
  primary: "h-11 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg",
  outline: "h-11 border border-pink-200 hover:bg-pink-50 text-pink-700"
}

interface WaitlistOverlayProps {
  className?: string;
  children?: React.ReactNode;
}

export function WaitlistOverlay({ className, children }: WaitlistOverlayProps) {
  const { t } = useSimpleI18n()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isStepOne, setIsStepOne] = useState(true)
  const [userLocation, setUserLocation] = useState('')
  
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        if (data?.country_name) {
          setUserLocation(`${data.city || ''}, ${data.country_name}`)
        }
      } catch (error) {
        // Silently handle location detection failure
      }
    }
    
    detectUserLocation()
  }, [])

  // Modern form with React Hook Form + Zod + TanStack Query + Zustand
  const form = useModernForm({
    schema: overlayFormSchema,
    defaultValues: defaultOverlayFormValues,
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
        // Additional context can be added to interests array
        interests: [
          ...data.marketingConsent ? ['marketing_updates'] : [],
          `source:${data.source}`,
          `style:${data.stylePreference}`,
          ...(userLocation ? [`location:${userLocation}`] : [])
        ]
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
      // Auto-close dialog after success
      setTimeout(() => {
        form.form.reset()
        setIsDialogOpen(false)
        setIsStepOne(true)
      }, 3000)
    },
    invalidateQueries: [['waitlist']] // Invalidate waitlist queries on success
  })

  const resetForm = () => {
    form.form.reset()
    setIsStepOne(true)
  }

  const handleContinue = async () => {
    const isEmailValid = await form.trigger('email');
    const isNameValid = await form.trigger('firstName');
    
    if (isEmailValid && isNameValid) {
      setIsStepOne(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(newOpen) => {
      setIsDialogOpen(newOpen)
      if (!newOpen) {
        resetForm()
      }
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            className={cn(
              buttonStyles.primary, 
              "px-8 w-full flex items-center justify-center gap-2",
              className
            )}
          >
            <Mail className="h-5 w-5" />
            <span>Join Waitlist</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-[450px] mx-auto p-0 border-0 shadow-2xl overflow-visible max-h-none">
        <div className="relative w-full bg-white">
          {/* Content Container */}
          <div className="p-6">
            {/* Header - Only show in first step */}
            {isStepOne && (
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-r from-pink-600 to-pink-400 text-white transform -skew-x-6 font-bold tracking-tighter px-4 py-2 rounded-lg shadow-lg">
                    {t('waitlist.brandTitle')}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('waitlist.joinWaitlist')}
                </h2>
                <p className="text-gray-600 text-sm">
                  {t('waitlist.description')}
                </p>
              </div>
            )}

            {/* Screen reader announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {form.isSubmitting && t('waitlist.submitting')}
              {form.isSuccess && t('waitlist.successMessage')}
              {form.isError && form.mutation.error && `Error: ${form.mutation.error.message}`}
            </div>
            
            {/* Form */}
            <form onSubmit={form.handleSubmit} className="space-y-3">
                <AnimatePresence mode="wait" initial={false}>
                  {isStepOne ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-3"
                    >
                      <ModernTextField
                        form={form.form}
                        name="email"
                        label={t('waitlist.email')}
                        placeholder={t('waitlist.emailPlaceholder')}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        className="h-10 text-base bg-white border-pink-200 focus:border-pink-500 focus:ring-pink-100"
                        disabled={form.isSubmitting}
                        required
                      />
                      
                      <ModernTextField
                        form={form.form}
                        name="firstName"
                        label={t('waitlist.name')}
                        placeholder={t('waitlist.namePlaceholder')}
                        autoComplete="given-name"
                        className="h-10 text-base bg-white border-pink-200 focus:border-pink-500 focus:ring-pink-100"
                        disabled={form.isSubmitting}
                        required
                      />
                      
                      <Button 
                        type="button"
                        onClick={handleContinue}
                        disabled={form.isSubmitting}
                        className={cn(buttonStyles.primary, "w-full text-base h-10 rounded-xl transition-all duration-200")}
                      >
                        {t('common.continue')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                      key="step2"
                    >
                      <ModernSelectField
                        form={form.form}
                        name="source"
                        label={t('waitlist.howDidYouFindUs')}
                        placeholder={t('waitlist.selectSource')}
                        options={[
                          { value: 'instagram', label: 'Instagram' },
                          { value: 'tiktok', label: 'TikTok' },
                          { value: 'friend', label: t('waitlist.friend') },
                          { value: 'search', label: t('waitlist.search') },
                          { value: 'other', label: t('common.other') },
                        ]}
                        className="h-10 text-base border-pink-200 focus:border-pink-500"
                        disabled={form.isSubmitting}
                        required
                      />

                      <ModernSelectField
                        form={form.form}
                        name="stylePreference"
                        label={t('waitlist.stylePreference')}
                        placeholder={t('waitlist.selectStyle')}
                        options={[
                          { value: 'streetwear', label: t('waitlist.styles.streetwear') },
                          { value: 'minimal', label: t('waitlist.styles.minimal') },
                          { value: 'vintage', label: t('waitlist.styles.vintage') },
                          { value: 'sporty', label: t('waitlist.styles.sporty') },
                          { value: 'casual', label: t('waitlist.styles.casual') },
                        ]}
                        className="h-10 text-base border-pink-200 focus:border-pink-500"
                        disabled={form.isSubmitting}
                        required
                      />

                      <div className="p-3 bg-pink-50/50 border border-pink-100 rounded-xl">
                        <ModernSwitchField
                          form={form.form}
                          name="marketingConsent"
                          label={t('waitlist.marketingConsent')}
                          description={t('waitlist.marketingConsentDescription')}
                          className="data-[state=checked]:bg-pink-500"
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
                      
                      <div className="flex space-x-3 pt-1">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setIsStepOne(true)}
                          disabled={form.isSubmitting}
                          className={cn(buttonStyles.outline, "w-1/3 text-base h-10 rounded-xl")}
                        >
                          {t('common.back')}
                        </Button>
                        <Button 
                          type="submit"
                          disabled={form.isSubmitting}
                          className={cn(buttonStyles.primary, "w-2/3 text-base h-10 rounded-xl relative overflow-hidden")}
                        >
                          {form.isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              {t('waitlist.joining')}
                            </>
                          ) : (
                            <>
                              {t('waitlist.joinWaitlist')}
                              <Heart className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
          </div>
          
          {/* Bottom section with verified by */}
          <div className="bg-pink-50/30 px-6 py-3 border-t border-pink-100">
            <p className="text-xs text-gray-500 text-center">
              {t('waitlist.privacyNote')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 