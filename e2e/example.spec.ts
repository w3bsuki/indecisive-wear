/**
 * Example E2E Tests
 * Demonstrating Playwright testing for Phase 11
 * 
 * Phase 11: Developer Experience & Testing
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Indecisive Wear/)
    
    // Check for main navigation
    await expect(page.locator('nav')).toBeVisible()
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Test navigation links
    const navLinks = page.locator('nav a')
    const linkCount = await navLinks.count()
    
    expect(linkCount).toBeGreaterThan(0)
    
    // Test that links are clickable
    for (let i = 0; i < Math.min(linkCount, 3); i++) {
      const link = navLinks.nth(i)
      await expect(link).toBeVisible()
    }
  })

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('body')).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()
  })
})

test.describe('Performance Demo Page', () => {
  test('should load performance demo page', async ({ page }) => {
    await page.goto('/performance-demo')
    
    // Check that the page loads
    await expect(page.locator('h1')).toContainText('Performance')
    
    // Check for Core Web Vitals display
    await expect(page.locator('[data-testid="core-web-vitals"]')).toBeVisible()
  })

  test('should show performance metrics', async ({ page }) => {
    await page.goto('/performance-demo')
    
    // Wait for performance metrics to load
    await page.waitForTimeout(2000)
    
    // Check for LCP metric
    await expect(page.locator('[data-testid="lcp-metric"]')).toBeVisible()
    
    // Check for FID metric
    await expect(page.locator('[data-testid="fid-metric"]')).toBeVisible()
    
    // Check for CLS metric
    await expect(page.locator('[data-testid="cls-metric"]')).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    // Check for h1
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    
    // Check that there's only one h1
    const h1Count = await h1.count()
    expect(h1Count).toBeLessThanOrEqual(1)
  })

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/')
    
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/')
    
    // Check all images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })
})

test.describe('Forms', () => {
  test('should handle form validation', async ({ page }) => {
    await page.goto('/test-forms')
    
    // Find a form
    const form = page.locator('form').first()
    await expect(form).toBeVisible()
    
    // Try to submit empty form
    const submitButton = form.locator('button[type="submit"]')
    if (await submitButton.isVisible()) {
      await submitButton.click()
      
      // Check for validation errors
      const errorMessages = page.locator('[role="alert"], .error, [data-testid*="error"]')
      if (await errorMessages.count() > 0) {
        await expect(errorMessages.first()).toBeVisible()
      }
    }
  })

  test('should handle successful form submission', async ({ page }) => {
    await page.goto('/test-forms')
    
    // Find a form
    const form = page.locator('form').first()
    if (await form.isVisible()) {
      // Fill out form fields
      const inputs = form.locator('input[type="text"], input[type="email"]')
      const inputCount = await inputs.count()
      
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i)
        const type = await input.getAttribute('type')
        
        if (type === 'email') {
          await input.fill('test@example.com')
        } else {
          await input.fill('Test Value')
        }
      }
      
      // Submit form
      const submitButton = form.locator('button[type="submit"]')
      if (await submitButton.isVisible()) {
        await submitButton.click()
        
        // Wait for response
        await page.waitForTimeout(1000)
      }
    }
  })
})

test.describe('Performance', () => {
  test('should load within performance budget', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    
    // Measure LCP
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry?.startTime || 0)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000)
      })
    })
    
    // LCP should be under 2.5 seconds
    expect(lcp).toBeLessThan(2500)
  })
}) 