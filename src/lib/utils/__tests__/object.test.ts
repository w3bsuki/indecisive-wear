import { describe, it, expect } from 'vitest'
import { pick, omit, deepMerge, isObject, deepClone, hasProperty, getProperty, setProperty, deleteProperty } from '../object'

describe('pick', () => {
  it('should pick specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 }
    expect(pick(obj, ['a', 'c' as keyof typeof obj])).toEqual({ a: 1 })
  })

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2 }
    expect(pick(obj, [])).toEqual({})
  })
})

describe('omit', () => {
  it('should omit specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
  })

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 }
    expect(omit(obj, ['c' as keyof typeof obj])).toEqual({ a: 1, b: 2 })
  })

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2 }
    expect(omit(obj, [])).toEqual({ a: 1, b: 2 })
  })
})

describe('deepMerge', () => {
  it('should merge objects deeply', () => {
    const target = { a: 1, b: { c: 2 } }
    const source = { b: { c: 3 }, e: 4 } as Partial<typeof target>
    expect(deepMerge(target, source)).toEqual({
      a: 1,
      b: { c: 3 },
      e: 4
    })
  })

  it('should overwrite primitive values', () => {
    const target = { a: 1, b: 2 }
    const source = { b: 3, c: 4 }
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 })
  })

  it('should handle arrays', () => {
    const target = { a: [1, 2] }
    const source = { a: [3, 4] }
    expect(deepMerge(target, source)).toEqual({ a: [3, 4] })
  })
})

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('should return false for non-objects', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject('string')).toBe(false)
  })
})

describe('deepClone', () => {
  it('should create a deep copy of objects', () => {
    const obj = { a: 1, b: { c: 2 } }
    const clone = deepClone(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
  })

  it('should handle arrays', () => {
    const arr = [1, { a: 2 }, [3, 4]]
    const clone = deepClone(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
  })

  it('should handle primitive values', () => {
    expect(deepClone(42)).toBe(42)
    expect(deepClone('string')).toBe('string')
    expect(deepClone(null)).toBe(null)
  })
})

describe('hasProperty', () => {
  it('should check if object has property', () => {
    const obj = { a: 1, b: { c: 2 } }
    expect(hasProperty(obj, 'a')).toBe(true)
    expect(hasProperty(obj, 'b.c')).toBe(true)
    expect(hasProperty(obj, 'd')).toBe(false)
  })

  it('should handle nested paths', () => {
    const obj = { a: { b: { c: 1 } } }
    expect(hasProperty(obj, 'a.b.c')).toBe(true)
    expect(hasProperty(obj, 'a.b.d')).toBe(false)
  })
})

describe('getProperty', () => {
  it('should get property value', () => {
    const obj = { a: 1, b: { c: 2 } }
    expect(getProperty(obj, 'a')).toBe(1)
    expect(getProperty(obj, 'b.c')).toBe(2)
  })

  it('should return undefined for non-existent paths', () => {
    const obj = { a: 1 }
    expect(getProperty(obj, 'b')).toBeUndefined()
    expect(getProperty(obj, 'a.b.c')).toBeUndefined()
  })
})

describe('setProperty', () => {
  it('should set property value', () => {
    const obj = { a: 1 }
    setProperty(obj, 'b', 2)
    expect(obj).toEqual({ a: 1, b: 2 })
  })

  it('should set nested property', () => {
    const obj: Record<string, unknown> = {}
    setProperty(obj, 'a.b.c', 3)
    expect(obj).toEqual({ a: { b: { c: 3 } } })
  })
})

describe('deleteProperty', () => {
  it('should delete property', () => {
    const obj = { a: 1, b: 2 }
    deleteProperty(obj, 'a')
    expect(obj).toEqual({ b: 2 })
  })

  it('should delete nested property', () => {
    const obj = { a: { b: { c: 1 } } }
    deleteProperty(obj, 'a.b.c')
    expect(obj).toEqual({ a: { b: {} } })
  })
})