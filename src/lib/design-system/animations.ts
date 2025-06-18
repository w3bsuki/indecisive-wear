/**
 * Animation Utilities
 * 
 * Performant, smooth animations using Framer Motion
 * Consistent with our design system
 */

import { Variants } from 'framer-motion'
import { tokens } from './tokens'

// Animation presets
export const animations = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  
  scaleBounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.3 },
    transition: { type: 'spring', stiffness: 500, damping: 25 },
  },
  
  // Slide animations
  slideInFromRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  
  slideInFromLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  
  slideInFromBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  
  // Rotate animations
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// Stagger animations for lists
export const staggerAnimations = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
}

// Page transition variants
export const pageTransitions: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Hover animations
export const hoverAnimations = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 },
  },
  
  lift: {
    whileHover: { y: -4, shadow: 'lg' },
    whileTap: { y: 0 },
    transition: { duration: 0.2 },
  },
  
  glow: {
    whileHover: { 
      boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
      borderColor: 'rgba(236, 72, 153, 0.5)',
    },
    transition: { duration: 0.3 },
  },
}

// Loading animations
export const loadingAnimations = {
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },
  
  pulse: {
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
  
  bounce: {
    animate: { y: [0, -20, 0] },
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
  },

  // Skeleton shimmer effect
  shimmer: {
    animate: {
      x: [-100, 100],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: 'linear',
      },
    },
    style: {
      willChange: 'transform',
    },
  },

  // Pink-themed loading states
  pinkPulse: {
    animate: { 
      backgroundColor: ['#fce7f3', '#fbcfe8', '#fce7f3'],
      opacity: [0.5, 1, 0.5] 
    },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

// Scroll-triggered animations
export const scrollAnimations = {
  fadeInOnScroll: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  
  scaleOnScroll: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// Mobile gesture animations
export const gestureAnimations = {
  swipeLeft: {
    drag: 'x',
    dragConstraints: { left: -100, right: 0 },
    dragElastic: 0.2,
    onDragEnd: (event: any, info: any) => {
      if (info.offset.x < -50) {
        // Handle swipe left action
      }
    },
  },
  
  swipeRight: {
    drag: 'x',
    dragConstraints: { left: 0, right: 100 },
    dragElastic: 0.2,
    onDragEnd: (event: any, info: any) => {
      if (info.offset.x > 50) {
        // Handle swipe right action
      }
    },
  },
  
  tap: {
    whileTap: { scale: 0.95 },
    transition: { duration: 0.1 },
  },
}

// Animation timing functions
export const easings = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: 'spring', stiffness: 300, damping: 25 },
  bounce: { type: 'spring', stiffness: 500, damping: 15 },
}

// Utility function to create custom animations
export function createAnimation(
  from: Record<string, any>,
  to: Record<string, any>,
  options: {
    duration?: number
    ease?: keyof typeof easings | number[]
    delay?: number
    repeat?: number
  } = {}
) {
  const { duration = 0.3, ease = 'easeOut', delay = 0, repeat = 0 } = options
  
  return {
    initial: from,
    animate: to,
    transition: {
      duration,
      ease: typeof ease === 'string' ? easings[ease] : ease,
      delay,
      repeat,
    },
  }
}

// Performance optimization wrapper
export const optimizedAnimation = (animation: any) => ({
  ...animation,
  transition: {
    ...animation.transition,
    useNativeDriver: true, // For React Native compatibility
  },
  style: {
    willChange: 'transform, opacity',
  },
})

// Reduced motion support
export const reducedMotion = {
  initial: false,
  animate: true,
  exit: false,
  transition: { duration: 0 },
}

// Check for reduced motion preference
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Optimized carousel animations
export const carouselAnimations = {
  // High-performance infinite scroll
  infiniteScroll: (itemWidth: number, itemCount: number) => ({
    animate: {
      x: [0, -(itemWidth * itemCount)],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 40, // Smooth 40s duration
          ease: "linear",
        },
      },
    },
    style: {
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
      transform: 'translateZ(0)', // Force GPU layer
    },
  }),

  // Mobile-optimized swipe
  swipeCarousel: {
    drag: 'x',
    dragConstraints: { left: -400, right: 0 },
    dragElastic: 0.1,
    dragMomentum: false,
    style: {
      willChange: 'transform',
      touchAction: 'pan-y pinch-zoom',
    },
  },

  // Fade transitions between slides
  slideTransition: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
    style: {
      willChange: 'transform, opacity',
    },
  },

  // Hover pause effect
  hoverPause: {
    whileHover: { animationPlayState: 'paused' },
    transition: { duration: 0.2 },
  },
}