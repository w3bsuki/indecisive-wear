import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

interface GestureOptions {
  threshold?: number;
  velocityThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useNativeGestures(
  ref: RefObject<HTMLElement>,
  options: GestureOptions = {}
) {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  } = options;

  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true);
      const touch = e.touches[0];
      if (touch) {
        startX = touch.clientX;
        startY = touch.clientY;
        startTime = Date.now();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setIsTouching(false);
      
      const touch = e.changedTouches[0];
      if (!touch) return;
      
      const endX = touch.clientX;
      const endY = touch.clientY;
      const endTime = Date.now();
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const time = endTime - startTime;
      
      const velocityX = Math.abs(deltaX) / time;
      const velocityY = Math.abs(deltaY) / time;
      
      // Detect horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && velocityX > velocityThreshold && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && velocityX > velocityThreshold && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      
      // Detect vertical swipe
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && velocityY > velocityThreshold && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && velocityY > velocityThreshold && onSwipeUp) {
          onSwipeUp();
        }
      }
    };

    // Add iOS overscroll behavior control
    const preventOverscroll = (e: TouchEvent) => {
      // Check if at the top or bottom of the page
      const element = e.currentTarget as HTMLElement;
      const atTop = element.scrollTop <= 0;
      const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight;
      
      // Prevent default only if trying to scroll beyond boundaries
      const touch = e.touches[0];
      if (touch && ((atTop && touch.clientY > startY) || 
          (atBottom && touch.clientY < startY))) {
        e.preventDefault();
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchmove', preventOverscroll, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', preventOverscroll);
    };
  }, [ref, threshold, velocityThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return { isTouching };
} 