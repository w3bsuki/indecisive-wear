/**
 * XSS Protection Utilities
 * 
 * Provides sanitization and validation for user input to prevent XSS attacks
 * Used across all form inputs and user-generated content
 */

// Basic HTML entity encoding for XSS prevention
const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

/**
 * Sanitize string by encoding HTML entities
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input.replace(/[&<>"'`=\/]/g, (char) => htmlEntities[char] || char)
}

/**
 * Sanitize and limit string length
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return ''
  
  // Remove null bytes and control characters
  const cleaned = input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength)
  
  return sanitizeHtml(cleaned)
}

/**
 * Validate and sanitize email input
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return ''
  
  // Basic email sanitization
  const cleaned = email
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, '') // Only allow word chars, @, dots, hyphens
    .slice(0, 254) // RFC 5321 email length limit
  
  return cleaned
}

/**
 * Validate and sanitize name input
 */
export function sanitizeName(name: string): string {
  if (typeof name !== 'string') return ''
  
  // Allow letters, spaces, hyphens, apostrophes only
  const cleaned = name
    .trim()
    .replace(/[^a-zA-Z\s'-]/g, '')
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .slice(0, 50)
  
  return cleaned
}

/**
 * Validate and sanitize URL input
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return ''
  
  const cleaned = url.trim()
  
  // Only allow safe URL schemes
  const allowedSchemes = ['http:', 'https:', 'mailto:']
  
  try {
    const urlObj = new URL(cleaned)
    
    if (!allowedSchemes.includes(urlObj.protocol)) {
      return ''
    }
    
    return urlObj.toString()
  } catch {
    return ''
  }
}

/**
 * Sanitize social media handle
 */
export function sanitizeSocialHandle(handle: string): string {
  if (typeof handle !== 'string') return ''
  
  // Remove @ prefix if present, allow only alphanumeric, dots, underscores
  const cleaned = handle
    .replace(/^@/, '')
    .replace(/[^a-zA-Z0-9._]/g, '')
    .slice(0, 30)
  
  return cleaned
}

/**
 * Validate and sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  if (typeof query !== 'string') return ''
  
  // Remove harmful patterns while preserving useful search terms
  const cleaned = query
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .slice(0, 200)
  
  return cleaned
}

/**
 * Sanitize general text input
 */
export function sanitizeText(text: string, maxLength: number = 500): string {
  if (typeof text !== 'string') return ''
  
  // Remove dangerous patterns while preserving text formatting
  const cleaned = text
    .trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Control chars
    .replace(/<script[\s\S]*?<\/script>/gi, '') // Script tags
    .replace(/javascript:/gi, '') // JavaScript protocol
    .replace(/data:/gi, '') // Data protocol
    .replace(/vbscript:/gi, '') // VBScript protocol
    .slice(0, maxLength)
  
  return cleaned
}

/**
 * Validate referral code format
 */
export function sanitizeReferralCode(code: string): string {
  if (typeof code !== 'string') return ''
  
  // Only uppercase letters and numbers
  const cleaned = code
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 20)
  
  return cleaned
}

/**
 * Content Security Policy violation reporter
 */
export function reportCSPViolation(violationEvent: SecurityPolicyViolationEvent): void {
  // Log CSP violations for monitoring
  console.warn('CSP Violation:', {
    blockedURI: violationEvent.blockedURI,
    violatedDirective: violationEvent.violatedDirective,
    sourceFile: violationEvent.sourceFile,
    lineNumber: violationEvent.lineNumber,
    timestamp: new Date().toISOString(),
  })
  
  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to error monitoring service (Sentry, etc.)
  }
}

/**
 * Detect potential XSS patterns in input
 */
export function detectXSSPatterns(input: string): boolean {
  if (typeof input !== 'string') return false
  
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /data:text\/html/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<form/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
  ]
  
  return xssPatterns.some(pattern => pattern.test(input))
}

/**
 * Safe input transformation for React props
 */
export function safeInputProps(props: Record<string, unknown>): Record<string, unknown> {
  const safeProps: Record<string, unknown> = {}
  
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'string') {
      // Sanitize string values
      safeProps[key] = sanitizeString(value)
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      // Numbers and booleans are safe
      safeProps[key] = value
    } else if (value === null || value === undefined) {
      // Null/undefined are safe
      safeProps[key] = value
    }
    // Skip other types (objects, functions, etc.)
  })
  
  return safeProps
}