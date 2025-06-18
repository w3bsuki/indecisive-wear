import { useEffect, useRef, useState } from 'react';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}: SwipeConfig) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        touchStart.current = {
          x: touch.clientX,
          y: touch.clientY,
        };
        setIsSwiping(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.touches[0];
      if (!touch) return;
      
      const moveX = touch.clientX - touchStart.current.x;
      const moveY = touch.clientY - touchStart.current.y;
      const absX = Math.abs(moveX);
      const absY = Math.abs(moveY);

      // Only prevent default if we're handling the swipe
      if (absX > threshold || absY > threshold) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      if (!touch) return;
      
      const moveX = touch.clientX - touchStart.current.x;
      const moveY = touch.clientY - touchStart.current.y;
      const absX = Math.abs(moveX);
      const absY = Math.abs(moveY);

      if (absX > threshold || absY > threshold) {
        // Determine if the swipe was horizontal or vertical
        if (absX > absY) {
          // Horizontal swipe
          if (moveX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        } else {
          // Vertical swipe
          if (moveY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }

      touchStart.current = null;
      setIsSwiping(false);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);

  return { isSwiping };
} 