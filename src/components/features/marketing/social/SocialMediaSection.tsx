/**
 * Social Media Section - Optimized Performance & Clean Design
 * 🎀 PERFORMANCE FIX: Reduced DOM elements from 12 to 6
 * Applied new design system and container pattern
 */

"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import { TikTokIcon } from "@/components/icons/TikTok"
import { useSimpleI18n } from "@/hooks"
import { useLocale } from "@/hooks/i18n/useLocale"
import { GlassContainer } from "@/components/layout/GlassContainer"
import { SectionHeader } from "@/components/layout/SectionHeader"  
import { SectionCTA } from "@/components/layout/SectionCTA"
import { designTokens } from "@/lib/design-system/tokens-2025"

interface SocialMediaSectionProps {
  className?: string
}

interface SocialPost {
  id: number
  caption: string
  likes: number | string
  comments?: number
  views?: string
}

const SocialMediaSectionComponent = ({ className }: SocialMediaSectionProps) => {
  const { t } = useSimpleI18n()
  const { locale } = useLocale()
  const [activeTab, setActiveTab] = useState<'instagram' | 'tiktok'>('instagram')

  // Simplified post data (removed base64 images for performance)
  const instagramPosts: SocialPost[] = [
    {
      id: 1,
      caption: "Styling my Indecisive hat today! 💕 #indecisive_wear",
      likes: 423,
      comments: 32,
    },
    {
      id: 2,
      caption: "Can't decide what to wear... perfect brand for me! 😎 #indecisive_wear",
      likes: 567,
      comments: 42,
    },
    {
      id: 3,
      caption: "OOTD featuring my fave Indecisive piece! ✨ #indecisive_wear",
      likes: 789,
      comments: 57,
    },
    {
      id: 4,
      caption: "Love the quality and style! 💖 #indecisive_wear",
      likes: 632,
      comments: 48,
    },
  ]

  const tiktokPosts: SocialPost[] = [
    {
      id: 1,
      caption: "When you can't decide... get everything! #indecisive_wear",
      views: "124K",
      likes: "32K",
    },
    {
      id: 2,
      caption: "GRWM with Indecisive Wear! #indecisive_wear #ootd",
      views: "254K",
      likes: "86K",
    },
    {
      id: 3,
      caption: "This brand gets me! #indecisive_wear #mood",
      views: "98K",
      likes: "28K",
    },
    {
      id: 4,
      caption: "Streetwear vibes! 🔥 #indecisive_wear #streetstyle",
      views: "187K",
      likes: "53K",
    },
  ]

  const currentPosts = activeTab === 'instagram' ? instagramPosts : tiktokPosts

  const handleFollowUs = () => {
    const url = activeTab === 'instagram' 
      ? 'https://instagram.com/indecisive_wear' 
      : 'https://tiktok.com/@indecisive_wear'
    window.open(url, '_blank')
  }

  return (
    <div className={cn("w-full", className)}>
      {/* All-in-one Container matching FeaturedProducts style */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5 rounded-2xl" />
        <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)]">
          
          {/* Header inside container with marquee headline */}
          <div className="mb-4 space-y-3">
            {/* Animated Section Headline Marquee */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-pink-500/5 via-pink-400/10 to-pink-500/5 border border-pink-200/30">
              <SectionMarquee 
                primaryText={t('social.title')}
                secondaryText={locale === 'bg' ? 'Последвай ни за нови продукти' : 'Follow us for new products'}
                speed={35}
              />
            </div>
            
            {/* Clean Tab Navigation */}
            <div className="flex justify-center">
              <div 
                className="grid grid-cols-2 bg-white border border-gray-200 shadow-sm rounded-lg p-1 w-48"
                role="tablist"
                aria-label="Social media platform selection"
              >
              <button
                onClick={() => setActiveTab('instagram')}
                role="tab"
                aria-selected={activeTab === 'instagram'}
                className={cn(
                  "text-xs font-medium rounded-lg px-3 py-2 transition-colors duration-150 flex items-center justify-center",
                  activeTab === 'instagram' 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Instagram className="mr-1 h-3 w-3" />
                Instagram
              </button>
              <button
                onClick={() => setActiveTab('tiktok')}
                role="tab"
                aria-selected={activeTab === 'tiktok'}
                className={cn(
                  "text-xs font-medium rounded-lg px-3 py-2 transition-colors duration-150 flex items-center justify-center",
                  activeTab === 'tiktok' 
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <TikTokIcon className="mr-1 h-3 w-3" />
                TikTok
              </button>
              </div>
            </div>
          </div>
          
          {/* Scrollable Social Feed - Horizontal carousel like other sections */}
          <div className="overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory" style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}>
            <div className="flex gap-3 sm:gap-4 pb-2 min-w-full">
              {[...currentPosts, ...currentPosts.slice(0, 2)].map((post, index) => (
                <div
                  key={`${activeTab}-${post.id}-${index}`}
                  className="group relative flex-none w-40 sm:w-44 snap-start"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div className={cn(
                    "rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",
                    activeTab === 'instagram' ? 'bg-white border border-gray-100' : 'bg-black'
                  )}>
                    {/* Compact image */}
                    <div className="aspect-square relative bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
                      <div className="text-3xl">
                        {activeTab === 'instagram' ? '📸' : '🎵'}
                      </div>
                    </div>
                    
                    {/* Compact content */}
                    <div className={cn(
                      "p-2.5",
                      activeTab === 'instagram' ? 'bg-white' : 'bg-black'
                    )}>
                      <p className={cn(
                        "text-xs line-clamp-2 mb-2 leading-snug",
                        activeTab === 'instagram' ? 'text-gray-800' : 'text-white'
                      )}>
                        {post.caption}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        {post.likes && (
                          <span className={cn(
                            "flex items-center gap-1",
                            activeTab === 'instagram' ? 'text-gray-600' : 'text-gray-300'
                          )}>
                            ❤️ {post.likes}
                          </span>
                        )}
                        {post.comments && (
                          <span className={cn(
                            "flex items-center gap-1",
                            activeTab === 'instagram' ? 'text-gray-600' : 'text-gray-300'
                          )}>
                            💬 {post.comments}
                          </span>
                        )}
                        {post.views && (
                          <span className={cn(
                            "flex items-center gap-1",
                            activeTab === 'instagram' ? 'text-gray-600' : 'text-gray-300'
                          )}>
                            👁️ {post.views}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile-Optimized CTA */}
          <div className="flex flex-col items-center gap-3 mt-4 pt-4 border-t border-pink-200/30">
            <p className="text-sm text-gray-500 text-center">
              1000+ followers
            </p>
            <Button 
              onClick={handleFollowUs}
              className="h-11 px-6 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-lg shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-medium transition-all"
            >
              {activeTab === 'instagram' ? <Instagram className="h-4 w-4" /> : <TikTokIcon className="h-4 w-4" />}
              Follow on {activeTab === 'instagram' ? 'Instagram' : 'TikTok'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Global scrollbar styles and mobile optimizations */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Mobile touch optimization */
        @media (max-width: 768px) {
          .scrollbar-hide {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
        }
        
        /* GPU acceleration for smooth scrolling */
        .scrollbar-hide,
        .scrollbar-hide > * {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        /* Prevent horizontal viewport overflow */
        body, html {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}

// Section Headline Marquee Component
interface SectionMarqueeProps {
  primaryText: string
  secondaryText: string
  speed?: number
}

const SectionMarquee = React.memo(({ primaryText, secondaryText, speed = 25 }: SectionMarqueeProps) => {
  // Create alternating content pattern
  const marqueeContent = Array(3).fill(null).map((_, index) => (
    <div key={index} className="flex items-center shrink-0">
      {/* Primary text (title) */}
      <span className="font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
        {primaryText}
      </span>
      
      {/* Separator */}
      <span className="mx-3 sm:mx-4 text-pink-400/60 text-sm">
        ★
      </span>
      
      {/* Secondary text (description) */}
      <span className="font-medium text-sm sm:text-base text-gray-600/80 whitespace-nowrap">
        {secondaryText}
      </span>
      
      {/* Separator */}
      <span className="mx-3 sm:mx-4 text-pink-400/60 text-sm">
        ★
      </span>
    </div>
  ))

  return (
    <div className="w-full overflow-hidden py-5 sm:py-6">
      <div className="flex items-center w-full">
        <div 
          className="flex items-center animate-section-marquee will-change-transform"
          style={{
            animationDuration: `${speed}s`
          }}
        >
          {/* First set */}
          {marqueeContent}
          {/* Duplicate set for seamless loop */}
          {marqueeContent}
        </div>
      </div>
      
      {/* CSS Animation - GPU accelerated */}
      <style jsx>{`
        @keyframes section-marquee {
          0% { 
            transform: translateX(0%) translateZ(0); 
          }
          100% { 
            transform: translateX(-50%) translateZ(0); 
          }
        }
        
        .animate-section-marquee {
          animation: section-marquee linear infinite;
        }
      `}</style>
    </div>
  )
})

SectionMarquee.displayName = 'SectionMarquee'

export const SocialMediaSection = React.memo(SocialMediaSectionComponent)