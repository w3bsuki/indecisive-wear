"use client"

import { Instagram } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LinkPreview } from "@/components/ui/link-preview"
import { TikTokIcon } from "@/components/icons/TikTok"

export function SocialIcons({ className, size = "default" }: { className?: string; size?: "default" | "small" | "sm" | "xs" }) {
  const iconSizes = {
    default: {
      button: "w-14 h-14",
      icon: "24",
      tiktokClass: "h-5 w-5"
    },
    small: {
      button: "w-10 h-10",
      icon: "18",
      tiktokClass: "h-4 w-4"
    },
    sm: {
      button: "w-9 h-9",
      icon: "16",
      tiktokClass: "h-4 w-4"
    },
    xs: {
      button: "w-8 h-8",
      icon: "14",
      tiktokClass: "h-3.5 w-3.5"
    }
  }

  const sizes = iconSizes[size] || iconSizes.default

  return (
    <div className={cn(
      "inline-flex flex-wrap justify-center",
      size === "xs" || size === "sm" ? "gap-1.5" : "gap-2 sm:gap-3",
      className
    )}>
      <LinkPreview url="https://www.instagram.com/indecisive_wear?igsh=MWdycWxlZm0xbTJzcQ==">
        <Button
          variant="outline"
          aria-label="Follow us on Instagram"
          size={size === "xs" || size === "sm" ? "sm" : "lg"}
          className={cn(
            sizes.button,
            "rounded-full border border-pink-500/50 text-white",
            "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500",
            "hover:opacity-90 hover:border-pink-500 hover:scale-105 transition-all duration-200",
            "shadow-sm hover:shadow-md touch-manipulation active:scale-95",
            "transform-gpu"
          )}
          onClick={() => window.open("https://www.instagram.com/indecisive_wear?igsh=MWdycWxlZm0xbTJzcQ==", "_blank")}
        >
          <Instagram size={sizes.icon} aria-hidden="true" strokeWidth={1.5} />
        </Button>
      </LinkPreview>

      <LinkPreview url="https://www.tiktok.com/@indecisive.wear?_t=ZN-8wGWFTNYoBa&_r=1">
        <Button
          variant="outline"
          aria-label="Follow us on TikTok"
          size={size === "xs" || size === "sm" ? "sm" : "lg"}
          className={cn(
            sizes.button,
            "rounded-full border border-pink-500/50 text-white",
            "bg-black hover:bg-gray-900",
            "hover:border-pink-500 hover:scale-105 transition-all duration-200",
            "shadow-sm hover:shadow-md touch-manipulation active:scale-95",
            "transform-gpu"
          )}
          onClick={() => window.open("https://www.tiktok.com/@indecisive.wear?_t=ZN-8wGWFTNYoBa&_r=1", "_blank")}
        >
          <TikTokIcon aria-hidden="true" className={sizes.tiktokClass} />
        </Button>
      </LinkPreview>

      <LinkPreview url="https://discord.com">
        <Button
          variant="outline"
          aria-label="Join our Community"
          size={size === "xs" || size === "sm" ? "sm" : "lg"}
          className={cn(
            sizes.button,
            "rounded-full bg-white/80 border border-pink-500/50 text-purple-600",
            "hover:bg-white hover:border-pink-500 hover:text-purple-700 hover:scale-105",
            "transition-all duration-200 shadow-sm hover:shadow-md",
            "touch-manipulation active:scale-95 transform-gpu"
          )}
          onClick={() => window.open("https://discord.com", "_blank")}
        >
          <MessageCircle size={sizes.icon} aria-hidden="true" strokeWidth={1.5} />
        </Button>
      </LinkPreview>
    </div>
  )
}
