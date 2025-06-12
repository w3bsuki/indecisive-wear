"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram } from 'lucide-react'
import { TikTokIcon } from "@/components/icons/TikTok"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSimpleI18n } from "@/hooks/i18n/useSimpleI18n"
import { useLocale } from "@/hooks/i18n/useLocale"
import { BrandMarquee } from "@/components/features/marketing/BrandMarquee"

// Type definitions
type TranslationFunction = (key: string, params?: Record<string, string | number>) => string

// Simple footer links - only real pages that exist
const getFooterLinks = (t: TranslationFunction, locale: string) => [
  { name: locale === 'bg' ? 'Магазин' : 'Shop', href: "/shop" },
  { name: t('footer.privacy'), href: "/privacy" },
  { name: t('footer.terms'), href: "/terms" },
  { name: t('footer.returns'), href: "/returns" },
]

const FooterComponent = () => {
  const { t } = useSimpleI18n()
  const { locale } = useLocale()
  const footerLinks = getFooterLinks(t, locale)

  return (
    <footer className="relative">
      {/* All-in-one Container matching other sections */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5 rounded-2xl" />
        <div className="relative bg-white/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-3xl border border-pink-200/30 shadow-[0_0_30px_rgba(236,72,153,0.12)]">
          
          {/* Brand Marquee at the top of footer container */}
          <div className={cn(
            "bg-white/80 backdrop-blur-sm",
            "border border-pink-200/30",
            "rounded-xl overflow-hidden mb-4 sm:mb-6"
          )}>
            <BrandMarquee 
              text="INDECISIVE WEAR" 
              speed={40}
              textColor="text-pink-500"
              separatorColor="text-black"
              className="py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-black"
            />
          </div>

          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4 sm:mb-6"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
              {locale === 'bg' ? (
                <>
                  <span className="text-gray-700">Присъедини се към </span>
                  <span className={cn(
                    "inline-block px-4 py-1 sm:px-5 sm:py-2",
                    "bg-gradient-to-r from-pink-600 to-pink-400",
                    "rounded-lg text-white transform -skew-x-3",
                    "shadow-md shadow-pink-500/20",
                    "text-lg sm:text-xl"
                  )}>
                    INDECISIVE
                  </span>
                  <span className="text-gray-700"> клуб</span>
                </>
              ) : (
                <>
                  <span className="text-gray-700">Join the </span>
                  <span className={cn(
                    "inline-block px-4 py-1 sm:px-5 sm:py-2",
                    "bg-gradient-to-r from-pink-600 to-pink-400",
                    "rounded-lg text-white transform -skew-x-3",
                    "shadow-md shadow-pink-500/20",
                    "text-lg sm:text-xl"
                  )}>
                    INDECISIVE
                  </span>
                  <span className="text-gray-700"> Club</span>
                </>
              )}
            </h2>
            <p className="text-sm text-gray-600 mb-4 sm:mb-5 max-w-sm mx-auto">
              {locale === 'bg' 
                ? 'Абонирай се за ексклузивни оферти и нови продукти'
                : 'Subscribe for exclusive offers and new products'
              }
            </p>
            
            {/* Newsletter Form - Mobile-perfect */}
            <form 
              className="flex flex-col gap-2 max-w-xs mx-auto mb-4 sm:mb-5" 
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder={locale === 'bg' ? 'твоя@имейл.com' : 'your@email.com'}
                className={cn(
                  "w-full bg-white border-2 border-pink-200/50",
                  "focus:border-pink-500 focus:ring-pink-500/20",
                  "rounded-xl h-10 text-sm"
                )}
              />
              <Button 
                type="submit"
                className={cn(
                  "w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold",
                  "border-2 border-white/30 hover:border-white/50",
                  "h-10 px-4 rounded-xl text-sm",
                  "shadow-lg hover:shadow-xl transition-all duration-200"
                )}
              >
                {locale === 'bg' ? 'Абонирай се' : 'Subscribe'}
              </Button>
            </form>

            {/* Social Icons - Mobile-perfect */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => window.open('https://www.instagram.com/indecisive_wear/', '_blank')}
                className={cn(
                  "flex items-center justify-center w-10 h-10",
                  "bg-gradient-to-r from-pink-500/10 to-purple-500/10",
                  "border border-pink-200/50 rounded-xl",
                  "hover:border-pink-300 hover:bg-pink-50/50",
                  "transition-all duration-200 group",
                  "active:scale-95"
                )}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-600 group-hover:text-pink-700 transition-colors" />
              </button>
              <button
                type="button"
                onClick={() => window.open('https://www.tiktok.com/@indecisive.wear', '_blank')}
                className={cn(
                  "flex items-center justify-center w-10 h-10",
                  "bg-gradient-to-r from-gray-500/10 to-gray-600/10",
                  "border border-gray-200/50 rounded-xl",
                  "hover:border-gray-300 hover:bg-gray-50/50",
                  "transition-all duration-200 group",
                  "active:scale-95"
                )}
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="w-4 h-4 text-gray-700 group-hover:text-black transition-colors" />
              </button>
            </div>
          </motion.div>

          {/* Quick Links - Mobile-Perfect Single Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <div className={cn(
              "bg-gradient-to-r from-pink-50/50 to-purple-50/50",
              "border border-pink-200/40 rounded-2xl p-3"
            )}>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {footerLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <Link 
                      href={link.href}
                      className={cn(
                        "text-sm sm:text-base font-medium",
                        "text-gray-700 hover:text-pink-600",
                        "transition-colors duration-200",
                        "min-h-[44px] flex items-center px-2"
                      )}
                    >
                      {link.name}
                    </Link>
                    {index < footerLinks.length - 1 && (
                      <span className="text-pink-400/60 text-sm">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Copyright & Brand Love */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-gray-600 space-y-2"
          >
            <p>
              © {new Date().getFullYear()} Indecisive Wear. {locale === 'bg' ? 'Всички права запазени.' : 'All rights reserved.'}
            </p>
            <p className="text-xs text-pink-500 font-medium">
              {locale === 'bg' 
                ? 'Не можете да се решите? Перфектно. Вие сте на правилното място! 💜'
                : "Can't decide? Perfect. You're in the right place! 💜"
              }
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterComponent) 