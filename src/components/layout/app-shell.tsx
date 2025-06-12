"use client";

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

// Define an interface for window.navigator with the standalone property
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export function AppShell({ children, className }: AppShellProps) {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    // Detect if running in standalone mode (installed as PWA)
    const isInStandaloneMode = () => 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as NavigatorWithStandalone).standalone || 
      document.referrer.includes('android-app://');
    
    // Detect iOS device
    const checkIsIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && 
      !(window as Window & typeof globalThis & { MSStream?: unknown }).MSStream;
    
    setIsStandalone(isInStandaloneMode());
    setIsIOS(checkIsIOS());
    
    // Add listener for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <div 
      className={cn(
        "flex flex-col min-h-screen w-full bg-white",
        isStandalone && "h-[100dvh] overflow-hidden",
        isStandalone && isIOS && "pt-12", // Add padding for iOS status bar in standalone mode
        className
      )}
    >
      {isStandalone && isIOS && (
        <div className="fixed top-0 left-0 right-0 h-12 bg-white z-50" />
      )}
      
      <main className={cn(
        "flex-1",
        isStandalone && "overflow-y-auto overscroll-none will-change-scroll"
      )}>
        {children}
      </main>
      
      {isStandalone && (
        <div className="h-6 bg-white border-t border-gray-200">
          {/* Home indicator area for modern iPhones */}
        </div>
      )}
    </div>
  );
} 