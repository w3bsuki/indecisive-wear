"use client"

import { useState, useEffect, useRef } from "react"
import { SocialMediaSection } from "@/components/features/marketing/social/SocialMediaSection"
import { HeroSection } from "@/components/features/marketing/HeroSection"
import { FeaturedProducts } from "@/components/features/marketing/FeaturedProducts"
import { ComingSoonCarousel } from "@/components/features/marketing/ComingSoonCarousel"
import { cleanDesignSystem } from "@/lib/design-system/clean-tokens"
import { cn } from "@/lib/utils"

// Collection data for carousel
const collections = [
  {
    id: "summer",
    name: "Summer Collection",
    desc: "Bold and vibrant designs for the hottest days",
    image: "/images/hat-indecisive-purple.png",
    color: "purple"
  },
  {
    id: "essentials",
    name: "Essentials",
    desc: "Timeless styles for everyday wear",
    image: "/images/hat-mama-black.png",
    color: "black"
  },
  {
    id: "limited",
    name: "Limited Edition",
    desc: "Exclusive designs you won't find anywhere else",
    image: "/images/hat-mama-red.png",
    color: "pink"
  }
];

// Hat images for our enhanced HeroSection
const hatImages = [
  "/products/the indecisive club - red.jpg",
  "/products/the indecisive club purple - black font.jpg",
  "/products/the indecisive club - purple.jpg",
  "/products/nothing to wear.jpg",
  "/products/No Money No honey white.jpg",
  "/products/No money No Honey.jpg",
  "/products/MAMA-red.jpg",
  "/products/MAMA-orange.jpg",
  "/products/MAMA-black.jpg",
  "/products/Leave me alone.jpg",
  "/products/It is what it is.jpg",
  "/products/Хулиганка.jpg",
  "/products/Хулиганка-black.jpg",
  "/products/Хулиганка- green.jpg",
  "/products/do not disturb.jpg",
  "/products/Dirty Cash.jpg",
  "/products/Daddy Chill.jpg",
  "/products/Daddy Issues.jpg",
  "/products/Caffeinated and Complicated.jpg",
];

export function HomePage() {
  // State for waitlist popup and form
  const [_waitlistOpen, _setWaitlistOpen] = useState(false)
  const [_showWaitlistPrompt, _setShowWaitlistPrompt] = useState(true)
  const [_hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false)
  const [_email, _setEmail] = useState("")
  const [_isSubscribed, _setIsSubscribed] = useState(false)
  
  // State for carousel
  const [_currentSlide, _setCurrentSlide] = useState(0)
  const [autoplay, _setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  
  // Mobile detection
  const [_isMobile, setIsMobile] = useState(false)
  
  // Check if mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  
  // Handle carousel autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        _setCurrentSlide((prev) => (prev + 1) % collections.length);
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);
  
  // Handle user interaction with carousel - commented out as not used
  // const _handleSlideChange = (_index: number) => {
  //   _setCurrentSlide(_index);
  //   
  //   // Pause autoplay briefly when user interacts
  //   setAutoplay(false);
  //   if (autoplayRef.current) {
  //     clearInterval(autoplayRef.current);
  //   }
  //   
  //   // Resume autoplay after 10 seconds
  //   setTimeout(() => setAutoplay(true), 10000);
  // };
  
  // Handle waitlist submission - commented out as not used
  // const _handleSubscribe = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (email) {
  //     setIsSubscribed(true);
  //     
  //     // Simulate successful subscription
  //     setTimeout(() => {
  //       setHasJoinedWaitlist(true);
  //       setWaitlistOpen(false);
  //       setIsSubscribed(false);
  //       setEmail("");
  //       // Save in localStorage to remember user has joined
  //       localStorage.setItem("joinedWaitlist", "true");
  //     }, 1500);
  //   }
  // };
  
  // Function to scroll to coming soon section
  const scrollToProducts = () => {
    document.getElementById('coming-soon')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Check localStorage on mount to see if user already joined
  useEffect(() => {
    const hasJoined = localStorage.getItem("joinedWaitlist") === "true";
    setHasJoinedWaitlist(hasJoined);
  }, []);

  return (
    <main className={cleanDesignSystem.layouts.pageBackground.main}>
      {/* Enhanced Page Background */}
      <div className={cleanDesignSystem.layouts.pageBackground.gradient} />
      
      {/* Main Content Area */}
      <div className={cleanDesignSystem.layouts.pageBackground.content}>
        {/* Super Wide Container */}
        <div className={cleanDesignSystem.layouts.pageLayout.superWide}>
          
          {/* ONE BIG CONTAINER FOR EVERYTHING */}
          <div className={cleanDesignSystem.layouts.pageLayout.contentArea}>
            <div className={cn(
              cleanDesignSystem.layouts.pageLayout.mainContainer,
              "px-0 sm:px-4"
            )}>
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                
                {/* Hero Section - Full viewport on mobile */}
                <section className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
                  <div className="px-4 sm:px-6 md:px-8 lg:px-12">
                    <HeroSection 
                      hatImages={hatImages} 
                      scrollToProducts={scrollToProducts} 
                    />
                  </div>
                </section>

                {/* Featured Products Section */}
                <section className={cn(
                  cleanDesignSystem.layouts.pageLayout.sectionPadding,
                  "-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12"
                )}>
                  <div className="px-4 sm:px-6 md:px-8 lg:px-12">
                    <FeaturedProducts />
                  </div>
                </section>

                {/* Coming Soon Section */}
                <section 
                  id="coming-soon"
                  className={cn(
                    cleanDesignSystem.layouts.pageLayout.sectionPaddingCompact,
                    "-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12"
                  )}
                >
                  <div className="px-4 sm:px-6 md:px-8 lg:px-12">
                    <ComingSoonCarousel hatImages={hatImages} />
                  </div>
                </section>

                {/* Social Media Section */}
                <section className={cn(
                  cleanDesignSystem.layouts.pageLayout.sectionPadding,
                  "-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12"
                )}>
                  <div className="px-4 sm:px-6 md:px-8 lg:px-12">
                    <SocialMediaSection />
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}