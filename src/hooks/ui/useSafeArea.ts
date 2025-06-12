import { useEffect, useState } from 'react';

interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function useSafeArea() {
  const [safeAreaInsets, setSafeAreaInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });
  
  const [hasSafeArea, setHasSafeArea] = useState(false);

  useEffect(() => {
    // Check if the device supports env() CSS variables
    const testEnvSupport = () => {
      const testElement = document.createElement('div');
      testElement.style.paddingTop = 'env(safe-area-inset-top)';
      document.body.appendChild(testElement);
      const computedStyle = window.getComputedStyle(testElement);
      const hasSafeAreaSupport = computedStyle.paddingTop !== '';
      document.body.removeChild(testElement);
      return hasSafeAreaSupport;
    };

    // Get the numeric value of an env() CSS variable
    const getEnvValue = (envVar: string): number => {
      const testElement = document.createElement('div');
      testElement.style.paddingTop = `env(${envVar})`;
      document.body.appendChild(testElement);
      const computedStyle = window.getComputedStyle(testElement);
      const value = parseInt(computedStyle.paddingTop) || 0;
      document.body.removeChild(testElement);
      return value;
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      const hasSupport = testEnvSupport();
      setHasSafeArea(hasSupport);
      
      if (hasSupport) {
        setSafeAreaInsets({
          top: getEnvValue('safe-area-inset-top'),
          bottom: getEnvValue('safe-area-inset-bottom'),
          left: getEnvValue('safe-area-inset-left'),
          right: getEnvValue('safe-area-inset-right')
        });
      }
    }
  }, []);

  // CSS variables to be applied to a component
  const safeAreaStyle = {
    '--safe-area-top': `${safeAreaInsets.top}px`,
    '--safe-area-bottom': `${safeAreaInsets.bottom}px`,
    '--safe-area-left': `${safeAreaInsets.left}px`,
    '--safe-area-right': `${safeAreaInsets.right}px`,
  } as React.CSSProperties;

  return {
    safeAreaInsets,
    hasSafeArea,
    safeAreaStyle
  };
} 