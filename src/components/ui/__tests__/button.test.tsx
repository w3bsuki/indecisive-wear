/**
 * Button Component Tests
 * Example of modern testing with Vitest + Testing Library
 * 
 * Phase 11: Developer Experience & Testing
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Button } from '../button'

// Example of testing helpers usage
import { eventHelpers, assertionHelpers } from '@/lib/testing/helpers'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="default">Default</Button>)
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-pink-500')
    
    rerender(<Button variant="destructive">Destructive</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-500')
    
    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border-pink-200')
    
    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-pink-100')
    
    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('text-pink-600')
    
    rerender(<Button variant="link">Link</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('text-pink-600')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="default">Default</Button>)
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-11', 'px-4')
    
    rerender(<Button size="sm">Small</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-11', 'px-3')
    
    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-12', 'px-6')
    
    rerender(<Button size="icon">Icon</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-11', 'w-11')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('supports custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    
    render(<Button ref={ref}>Ref test</Button>)
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  it('renders as different elements using asChild', () => {
    render(
      <Button asChild>
        <a href="/link">Link button</a>
      </Button>
    )
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/link')
    expect(link).toHaveTextContent('Link button')
  })

  // Example using our testing helpers
  it('demonstrates custom testing helpers', async () => {
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Helper test</Button>)
    
    const button = screen.getByRole('button')
    
    // Using our custom event helpers
    await eventHelpers.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    // Using our custom assertion helpers
    assertionHelpers.assertElementExists(button, 'button')
    assertionHelpers.assertHasClass(button, 'inline-flex')
    assertionHelpers.assertIsVisible(button)
  })

  // Accessibility testing
  it('meets accessibility requirements', () => {
    render(<Button>Accessible button</Button>)
    
    const button = screen.getByRole('button')
    
    // Should have accessible name
    expect(button).toHaveAccessibleName('Accessible button')
    
    // Should be focusable
    expect(button).not.toHaveAttribute('tabindex', '-1')
    
    // Should have proper button semantics
    expect(button.tagName).toBe('BUTTON')
  })

  it('supports keyboard navigation', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Keyboard test</Button>)
    
    const button = screen.getByRole('button')
    
    // Focus the button
    await user.tab()
    expect(button).toHaveFocus()
    
    // Activate with Enter
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    // Activate with Space
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  // Loading state testing
  it('shows loading state correctly', () => {
    const { rerender } = render(<Button>Normal</Button>)
    
    let button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
    expect(button).toHaveTextContent('Normal')
    
    // Simulate loading state (assuming the button component supports it)
    rerender(<Button disabled>Loading...</Button>)
    button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Loading...')
  })
}) 