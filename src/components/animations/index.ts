/**
 * Animation Components - Centralized reusable animations
 * 
 * This module consolidates repeated animation patterns found across the codebase:
 * - Beam animations used in buttons
 * - Fade-in/slide-in animations
 * - Marquee animations  
 * - Moving border animations
 */

export { FadeIn } from './FadeIn';
export { SlideIn } from './SlideIn';
export { BeamAnimation } from './BeamAnimation';
export { AnimationWrapper } from './AnimationWrapper';

// Re-export common animation types
export type { AnimationType, AnimationDirection, AnimationProps } from '@/lib/types/ui'; 