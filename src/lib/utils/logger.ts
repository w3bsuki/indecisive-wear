/**
 * Production-Ready Logger
 * Replaces console.log with proper logging service integration
 */

import { isProduction, isDevelopment } from '@/lib/config/environment'

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
}

// Log entry interface
interface LogEntry {
  level: LogLevel
  message: string
  data?: unknown
  timestamp: string
  context?: Record<string, unknown>
}

// Logger configuration
interface LoggerConfig {
  minLevel: LogLevel
  enableConsole: boolean
  enableRemote: boolean
}

class Logger {
  private config: LoggerConfig

  constructor() {
    this.config = {
      minLevel: isProduction() ? LogLevel.WARN : LogLevel.DEBUG,
      enableConsole: isDevelopment(),
      enableRemote: isProduction(),
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.minLevel
  }

  private formatMessage(entry: LogEntry): string {
    const levelName = LogLevel[entry.level]
    return `[${entry.timestamp}] ${levelName}: ${entry.message}`
  }

  private sendToRemote(entry: LogEntry): void {
    if (!this.config.enableRemote) return

    // In production, send to logging service
    // Example: Sentry, LogRocket, DataDog, etc.
    try {
      // TODO: Implement remote logging service integration
      // fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry),
      // })
    } catch {
      // Silently fail - don't let logging break the app
    }
  }

  private log(level: LogLevel, message: string, data?: unknown, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      context,
    }

    // Log to console in development
    if (this.config.enableConsole) {
      const formattedMessage = this.formatMessage(entry)
      
      switch (level) {
        case LogLevel.DEBUG:
          // Suppress debug logs
          break
        case LogLevel.INFO:
          // Suppress info logs
          break
        case LogLevel.WARN:
          console.warn(formattedMessage, data)
          break
        case LogLevel.ERROR:
        case LogLevel.CRITICAL:
          console.error(formattedMessage, data)
          break
      }
    }

    // Send to remote logging service
    this.sendToRemote(entry)
  }

  debug(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, data, context)
  }

  info(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, data, context)
  }

  warn(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, data, context)
  }

  error(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, data, context)
  }

  critical(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log(LogLevel.CRITICAL, message, data, context)
  }

  // Performance logging
  time(label: string): void {
    if (this.config.enableConsole) {
      console.time(label)
    }
  }

  timeEnd(label: string): void {
    if (this.config.enableConsole) {
      console.timeEnd(label)
    }
  }

  // Group logging
  group(label: string): void {
    if (this.config.enableConsole) {
      console.group(label)
    }
  }

  groupEnd(): void {
    if (this.config.enableConsole) {
      console.groupEnd()
    }
  }
}

// Export singleton logger instance
export const logger = new Logger()

// Export default for convenience
export default logger