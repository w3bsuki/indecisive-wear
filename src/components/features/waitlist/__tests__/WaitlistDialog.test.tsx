import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/lib/testing/test-wrapper'
import { WaitlistDialog } from '../WaitlistDialog'

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
})

// Mock i18n
vi.mock('@/hooks', () => ({
  useSimpleI18n: () => ({
    t: (key: string, variables?: Record<string, any>) => {
      const translations: Record<string, string> = {
        'waitlist.exclusiveAccess': 'Exclusive Access',
        'waitlist.brandTitle': 'Indecisive Wear',
        'waitlist.ctaTitle': 'Be the first to shop our exclusive collection',
        'waitlist.form.firstName.label': 'Name',
        'waitlist.form.firstName.placeholder': 'Enter your name',
        'waitlist.form.email.label': 'Email',
        'waitlist.form.email.placeholder': 'Enter your email',
        'waitlist.form.marketingConsent.label': 'I agree to receive marketing emails',
        'waitlist.form.submit': 'Join Waitlist',
        'waitlist.successMessage': 'Thank you {name}!',
        'waitlist.errors.general': 'Something went wrong',
        'waitlist.errors.required': 'Please fill in all fields',
        'waitlist.success.title': 'Welcome to the Family!',
        'waitlist.success.message': 'Thank you for joining our waitlist, {name}!',
        'waitlist.success.instagram': 'Follow us on Instagram',
        'waitlist.success.tiktok': 'Follow us on TikTok',
      }
      let translation = translations[key] || key
      
      if (variables && translation.includes('{')) {
        Object.entries(variables).forEach(([varKey, value]) => {
          translation = translation.replace(`{${varKey}}`, String(value))
        })
      }
      
      return translation
    },
    locale: 'en',
    formatPrice: (price: number) => `$${price}`,
  }),
}))

describe('WaitlistDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders trigger button correctly', () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    expect(screen.getByText('Open Waitlist')).toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    const trigger = screen.getByText('Open Waitlist')
    fireEvent.click(trigger)

    await waitFor(() => {
      expect(screen.getByText('Indecisive Wear')).toBeInTheDocument()
    })
  })

  it('displays form fields when dialog is open', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })
  })

  it('validates required fields', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      expect(screen.getByText('Join Waitlist')).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      // Form validation errors from Zod
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    })

    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      const checkbox = screen.getByRole('checkbox')
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
      fireEvent.click(checkbox)
    })

    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("You're on the list! 🎉")).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('shows loading state during submission', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    })

    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Joining waitlist...')).toBeInTheDocument()
    })
  })

  it('closes dialog after successful submission', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    })

    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("You're on the list! 🎉")).toBeInTheDocument()
    })

    // Wait for auto-close after 4 seconds
    await waitFor(() => {
      expect(screen.queryByText('Join Our Waitlist')).not.toBeInTheDocument()
    }, { timeout: 5000 })
  })

  it('resets form when dialog is closed and reopened', async () => {
    render(
      <WaitlistDialog>
        <button>Open Waitlist</button>
      </WaitlistDialog>
    )

    // Open dialog and fill form
    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    })

    // Close dialog
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText('Join Our Waitlist')).not.toBeInTheDocument()
    })

    // Reopen dialog
    fireEvent.click(screen.getByText('Open Waitlist'))

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
    })
  })
})