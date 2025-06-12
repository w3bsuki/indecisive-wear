/**
 * Array Utilities
 * Comprehensive array manipulation functions with TypeScript support
 */

/**
 * Remove duplicate items from an array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Split array into chunks of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return []
  const result: T[][] = []
  
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  
  return result
}

/**
 * Shuffle array elements randomly
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  
  return result
}

/**
 * Group array elements by a key
 */
export function groupByArray<T extends Record<string, any>>(
  array: T[], 
  key: keyof T
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    return {
      ...groups,
      [groupKey]: [...(groups[groupKey] || []), item]
    }
  }, {} as Record<string, T[]>)
}

/**
 * Sort array by a key
 */
export function sortBy<T extends Record<string, any>>(
  array: T[], 
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Find items that exist in both arrays
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item))
}

/**
 * Find items that exist in first array but not second
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => !arr2.includes(item))
}

/**
 * Flatten nested arrays
 */
export function flattenArray<T>(array: (T | T[])[]): T[] {
  return array.reduce<T[]>((acc, item) => {
    return acc.concat(Array.isArray(item) ? flattenArray(item) : item)
  }, [])
}

/**
 * Get the last N elements from array
 */
export function takeLast<T>(array: T[], count: number): T[] {
  return array.slice(-count)
}

/**
 * Get the first N elements from array
 */
export function take<T>(array: T[], count: number): T[] {
  return array.slice(0, count)
}

/**
 * Remove falsy values from array
 */
export function compactArray<T>(array: (T | null | undefined | false | 0 | "")[]): T[] {
  return array.filter(Boolean) as T[]
}

/**
 * Check if arrays are equal (shallow comparison)
 */
export function isEqualArray<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false
  return arr1.every((item, index) => item === arr2[index])
}

/**
 * Move element from one index to another
 */
export function move<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array]
  const [removed] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, removed)
  return result
}

/**
 * Partition array into two arrays based on predicate
 */
export function partition<T>(
  array: T[], 
  predicate: (item: T) => boolean
): [T[], T[]] {
  const truthy: T[] = []
  const falsy: T[] = []
  
  array.forEach(item => {
    if (predicate(item)) {
      truthy.push(item)
    } else {
      falsy.push(item)
    }
  })
  
  return [truthy, falsy]
}

/**
 * Check if array is empty
 */
export function isEmptyArray<T>(array: T[]): boolean {
  return array.length === 0
}

/**
 * Get random element from array
 */
export function sample<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Get N random elements from array
 */
export function sampleSize<T>(array: T[], size: number): T[] {
  const shuffled = shuffle(array)
  return shuffled.slice(0, Math.min(size, array.length))
}

/**
 * Create array of numbers in range
 */
export function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start
    start = 0
  }
  
  const result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  
  return result
}

/**
 * Remove items from array by indices
 */
export function removeAt<T>(array: T[], ...indices: number[]): T[] {
  return array.filter((_, index) => !indices.includes(index))
}

/**
 * Insert item at specific index
 */
export function insertAt<T>(array: T[], index: number, ...items: T[]): T[] {
  const result = [...array]
  result.splice(index, 0, ...items)
  return result
}
// Alias for backward compatibility
export const groupBy = groupByArray;
