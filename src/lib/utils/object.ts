/**
 * Object Utilities
 * 
 * Consolidates object manipulation functions:
 * - Deep cloning and merging
 * - Property access and modification
 * - Object transformation
 */

// Deep clone utility
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
}

// Deep merge utility
export function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  
  const source = sources.shift();
  if (!source) return target;
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key] as object, source[key] as object);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  
  return deepMerge(target, ...sources);
}

export function isObject(item: unknown): item is object {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

// Get nested property value
export function getNestedValue<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key] as Record<string, unknown>;
    } else {
      return defaultValue;
    }
  }
  
  return current as T;
}

// Set nested property value
export function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): void {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  if (!lastKey) return;
  
  let current = obj;
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  
  current[lastKey] = value;
}

// Remove properties from object
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

// Pick properties from object
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

// Check if object is empty
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

// Get object keys with type safety
export function getKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

// Get object values with type safety
export function getValues<T extends object>(obj: T): Array<T[keyof T]> {
  return Object.values(obj);
}

// Get object entries with type safety
export function getEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

// Transform object keys
export function transformKeys<T extends Record<string, unknown>>(
  obj: T,
  transformer: (key: string) => string
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    result[transformer(key)] = value as T[keyof T];
  }
  
  return result;
}

// Transform object values
export function transformValues<T extends Record<string, unknown>, U>(
  obj: T,
  transformer: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  
  for (const [key, value] of Object.entries(obj)) {
    result[key as keyof T] = transformer(value as T[keyof T], key as keyof T);
  }
  
  return result;
}

// Filter object by predicate
export function filterObject<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (predicate(value as T[keyof T], key as keyof T)) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  
  return result;
}

// Flatten nested object
export function flatten(
  obj: Record<string, unknown>,
  separator: string = '.',
  prefix: string = ''
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}${separator}${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value as Record<string, unknown>, separator, newKey));
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}

// Unflatten object
export function unflatten(
  obj: Record<string, unknown>,
  separator: string = '.'
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    setNestedValue(result, key.replace(new RegExp(`\\${separator}`, 'g'), '.'), value);
  }
  
  return result;
}

// Compare objects for equality
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return obj1 === obj2;
  
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object') return false;
  
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => isEqual(item, obj2[index]));
  }
  
  const obj1Record = obj1 as Record<string, unknown>;
  const obj2Record = obj2 as Record<string, unknown>;
  
  const keys1 = Object.keys(obj1Record);
  const keys2 = Object.keys(obj2Record);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => 
    keys2.includes(key) && isEqual(obj1Record[key], obj2Record[key])
  );
}

// Create object from entries
export function fromEntries<T>(entries: Array<[string, T]>): Record<string, T> {
  return Object.fromEntries(entries);
}

// Invert object (swap keys and values)
export function invert(obj: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    result[String(value)] = key;
  }
  
  return result;
}

// Group objects by property
export function groupBy<T>(
  array: T[],
  keyGetter: (item: T) => string
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  
  array.forEach(item => {
    const key = keyGetter(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  });
  
  return result;
}

// Create object with default values
export function defaults<T extends Record<string, unknown>>(
  obj: Partial<T>,
  defaultValues: T
): T {
  return { ...defaultValues, ...obj };
}

// Remove undefined/null values from object
export function compactObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return filterObject(obj, (value) => value !== undefined && value !== null);
}

// Aliases for backward compatibility
export const hasProperty = (obj: object, path: string): boolean => {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return false;
    }
    
    if (!(key in (current as Record<string, unknown>))) {
      return false;
    }
    
    current = (current as Record<string, unknown>)[key];
  }
  
  return true;
};

export const getProperty = getNestedValue;
export const setProperty = setNestedValue;

export const deleteProperty = (obj: Record<string, unknown>, path: string): void => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  if (!lastKey) return;
  
  let current = obj;
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      return;
    }
    current = current[key] as Record<string, unknown>;
  }
  
  delete current[lastKey];
}; 