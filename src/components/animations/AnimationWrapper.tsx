/**
 * AnimationWrapper Component
 * 
 * A flexible wrapper that can handle multiple animation types
 * with a unified interface to reduce duplication across the codebase
 */

import React from 'react';
import { FadeIn } from './FadeIn';
import { SlideIn } from './SlideIn';
import type { AnimationProps } from '@/lib/types/ui';

interface AnimationWrapperProps extends AnimationProps {
  children: React.ReactNode;
  className?: string;
  /** Distance for slide animations (in pixels) */
  distance?: number;
  /** Whether animation should trigger only once when in viewport */
  once?: boolean;
}

export function AnimationWrapper({
  children,
  type = 'fade',
  direction = 'up',
  className,
  duration = 500,
  delay = 0,
  distance = 20,
  once = true,
}: AnimationWrapperProps) {
  // Common props for all animation types
  const commonProps = {
    ...(className && { className }),
    duration,
    delay,
    once,
  };

  switch (type) {
    case 'slide':
      return (
        <SlideIn 
          {...commonProps}
          direction={direction}
          distance={distance}
        >
          {children}
        </SlideIn>
      );
      
    case 'fade':
    default:
      return (
        <FadeIn {...commonProps}>
          {children}
        </FadeIn>
      );
  }
} 