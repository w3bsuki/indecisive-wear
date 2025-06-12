import { describe, it, expect } from 'vitest'
import { capitalize, truncate, generateSlug } from '../string'

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('HELLO WORLD')).toBe('Hello world')
  })

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('')
  })

  it('should handle already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello')
    expect(capitalize('HELLO')).toBe('Hello')
  })

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
  })
})

describe('truncate', () => {
  it('should truncate long strings', () => {
    const longString = 'This is a very long string that needs to be truncated'
    expect(truncate(longString, 10)).toBe('This is...')
    expect(truncate(longString, 20)).toBe('This is a very lo...')
  })

  it('should not truncate short strings', () => {
    expect(truncate('Short', 10)).toBe('Short')
    expect(truncate('Short text', 20)).toBe('Short text')
  })

  it('should handle exact length strings', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })

  it('should handle empty strings', () => {
    expect(truncate('', 10)).toBe('')
  })

  it('should handle very small lengths', () => {
    expect(truncate('Hello', 3)).toBe('...')
    expect(truncate('Hello', 4)).toBe('H...')
  })
})

describe('generateSlug', () => {
  it('should convert to lowercase and replace spaces with hyphens', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
    expect(generateSlug('Test Product Name')).toBe('test-product-name')
  })

  it('should remove special characters', () => {
    expect(generateSlug('Hello! World?')).toBe('hello-world')
    expect(generateSlug('Test@Product#Name')).toBe('testproductname')
  })

  it('should handle multiple spaces', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world')
    expect(generateSlug('  Test  Product  ')).toBe('test-product')
  })

  it('should handle empty strings', () => {
    expect(generateSlug('')).toBe('')
  })

  it('should handle already slugified strings', () => {
    expect(generateSlug('hello-world')).toBe('hello-world')
  })
})