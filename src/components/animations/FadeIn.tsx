/**
 * FadeIn Animation Component
 * 
 * Consolidates fade-in animations used throughout the codebase
 */

import React from 'react';
import { motion } from 'framer-motion';
import type { AnimationProps } from '@/lib/types/ui';

interface FadeInProps extends AnimationProps {
  children: React.ReactNode;
  className?: string;
  /** Whether animation should trigger only once when in viewport */
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  duration = 0.5,
  delay = 0,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
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