/**
 * Format Utilities
 * 
 * Consolidates formatting functions for:
 * - Currency and prices
 * - Dates and times
 * - Numbers and percentages
 * - File sizes
 */

// Price and currency formatting
export function formatPrice(
  price: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const numericPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.-]/g, ''))
    : price;

  if (isNaN(numericPrice)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

// Parse price from formatted string (e.g., "$29.99" -> 29.99)
export function parsePrice(priceString: string): number {
  const cleaned = priceString.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// Compare at price formatting with strikethrough indication
export function formatComparePrice(
  price: number | string,
  compareAtPrice?: number | string
): { main: string; compare?: string; savings?: string } {
  const mainPrice = formatPrice(price);
  
  if (!compareAtPrice) {
    return { main: mainPrice };
  }

  const comparePrice = formatPrice(compareAtPrice);
  const numericPrice = parsePrice(mainPrice);
  const numericCompare = parsePrice(comparePrice);
  const savings = numericCompare - numericPrice;

  return {
    main: mainPrice,
    compare: comparePrice,
    savings: savings > 0 ? formatPrice(savings) : undefined
  };
}

// Date and time formatting
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  },
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

export function formatRelativeTime(
  date: Date | string | number,
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  
  // Convert to appropriate unit
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (diffDay > 0) return rtf.format(-diffDay, 'day');
  if (diffHour > 0) return rtf.format(-diffHour, 'hour');
  if (diffMin > 0) return rtf.format(-diffMin, 'minute');
  return rtf.format(-diffSec, 'second');
}

// Time formatting for countdown
export function formatTimeUnit(value: number, padZeros: boolean = true): string {
  if (padZeros) {
    return value.toString().padStart(2, '0');
  }
  return value.toString();
}

export function formatCountdown(timeLeft: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}): {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
} {
  return {
    days: formatTimeUnit(timeLeft.days, false),
    hours: formatTimeUnit(timeLeft.hours),
    minutes: formatTimeUnit(timeLeft.minutes),
    seconds: formatTimeUnit(timeLeft.seconds)
  };
}

// Number formatting
export function formatNumber(
  num: number,
  options: Intl.NumberFormatOptions = {},
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

export function formatPercentage(
  value: number,
  decimals: number = 0,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

// File size formatting
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Duration formatting (for videos, audio, etc.)
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${formatTimeUnit(minutes)}:${formatTimeUnit(remainingSeconds)}`;
  }
  
  return `${minutes}:${formatTimeUnit(remainingSeconds)}`;
}

// Phone number formatting
export function formatPhoneNumber(phone: string, countryCode: string = 'US'): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format for US numbers
  if (countryCode === 'US' && cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Return as-is for other formats
  return phone;
} 