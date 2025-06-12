/**
 * Modern Waitlist Form
 * Demonstrates Phase 9.2 architecture: React Hook Form + Zod + Zustand + TanStack Query
 * 
 * Phase 9.2: Data Fetching Modernization
 */

'use client'

import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Heart } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { useModernForm } from '@/hooks/forms/useModernForm'
import { 
  ModernTextField, 
  ModernSelectField, 
  ModernCheckboxField,
  ModernFormSubmit 
} from '@/components/forms/ModernFormField'
import {
  waitlistFormSchema,
  defaultWaitlistFormValues,
  waitlistFieldConfigs,
  type WaitlistFormData
} from '@/lib/validations/waitlist'
import { queryKeys } from '@/lib/query-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ModernWaitlistFormProps {
  className?: string
  showBenefits?: boolean
  variant?: 'default' | 'compact' | 'inline'
}

export const ModernWaitlistForm = React.memo(function ModernWaitlistForm({ 
  className, 
  showBenefits = true,
  variant = 'default'
}: ModernWaitlistFormProps) {
  // Submit function that integrates with our API
  const handleSubmit = useCallback(async (data: WaitlistFormData) => {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        source: data.source,
        stylePreference: data.stylePreference,
        location: data.location,
        socialHandles: data.socialHandles,
        marketingConsent: data.marketingConsent,
        referralCode: data.referralCode,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to join waitlist')
    }

    return response.json()
  }, [])

  // Initialize modern form with all integrations
  const form = useModernForm({
    schema: waitlistFormSchema,
    defaultValues: defaultWaitlistFormValues,
    onSubmit: handleSubmit,
    
    // Success handling
    onSuccess: (_data, _response) => {
      // Handle success silently
    },
    
    // Query integration
    invalidateQueries: [
      [...queryKeys.waitlist.all],
      [...queryKeys.waitlist.analytics()],
    ],
    
    // UI feedback
    successMessage: (data) => 
      `Welcome to the waitlist, ${data.firstName}! We're excited to have you join us.`,
    errorMessage: (error) => 
      `Failed to join waitlist: ${error.message}`,
    
    // Form behavior
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  // Success state
  if (form.isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('text-center space-y-4', className)}
      >
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            You're on the list! 🎉
          </h3>
          <p className="text-gray-600 mt-1">
            We'll keep you updated on our launch progress.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Heart className="w-4 h-4 fill-current text-pink-500" />
          <span>Thank you for your interest in Indecisive Wear</span>
        </div>
      </motion.div>
    )
  }

  // Compact variant for inline usage
  if (variant === 'compact') {
    return (
      <form onSubmit={form.handleSubmit} className={cn('space-y-3', className)}>
        <div className="flex gap-2">
          <ModernTextField
            form={form.form}
            name="email"
            placeholder={waitlistFieldConfigs.email.placeholder}
            className="flex-1"
          />
          <ModernFormSubmit 
            form={form}
            size="lg"
            className="px-6"
          >
            Join <ArrowRight className="w-4 h-4 ml-1" />
          </ModernFormSubmit>
        </div>
        
        <ModernTextField
          form={form.form}
          name="firstName"
          placeholder={waitlistFieldConfigs.firstName.placeholder}
        />
        
        <ModernCheckboxField
          form={form.form}
          name="marketingConsent"
          label={waitlistFieldConfigs.marketingConsent.label}
          className="text-xs"
        />
        
        <ModernCheckboxField
          form={form.form}
          name="agreeToTerms"
          label={waitlistFieldConfigs.agreeToTerms.label}
          className="text-xs"
        />
      </form>
    )
  }

  // Default full form
  return (
    <div className={cn('space-y-6', className)}>
      {/* Benefits section */}
      {showBenefits && (
        <div className="text-center space-y-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              Early Access
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              Join the Indecisive Wear Waitlist
            </h2>
            <p className="text-gray-600 mt-2">
              Be the first to know when we launch and get exclusive early access to our premium headwear collection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <div className="font-medium text-gray-900">Early Access</div>
              <div className="text-gray-600">Get first dibs on new drops</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-gray-900">Exclusive Deals</div>
              <div className="text-gray-600">Waitlist-only discounts</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-gray-900">Behind the Scenes</div>
              <div className="text-gray-600">See our design process</div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Join Our Waitlist</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit} className="space-y-4">
            {/* Required fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModernTextField
                form={form.form}
                name="email"
                label={waitlistFieldConfigs.email.label}
                placeholder={waitlistFieldConfigs.email.placeholder}
                description={waitlistFieldConfigs.email.description}
                required={waitlistFieldConfigs.email.required}
                type="email"
              />
              
              <ModernTextField
                form={form.form}
                name="firstName"
                label={waitlistFieldConfigs.firstName.label}
                placeholder={waitlistFieldConfigs.firstName.placeholder}
                description={waitlistFieldConfigs.firstName.description}
                required={waitlistFieldConfigs.firstName.required}
              />
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModernSelectField
                form={form.form}
                name="source"
                label={waitlistFieldConfigs.source.label}
                placeholder={waitlistFieldConfigs.source.placeholder}
                description={waitlistFieldConfigs.source.description}
                options={[...waitlistFieldConfigs.source.options]}
              />
              
              <ModernSelectField
                form={form.form}
                name="stylePreference"
                label={waitlistFieldConfigs.stylePreference.label}
                placeholder={waitlistFieldConfigs.stylePreference.placeholder}
                description={waitlistFieldConfigs.stylePreference.description}
                options={[...waitlistFieldConfigs.stylePreference.options]}
              />
            </div>

            <ModernTextField
              form={form.form}
              name="location"
              label={waitlistFieldConfigs.location.label}
              placeholder={waitlistFieldConfigs.location.placeholder}
              description={waitlistFieldConfigs.location.description}
            />

            <ModernTextField
              form={form.form}
              name="referralCode"
              label={waitlistFieldConfigs.referralCode.label}
              placeholder={waitlistFieldConfigs.referralCode.placeholder}
              description={waitlistFieldConfigs.referralCode.description}
            />

            {/* Consent fields */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <ModernCheckboxField
                form={form.form}
                name="newsletterSubscribe"
                label={waitlistFieldConfigs.newsletterSubscribe.label}
                description={waitlistFieldConfigs.newsletterSubscribe.description}
              />
              
              <ModernCheckboxField
                form={form.form}
                name="marketingConsent"
                label={waitlistFieldConfigs.marketingConsent.label}
                description={waitlistFieldConfigs.marketingConsent.description}
              />
              
              <ModernCheckboxField
                form={form.form}
                name="agreeToTerms"
                label={waitlistFieldConfigs.agreeToTerms.label}
                description={waitlistFieldConfigs.agreeToTerms.description}
                required={waitlistFieldConfigs.agreeToTerms.required}
              />
            </div>

            {/* Submit button */}
            <ModernFormSubmit 
              form={form}
              size="lg"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
              loadingText="Joining waitlist..."
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 ml-2" />
            </ModernFormSubmit>

            {/* Form state info for debugging in dev */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-gray-400 mt-4">
                <div>Valid: {form.isValid ? '✓' : '✗'}</div>
                <div>Dirty: {form.isDirty ? '✓' : '✗'}</div>
                <div>Submitting: {form.isSubmitting ? '✓' : '✗'}</div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}) 