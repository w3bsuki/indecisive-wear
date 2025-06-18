"use client"

import { useState, useRef, useEffect } from "react"
import { SectionHeader } from "@/components/shared/section-header"
import { InstagramPost } from "./InstagramPost"
import { Grid } from "@/components/ui/grid"
import { Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CommunitySectionProps {
  className?: string;
}

export function CommunitySection({ className }: CommunitySectionProps) {
  const [activePost, setActivePost] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle scroll to update active post
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const postWidth = scrollContainer.clientWidth;
      const newActivePost = Math.round(scrollLeft / postWidth);
      setActivePost(newActivePost);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample community posts
  const communityPosts = [
    {
      image: "/images/hat-daddy-chill.png",
      username: "indecisive_fans",
      location: "New York, USA",
      caption: "Loving my new Daddy Chill hat from @indecisive_wear 🔥 #StyleStatement #OOTD",
      likes: 243,
      timeAgo: "2 hours ago",
      liked: false,
    },
    {
      image: "/images/hat-no-money.png",
      username: "fashion_style_",
      location: "Miami, FL",
      caption: "This \"No Money No Honey\" cap from @indecisive_wear is a whole vibe 💯 #FashionStatement #HatLover",
      likes: 587,
      timeAgo: "5 hours ago",
      liked: true,
    },
    {
      image: "/images/hat-indecisive-purple.png",
      username: "street_notes",
      location: "Los Angeles, CA",
      caption: "The Indecisive Club purple hat is my new everyday essential 💜 @indecisive_wear #StreetStyle #HeadwearGoals",
      likes: 1203,
      timeAgo: "1 day ago",
      liked: false,
    },
  ];

  return (
    <section id="community" className={cn("relative py-10 md:py-16 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden", className)}>
      {/* Community marquee headline */}
      <SectionHeader
        title="JOIN THE COMMUNITY"
        speed={30}
        textColor="text-black/80"
        separatorColor="text-pink-500"
        textShadow="0 2px 10px rgba(236,72,153,0.3)"
        className="mb-8"
      >
        {/* Add a subtle glow under the marquee */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-3 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent blur-xl" />
      </SectionHeader>

      {/* Instagram-style community content */}
      <div className="px-4 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Instagram className="h-5 w-5 text-pink-600" />
          <h2 className="text-xl font-semibold text-black">Latest from our community</h2>
        </div>
        
        {/* Mobile Swipe View */}
        <div className="block md:hidden w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-4 scroll-smooth"
          >
            {communityPosts.map((post) => (
              <div key={`post-${post.username}-${post.timeAgo}`} className="w-[calc(100vw-2rem)] flex-none snap-center px-2 first:pl-0 last:pr-0">
                <InstagramPost
                  image={post.image}
                  username={post.username}
                  location={post.location}
                  caption={post.caption}
                  likes={post.likes}
                  timeAgo={post.timeAgo}
                  liked={post.liked}
                  delay={0}
                />
              </div>
            ))}
          </div>
          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {communityPosts.map((post, index) => (
              <button
                type="button"
                key={`indicator-${post.username}-${post.timeAgo}`}
                onClick={() => {
                  const scrollContainer = scrollRef.current;
                  if (scrollContainer) {
                    scrollContainer.scrollTo({
                      left: index * scrollContainer.clientWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                  activePost === index 
                    ? "bg-pink-500 scale-110" 
                    : "bg-pink-500/30 hover:bg-pink-500/50"
                )}
                aria-label={`View post ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop Grid View */}
        <div className="hidden md:block">
          <Grid columns={3} gap={6} className="relative z-10">
            {communityPosts.map((post) => (
              <InstagramPost
                key={`grid-${post.username}-${post.timeAgo}`}
                image={post.image}
                username={post.username}
                location={post.location}
                caption={post.caption}
                likes={post.likes}
                timeAgo={post.timeAgo}
                liked={post.liked}
                delay={0}
              />
            ))}
          </Grid>
        </div>
        
        {/* See more community button */}
        <div className="flex justify-center mt-8">
          <motion.a
            href="https://instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(236,72,153,0.2)" }}
            className="px-8 py-3 bg-white border border-pink-500/30 text-black rounded-full font-medium text-sm tracking-wide transition-all shadow-sm hover:shadow-md hover:text-pink-600 inline-flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            See more on Instagram
          </motion.a>
        </div>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-gray-50/50" />
    </section>
  )
} 