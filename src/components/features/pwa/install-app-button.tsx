"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// BeforeInstallPromptEvent is not part of the standard types
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & typeof globalThis & { MSStream?: unknown }).MSStream;
    setIsIOSDevice(isIOS);

    // For Chrome, Edge, Firefox, etc.
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      // For Chrome, Edge, Firefox
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } else if (isIOSDevice) {
      // For iOS devices
      setShowIOSInstructions(true);
    }
  };

  // If no installation is available, don't render the button
  if (!installPrompt && !isIOSDevice) {
    return null;
  }

  return (
    <>
      <Button 
        onClick={handleInstallClick}
        variant="outline"
        className="flex items-center gap-2 bg-white text-pink-500 border-pink-300 hover:bg-pink-50"
      >
        <Download className="h-4 w-4" />
        Install App
      </Button>

      {showIOSInstructions && isIOSDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-bold mb-4">Install on iOS</h3>
            <ol className="list-decimal pl-4 space-y-2 mb-4">
              <li>Tap the share icon <span className="rounded-md bg-gray-100 px-2 py-1 text-sm">􀈂</span> at the bottom of your screen</li>
              <li>Scroll down and tap <span className="font-medium">Add to Home Screen</span></li>
              <li>Tap <span className="font-medium">Add</span> in the top right corner</li>
            </ol>
            <Button 
              className="w-full" 
              onClick={() => setShowIOSInstructions(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
} 