/**
 * SlideIn Animation Component
 * 
 * Consolidates slide-in animations used throughout the codebase
 */

import React from 'react';
import { motion } from 'framer-motion';
import type { AnimationProps } from '@/lib/types/ui';

interface SlideInProps extends AnimationProps {
  children: React.ReactNode;
  className?: string;
  /** Distance to slide from (in pixels) */
  distance?: number;
  /** Whether animation should trigger only once when in viewport */
  once?: boolean;
}

const getSlideVariants = (direction: string, distance: number) => {
  const variants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  
  return variants[direction as keyof typeof variants] || variants.up;
};

export function SlideIn({
  children,
  className,
  direction = 'up',
  distance = 20,
  duration = 0.5,
  delay = 0,
  once = true,
}: SlideInProps) {
  const initialVariant = getSlideVariants(direction, distance);
  
  return (
    <motion.div
      initial={{ opacity: 0, ...initialVariant }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: duration / 1000, // Convert to seconds
        delay: delay / 1000,
        ease: "easeOut"
      }}
      viewport={{ once }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 