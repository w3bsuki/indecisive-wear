import { describe, it, expect } from 'vitest'
import { unique, chunk, shuffle, groupBy, sortBy } from '../array'

describe('unique', () => {
  it('should remove duplicate values', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    expect(unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('should handle empty arrays', () => {
    expect(unique([])).toEqual([])
  })

  it('should handle arrays with no duplicates', () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should preserve order', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
  })
})

describe('chunk', () => {
  it('should split array into chunks', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
  })

  it('should handle size larger than array', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]])
  })

  it('should handle empty arrays', () => {
    expect(chunk([], 2)).toEqual([])
  })

  it('should handle size of 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })
})

describe('shuffle', () => {
  it('should return array with same length', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffle(arr)
    expect(shuffled).toHaveLength(arr.length)
  })

  it('should contain all original elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffle(arr)
    expect(shuffled.sort()).toEqual(arr.sort())
  })

  it('should handle empty arrays', () => {
    expect(shuffle([])).toEqual([])
  })

  it('should handle single element arrays', () => {
    expect(shuffle([1])).toEqual([1])
  })
})

describe('groupBy', () => {
  it('should group objects by key', () => {
    const data = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' }
    ]
    const grouped = groupBy(data, 'category')
    expect(grouped).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' }
      ],
      vegetable: [
        { category: 'vegetable', name: 'carrot' }
      ]
    })
  })

  it('should handle empty arrays', () => {
    expect(groupBy([], 'key')).toEqual({})
  })

  it('should handle missing keys', () => {
    const data = [
      { name: 'apple' },
      { category: 'fruit', name: 'banana' }
    ]
    const grouped = groupBy(data, 'category' as keyof typeof data[0])
    expect(grouped).toHaveProperty('fruit')
    expect(grouped.fruit).toHaveLength(1)
  })
})

describe('sortBy', () => {
  it('should sort objects by key', () => {
    const data = [
      { name: 'charlie', age: 30 },
      { name: 'alice', age: 25 },
      { name: 'bob', age: 35 }
    ]
    const sorted = sortBy(data, 'name')
    expect(sorted[0].name).toBe('alice')
    expect(sorted[1].name).toBe('bob')
    expect(sorted[2].name).toBe('charlie')
  })

  it('should sort numbers correctly', () => {
    const data = [
      { id: 3, name: 'three' },
      { id: 1, name: 'one' },
      { id: 2, name: 'two' }
    ]
    const sorted = sortBy(data, 'id')
    expect(sorted[0].id).toBe(1)
    expect(sorted[1].id).toBe(2)
    expect(sorted[2].id).toBe(3)
  })

  it('should handle empty arrays', () => {
    expect(sortBy([], 'key')).toEqual([])
  })
})