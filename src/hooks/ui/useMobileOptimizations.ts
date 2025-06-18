import { useEffect, useState } from 'react';

interface NetworkInformation extends EventTarget {
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  saveData: boolean;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection: NetworkInformation;
}

export function useMobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [connection, setConnection] = useState<string>('unknown');

  useEffect(() => {
    // Check if device is mobile - by user agent and screen width
    const checkMobile = () => {
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const isMobileScreenSize = window.innerWidth < 768;
      
      setIsMobile(isMobileUserAgent || isMobileScreenSize);
    };

    // Check connection type
    const updateConnectionStatus = () => {
      if ('connection' in navigator) {
        const conn = (navigator as NavigatorWithConnection).connection;
        setConnection(conn.effectiveType || 'unknown');
        setIsLowPowerMode(conn.saveData || false);
      }
    };

    // Initial checks
    checkMobile();
    updateConnectionStatus();

    // Set up listeners for connection changes and window resize
    if ('connection' in navigator) {
      const conn = (navigator as NavigatorWithConnection).connection;
      conn.addEventListener('change', updateConnectionStatus);
    }
    
    // Listen for resize events to update mobile status
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => {
      if ('connection' in navigator) {
        const conn = (navigator as NavigatorWithConnection).connection;
        conn.removeEventListener('change', updateConnectionStatus);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Optimization settings based on device and connection
  const optimizations = {
    // Reduce animation complexity on low-end devices or slow connections
    shouldReduceAnimations: isMobile && (isLowPowerMode || connection === '2g' || connection === 'slow-2g'),
    
    // Lazy load images further from viewport on slow connections
    lazyLoadDistance: connection === '4g' ? '100px' : '300px',
    
    // Reduce image quality on slow connections
    imageQuality: connection === '4g' ? 90 : 60,
    
    // Disable certain features on very slow connections
    shouldDisableHeavyFeatures: connection === 'slow-2g',
    
    // Enable hardware acceleration for animations
    useHardwareAcceleration: !isLowPowerMode,
  };

  return {
    isMobile,
    isLowPowerMode,
    connection,
    optimizations,
  };
} 