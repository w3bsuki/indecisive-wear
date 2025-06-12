/**
 * Waitlist Form Validation Schemas
 * Zod schemas for modern form validation
 * 
 * Phase 9.2: Data Fetching Modernization
 */

import { z } from 'zod'

// Email validation with custom error messages
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email address is too long')

// Name validation
const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')

// Optional string fields
const optionalStringSchema = z
  .string()
  .optional()
  .transform(val => val?.trim() || undefined)

// Source options
export const WAITLIST_SOURCES = [
  'social-media',
  'friend-family',
  'online-search',
  'advertisement',
  'influencer',
  'blog-article',
  'other'
] as const

export const STYLE_PREFERENCES = [
  'streetwear',
  'casual',
  'luxury',
  'mixed',
  'undecided'
] as const

// Core waitlist form schema
export const waitlistFormSchema = z.object({
  // Required fields
  email: emailSchema,
  firstName: nameSchema,
  
  // Optional demographic fields
  lastName: optionalStringSchema,
  
  // Source tracking
  source: z
    .enum(WAITLIST_SOURCES)
    .optional()
    .transform(val => val || 'other'),
    
  // Style preferences
  stylePreference: z
    .enum(STYLE_PREFERENCES)
    .optional()
    .transform(val => val || 'undecided'),
  
  // Location (optional, for shipping estimates)
  location: z
    .string()
    .max(100, 'Location must be less than 100 characters')
    .optional()
    .transform(val => val?.trim() || undefined),
    
  // Social handles (optional)
  socialHandles: z.object({
    instagram: z
      .string()
      .max(30, 'Instagram handle too long')
      .regex(/^[a-zA-Z0-9._]*$/, 'Invalid Instagram handle format')
      .optional()
      .transform(val => val?.trim() || ''),
    tiktok: z
      .string()
      .max(30, 'TikTok handle too long')
      .regex(/^[a-zA-Z0-9._]*$/, 'Invalid TikTok handle format')
      .optional()
      .transform(val => val?.trim() || ''),
  }).optional().default({ instagram: '', tiktok: '' }),
  
  // Consent and preferences
  marketingConsent: z
    .boolean()
    .default(false),
    
  // Terms agreement (required)
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, 'You must agree to the terms and conditions'),
    
  // Newsletter subscription (optional)
  newsletterSubscribe: z
    .boolean()
    .default(true),
    
  // Referral code (optional)
  referralCode: z
    .string()
    .max(20, 'Referral code too long')
    .regex(/^[A-Z0-9]*$/, 'Referral code can only contain uppercase letters and numbers')
    .optional()
    .transform(val => val?.trim().toUpperCase() || undefined),
})

// Type inference from schema
export type WaitlistFormData = z.infer<typeof waitlistFormSchema>

// Schema for minimal quick signup (just email)
export const quickSignupSchema = z.object({
  email: emailSchema,
  marketingConsent: z.boolean().default(true),
})

export type QuickSignupData = z.infer<typeof quickSignupSchema>

// Schema for waitlist status check
export const waitlistStatusSchema = z.object({
  email: emailSchema,
})

export type WaitlistStatusData = z.infer<typeof waitlistStatusSchema>

// Multi-step form schemas for better UX
export const waitlistStep1Schema = z.object({
  email: emailSchema,
  firstName: nameSchema,
})

export const waitlistStep2Schema = z.object({
  source: z.enum(WAITLIST_SOURCES).optional(),
  stylePreference: z.enum(STYLE_PREFERENCES).optional(),
  location: optionalStringSchema,
})

export const waitlistStep3Schema = z.object({
  socialHandles: z.object({
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
  }).optional(),
  referralCode: optionalStringSchema,
})

export const waitlistStep4Schema = z.object({
  marketingConsent: z.boolean(),
  agreeToTerms: z.boolean().refine(val => val === true, 'Required'),
  newsletterSubscribe: z.boolean(),
})

export type WaitlistStep1Data = z.infer<typeof waitlistStep1Schema>
export type WaitlistStep2Data = z.infer<typeof waitlistStep2Schema>
export type WaitlistStep3Data = z.infer<typeof waitlistStep3Schema>
export type WaitlistStep4Data = z.infer<typeof waitlistStep4Schema>

// Form validation helpers
export const validateWaitlistForm = (data: unknown) => {
  try {
    return {
      success: true,
      data: waitlistFormSchema.parse(data),
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.flatten().fieldErrors,
      }
    }
    return {
      success: false,
      data: null,
      errors: { _form: ['Invalid form data'] },
    }
  }
}

// Default form values
export const defaultWaitlistFormValues: Partial<WaitlistFormData> = {
  email: '',
  firstName: '',
  lastName: '',
  source: undefined,
  stylePreference: undefined,
  location: '',
  socialHandles: {
    instagram: '',
    tiktok: '',
  },
  marketingConsent: false,
  agreeToTerms: false,
  newsletterSubscribe: true,
  referralCode: '',
}

// Simple form values for basic signup flows  
export const defaultSimpleWaitlistValues = {
  email: '',
  firstName: '',
  agreeToTerms: false,
  marketingConsent: true,
}

// Form field configurations for UI
export const waitlistFieldConfigs = {
  email: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    description: 'We will use this to contact you when we launch',
    required: true,
    type: 'email' as const,
  },
  firstName: {
    label: 'First Name',
    placeholder: 'Your first name',
    description: 'How should we address you?',
    required: true,
  },
  lastName: {
    label: 'Last Name',
    placeholder: 'Your last name',
    description: 'Optional - helps us personalize your experience',
    required: false,
  },
  source: {
    label: 'How did you hear about us?',
    placeholder: 'Select an option',
    description: 'Help us understand our reach',
    required: false,
    options: [
      { value: 'social-media', label: 'Social Media' },
      { value: 'friend-family', label: 'Friend or Family' },
      { value: 'online-search', label: 'Online Search' },
      { value: 'advertisement', label: 'Advertisement' },
      { value: 'influencer', label: 'Influencer/Creator' },
      { value: 'blog-article', label: 'Blog/Article' },
      { value: 'other', label: 'Other' },
    ],
  },
  stylePreference: {
    label: 'Style Preference',
    placeholder: 'Select your style',
    description: 'Help us tailor your experience',
    required: false,
    options: [
      { value: 'streetwear', label: 'Streetwear & Urban' },
      { value: 'casual', label: 'Casual & Minimalist' },
      { value: 'luxury', label: 'Luxury & Designer' },
      { value: 'mixed', label: 'Mix & Match' },
      { value: 'undecided', label: 'Still Deciding' },
    ],
  },
  location: {
    label: 'Location',
    placeholder: 'City, Country',
    description: 'Optional - helps with shipping estimates',
    required: false,
  },
  referralCode: {
    label: 'Referral Code',
    placeholder: 'Enter code',
    description: 'Have a referral code? Enter it here for special perks',
    required: false,
  },
  marketingConsent: {
    label: 'I agree to receive marketing emails and can unsubscribe at any time.',
    description: 'We promise not to spam you',
    required: false,
  },
  agreeToTerms: {
    label: 'I agree to the Terms of Service and Privacy Policy.',
    description: 'Required to join the waitlist',
    required: true,
  },
  newsletterSubscribe: {
    label: 'Subscribe to our newsletter for updates and exclusive content.',
    description: 'Get the latest news and early access to drops',
    required: false,
  },
} as const 