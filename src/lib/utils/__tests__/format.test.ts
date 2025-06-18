import { describe, it, expect } from 'vitest'
import { formatPrice, formatDate, formatNumber, formatPercentage } from '../format'

describe('formatPrice', () => {
  it('should format price with default currency (USD)', () => {
    expect(formatPrice(10)).toBe('$10.00')
    expect(formatPrice(10.5)).toBe('$10.50')
    expect(formatPrice(1000)).toBe('$1,000.00')
  })

  it('should format price with specified currency', () => {
    expect(formatPrice(10, 'EUR')).toBe('€10.00')
    expect(formatPrice(10, 'GBP')).toBe('£10.00')
  })

  it('should handle zero and negative values', () => {
    expect(formatPrice(0)).toBe('$0.00')
    expect(formatPrice(-10)).toBe('-$10.00')
  })
})

describe('formatDate', () => {
  it('should format date to locale string', () => {
    const date = new Date('2024-01-15T12:00:00Z')
    const formatted = formatDate(date)
    expect(formatted).toContain('1')
    expect(formatted).toContain('15')
    expect(formatted).toContain('2024')
  })

  it('should format string dates', () => {
    const formatted = formatDate('2024-01-15')
    expect(formatted).toContain('1')
    expect(formatted).toMatch(/1[45]/) // Allow for timezone differences (14 or 15)
    expect(formatted).toContain('2024')
  })

  it('should handle invalid dates gracefully', () => {
    expect(formatDate('invalid')).toBe('Invalid Date')
  })
})

describe('formatNumber', () => {
  it('should format numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000')
    expect(formatNumber(1000000)).toBe('1,000,000')
    expect(formatNumber(100)).toBe('100')
  })

  it('should handle decimals', () => {
    expect(formatNumber(1000.5)).toBe('1,000.5')
    expect(formatNumber(1000.123)).toBe('1,000.123')
  })

  it('should handle zero and negative numbers', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(-1000)).toBe('-1,000')
  })
})

describe('formatPercentage', () => {
  it('should format percentages correctly', () => {
    expect(formatPercentage(0.5)).toBe('50%')
    expect(formatPercentage(0.123)).toBe('12%')
    expect(formatPercentage(1)).toBe('100%')
  })

  it('should handle edge cases', () => {
    expect(formatPercentage(0)).toBe('0%')
    expect(formatPercentage(1.5)).toBe('150%')
    expect(formatPercentage(-0.1)).toBe('-10%')
  })
})