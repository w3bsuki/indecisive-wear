/**
 * Simple language toggle between Bulgarian and English
 */

"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLocale } from "@/hooks"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
  variant?: "default" | "compact"
}

export function LanguageToggle({ className, variant = "default" }: LanguageToggleProps) {
  const { locale, switchLocale } = useLocale()

  if (variant === "compact") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale()}
        className={cn(
          "h-9 px-3 text-sm font-medium",
          "text-pink-500 hover:text-white hover:bg-pink-500",
          "border border-pink-500/50 hover:border-pink-500",
          "transition-all duration-200",
          className
        )}
      >
        {locale.toUpperCase()}
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => switchLocale()}
      className={cn(
        "flex items-center gap-2",
        "text-pink-500 border-pink-500/50 hover:bg-pink-500 hover:text-white",
        "transition-all duration-200",
        className
      )}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {locale === 'bg' ? 'БГ' : 'EN'}
      </span>
      <span className="text-xs opacity-70">
        {locale === 'bg' ? '→ EN' : '→ БГ'}
      </span>
    </Button>
  )
}