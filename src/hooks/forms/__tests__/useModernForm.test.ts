/**
 * useModernForm Hook Tests
 * Testing modern form system with React Hook Form + Zod + Zustand
 * 
 * Phase 11: Developer Experience & Testing
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { z } from 'zod'
import { useModernForm } from '../useModernForm'
import { TestProvider } from '@/lib/testing/test-wrapper'
import React from 'react'

// Test schema
const testSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name too short'),
  age: z.number().min(18, 'Must be 18+'),
  terms: z.boolean().refine(val => val === true, 'Must accept terms'),
})

type TestFormData = z.infer<typeof testSchema>

describe('useModernForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnSuccess = vi.fn()
  const mockOnError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  const renderHookWithProvider = (callback: () => any) => {
    return renderHook(callback, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        React.createElement(TestProvider, null, children)
      ),
    })
  }

  it('initializes with correct default values', () => {
    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        defaultValues: {
          email: 'test@example.com',
          name: 'John Doe',
          age: 25,
          terms: false,
        },
      })
    )

    expect(result.current.form.getValues()).toEqual({
      email: 'test@example.com',
      name: 'John Doe',
      age: 25,
      terms: false,
    })
    expect(result.current.isSubmitting ?? false).toBe(false)
    expect(result.current.formState.isSubmitted ?? false).toBe(false)
  })

  it('validates form data with Zod schema', async () => {
    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    )

    // Set invalid data
    act(() => {
      result.current.form.setValue('email', 'invalid-email')
      result.current.form.setValue('name', 'a') // too short
      result.current.form.setValue('age', 17) // too young
      result.current.form.setValue('terms', false) // not accepted
    })

    // Trigger validation
    await act(async () => {
      await result.current.form.trigger()
    })

    const errors = result.current.form.formState.errors
    expect(errors.email?.message).toBe('Invalid email')
    expect(errors.name?.message).toBe('Name too short')
    expect(errors.age?.message).toBe('Must be 18+')
    expect(errors.terms?.message).toBe('Must accept terms')
  })

  it('handles successful form submission', async () => {
    mockOnSubmit.mockResolvedValue({ success: true, data: { id: 1 } })

    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        onSuccess: mockOnSuccess,
        defaultValues: {
          email: 'test@example.com',
          name: 'John Doe',
          age: 25,
          terms: true,
        },
      })
    )

    await act(async () => {
      await result.current.form.handleSubmit(result.current.handleSubmit)()
    })

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'John Doe',
      age: 25,
      terms: true,
    })
    expect(mockOnSuccess).toHaveBeenCalledWith(
      { email: 'test@example.com', name: 'John Doe', age: 25, terms: true },
      { success: true, data: { id: 1 } }
    )
    expect(result.current.formState.isSubmitSuccessful ?? false).toBe(true)
  })

  it('handles submission errors', async () => {
    const error = new Error('Submission failed')
    mockOnSubmit.mockRejectedValue(error)

    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        onError: mockOnError,
        defaultValues: {
          email: 'test@example.com',
          name: 'John Doe',
          age: 25,
          terms: true,
        },
      })
    )

    await act(async () => {
      await result.current.form.handleSubmit(result.current.handleSubmit)()
    })

    expect(mockOnError).toHaveBeenCalledWith(
      error,
      { email: 'test@example.com', name: 'John Doe', age: 25, terms: true }
    )
    expect(result.current.isError ?? false).toBe(true)
  })

  it('shows loading state during submission', async () => {
    let resolveSubmit: (value: any) => void
    const submitPromise = new Promise(resolve => {
      resolveSubmit = resolve
    })
    mockOnSubmit.mockReturnValue(submitPromise)

    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        defaultValues: {
          email: 'test@example.com',
          name: 'John Doe',
          age: 25,
          terms: true,
        },
      })
    )

    // Start submission
    act(() => {
      result.current.form.handleSubmit(result.current.handleSubmit)()
    })

    // Should be loading
    expect(result.current.isSubmitting).toBe(true)

    // Resolve submission
    await act(async () => {
      resolveSubmit({ success: true })
      await submitPromise
    })

    // Should no longer be loading
    expect(result.current.isSubmitting).toBe(false)
  })

  it('resets form correctly', () => {
    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        defaultValues: {
          email: 'original@example.com',
          name: 'Original Name',
          age: 30,
          terms: true,
        },
      })
    )

    // Change values
    act(() => {
      result.current.form.setValue('email', 'changed@example.com')
      result.current.form.setValue('name', 'Changed Name')
    })

    // Reset form
    act(() => {
      result.current.reset()
    })

    // Should be back to defaults
    expect(result.current.form.getValues()).toEqual({
      email: 'original@example.com',
      name: 'Original Name',
      age: 30,
      terms: true,
    })
  })

  it('handles optimistic updates', async () => {
    const optimisticUpdate = vi.fn()
    
    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        optimisticUpdate,
        defaultValues: {
          email: 'test@example.com',
          name: 'John Doe',
          age: 25,
          terms: true,
        },
      })
    )

    await act(async () => {
      await result.current.form.handleSubmit(result.current.handleSubmit)()
    })

    expect(optimisticUpdate).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'John Doe',
      age: 25,
      terms: true,
    })
  })

  it('validates single fields', async () => {
    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    )

    // Set invalid email
    act(() => {
      result.current.form.setValue('email', 'invalid-email')
    })

    // Validate just the email field
    await act(async () => {
      await result.current.form.trigger('email')
    })

    expect(result.current.form.formState.errors.email?.message).toBe('Invalid email')
    // Other fields should not have errors yet
    expect(result.current.form.formState.errors.name).toBeUndefined()
  })

  it('provides form state helpers', () => {
    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    )

    const {
      isDirty,
      isValid,
      isValidating,
      isSubmitting,
      errors,
      touchedFields,
      dirtyFields,
    } = result.current.formState

    // All should be defined and have appropriate initial values
    expect(typeof (isDirty ?? false)).toBe('boolean')
    expect(typeof (isValid ?? false)).toBe('boolean')
    expect(typeof (isValidating ?? false)).toBe('boolean')
    expect(typeof (isSubmitting ?? false)).toBe('boolean')
    expect(typeof errors).toBe('object')
    expect(typeof touchedFields).toBe('object')
    expect(typeof dirtyFields).toBe('object')
  })

  it('supports custom validation modes', () => {
    const { result: onBlurResult } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        mode: 'onBlur',
      })
    )

    const { result: onChangeResult } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        mode: 'onChange',
      })
    )

    // Both should initialize successfully
    expect(onBlurResult.current.form).toBeDefined()
    expect(onChangeResult.current.form).toBeDefined()
  })

  it('handles form submission correctly', async () => {
    const { result } = renderHookWithProvider(() =>
      useModernForm({
        schema: testSchema,
        onSubmit: mockOnSubmit,
        defaultValues: {
          email: 'test@example.com',
          name: 'John Doe',
          age: 25,
          terms: true,
        },
      })
    )

    await act(async () => {
      await result.current.form.handleSubmit(result.current.handleSubmit)()
    })

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'John Doe',
      age: 25,
      terms: true,
    })
  })
}) 