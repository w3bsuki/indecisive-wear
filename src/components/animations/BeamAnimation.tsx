/**
 * BeamAnimation Component
 * 
 * Consolidates the repeated beam animation effect found in:
 * - components/product-focus-cards.tsx
 * - app/features/products/ProductGrid.tsx
 * - Other button components with beam effects
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface BeamAnimationProps {
  /** Whether the beam animation is active (typically on hover) */
  active?: boolean;
  /** Custom className for the beam */
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Beam color (default: white/10) */
  color?: string;
  /** Skew angle for the beam effect */
  skew?: string;
}

export function BeamAnimation({
  active = false,
  className,
  duration = 0.7,
  delay = 0,
  color = 'rgba(255, 255, 255, 0.1)',
  skew = '-15deg',
}: BeamAnimationProps) {
  return (
    <>
      <span 
        className={cn(
          "absolute inset-0 beam",
          active && "beam-active",
          className
        )}
        style={{
          background: color,
          animationDelay: `${delay}s`,
        }}
      />
      <style jsx>{`
        .beam {
          opacity: 0;
          transform: translateX(-100%) skewX(${skew});
          transition: all ${duration}s ease;
          animation: beam 4s infinite;
        }
        
        @keyframes beam {
          0% {
            opacity: 0;
            transform: translateX(-100%) skewX(${skew});
          }
          10% {
            opacity: 0.5;
          }
          20% {
            opacity: 0;
            transform: translateX(100%) skewX(${skew});
          }
          100% {
            opacity: 0;
            transform: translateX(100%) skewX(${skew});
          }
        }
        
        .beam-active {
          opacity: 0.7;
          transform: translateX(100%) skewX(${skew});
          transition: all ${duration}s ease;
        }
      `}</style>
    </>
  );
} 