"use client"

import { motion } from "framer-motion"
import { Heart } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import Image from "next/image"

interface InstagramPostProps {
  image: string
  username: string
  location?: string
  caption: string
  likes: number
  timeAgo: string
  liked?: boolean
  delay?: number
}

export function InstagramPost({
  image,
  username,
  location = "",
  caption,
  likes,
  timeAgo,
  liked = false,
  delay = 0
}: InstagramPostProps) {
  // Get first letter(s) for the profile icon
  const profileInitials = username
    .split('_')
    .map(word => word[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="instagram-card bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Post header */}
      <div className="p-3 flex items-center gap-2 border-b border-gray-100">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-400 flex items-center justify-center text-white font-bold text-xs">
          {profileInitials}
        </div>
        <div>
          <p className="text-sm font-medium">{username}</p>
          {location && <p className="text-xs text-gray-500">{location}</p>}
        </div>
        <button type="button" className="ml-auto text-gray-400" aria-label="More options">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
      
      {/* Post image */}
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        <Image 
          src={image} 
          alt="Community post" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          quality={90}
        />
      </div>
      
      {/* Post actions */}
      <div className="p-3 flex items-center gap-4">
        <button type="button" className={`${liked ? 'text-pink-500' : 'text-gray-800 hover:text-pink-500'} transition-colors`} aria-label="Like">
          <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
        </button>
        <button type="button" className="text-gray-800 hover:text-pink-500 transition-colors" aria-label="Comment">
          <MessageCircle className="h-6 w-6" />
        </button>
        <button type="button" className="text-gray-800 hover:text-pink-500 transition-colors ml-auto" aria-label="Save">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      
      {/* Post caption */}
      <div className="px-3 pb-3">
        <p className="text-sm">
          <span className="font-medium">{username}</span> {caption}
        </p>
        <p className="text-xs text-gray-500 mt-1">{timeAgo} • {likes.toLocaleString()} likes</p>
      </div>
    </motion.div>
  )
} 