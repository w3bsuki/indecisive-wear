export interface WaitlistEntry {
  id?: string
  email: string
  name?: string
  source?: string
  locale?: string
  interests?: string[]
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  created_at?: string
  updated_at?: string
  status?: 'active' | 'unsubscribed' | 'converted'
  verified?: boolean
  verification_token?: string
  last_email_sent?: string
  email_count?: number
}

export interface WaitlistSignupRequest {
  email: string
  name?: string
  source?: string
  locale?: string
  interests?: string[]
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface WaitlistSignupResponse {
  success: boolean
  message: string
  id?: string
  error?: string
}

export interface WaitlistAnalytics {
  signup_date: string
  locale: string
  source: string
  utm_source?: string
  utm_campaign?: string
  signups: number
  active_signups: number
  verified_signups: number
}