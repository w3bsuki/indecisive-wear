/**
 * String Utilities
 * 
 * Consolidates string manipulation functions:
 * - Transformation and formatting
 * - Validation and checking
 * - Text processing
 */

// String transformation
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

// String validation
export function isEmptyString(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

export function isEmail(str: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function isNumeric(str: string): boolean {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

// String formatting
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) {
    return str;
  }
  
  return str.slice(0, length - suffix.length) + suffix;
}

export function truncateWords(str: string, wordCount: number, suffix: string = '...'): string {
  const words = str.split(' ');
  
  if (words.length <= wordCount) {
    return str;
  }
  
  return words.slice(0, wordCount).join(' ') + suffix;
}

export function padStart(str: string, length: number, char: string = ' '): string {
  return str.padStart(length, char);
}

export function padEnd(str: string, length: number, char: string = ' '): string {
  return str.padEnd(length, char);
}

// String extraction
export function extractInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function extractDomain(email: string): string {
  return email.split('@')[1] || '';
}

export function extractNumbers(str: string): string {
  return str.replace(/\D/g, '');
}

export function extractLetters(str: string): string {
  return str.replace(/[^a-zA-Z]/g, '');
}

// String comparison
export function similarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0;
  }
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  // Initialize first column
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  // Initialize first row
  for (let j = 0; j <= str1.length; j++) {
    if (matrix[0]) {
      matrix[0][j] = j;
    }
  }
  
  // Fill the matrix
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (!matrix[i]) matrix[i] = [];
      
      const prevRow = matrix[i - 1];
      const currentRow = matrix[i];
      
      if (prevRow && currentRow && str2.charAt(i - 1) === str1.charAt(j - 1)) {
        currentRow[j] = prevRow[j - 1] || 0;
      } else if (prevRow && currentRow) {
        currentRow[j] = Math.min(
          (prevRow[j - 1] || 0) + 1,
          (currentRow[j - 1] || 0) + 1,
          (prevRow[j] || 0) + 1
        );
      }
    }
  }
  
  return matrix[str2.length]?.[str1.length] || 0;
}

// String search and replace
export function highlightText(text: string, searchTerm: string, className: string = 'highlight'): string {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  return text.replace(regex, `<span class="${className}">$1</span>`);
}

export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// String generation
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateRandomString(length: number, chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Text processing
export function removeExtraSpaces(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function pluralize(word: string, count: number): string {
  if (count === 1) return word;
  
  // Simple pluralization rules
  if (word.endsWith('y')) {
    return word.slice(0, -1) + 'ies';
  }
  
  if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z')) {
    return word + 'es';
  }
  
  return word + 's';
}

// Word utilities
export function wordCount(str: string): number {
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function readingTime(str: string, wordsPerMinute: number = 200): number {
  const words = wordCount(str);
  return Math.ceil(words / wordsPerMinute);
}

// Mask sensitive information
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  
  const maskedUsername = username.length > 2 
    ? username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
    : username;
  
  return `${maskedUsername}@${domain}`;
}

export function maskPhone(phone: string): string {
  const cleaned = extractNumbers(phone);
  if (cleaned.length < 10) return phone;
  
  return `(${cleaned.slice(0, 3)}) ***-${cleaned.slice(-4)}`;
}

export function maskCreditCard(cardNumber: string): string {
  const cleaned = extractNumbers(cardNumber);
  if (cleaned.length < 13) return cardNumber;
  
  return '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
} 