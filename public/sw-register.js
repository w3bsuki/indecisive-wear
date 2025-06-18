// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Service Worker Registration Script
if ('serviceWorker' in navigator && 'window' in self) {
  // Wait for page load and fonts to be ready
  if (document.readyState === 'complete') {
    registerSW();
  } else {
    window.addEventListener('load', registerSW);
  }
}

async function registerSW() {
  try {
    // Check if service worker is already registered
    const existingRegistration = await navigator.serviceWorker.getRegistration();
    if (existingRegistration) {
      console.log('Service Worker already registered:', existingRegistration.scope);
      await handleExistingRegistration(existingRegistration);
      return;
    }

    // Register new service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      type: 'classic', // Use classic type to avoid module issues on mobile
      updateViaCache: 'none'
    });

    console.log('Service Worker registered successfully:', registration.scope);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New content is available, show update prompt
          showUpdatePrompt();
        }
      });
    });

    // Check for updates periodically (every hour)
    setInterval(() => {
      registration.update().catch(err => {
        console.warn('Service Worker update check failed:', err);
      });
    }, 60 * 60 * 1000);

  } catch (error) {
    console.error('Service Worker registration failed:', error);
    // Don't rethrow - we want to fail gracefully
  }
}

async function handleExistingRegistration(registration) {
  try {
    // Check if update is available
    await registration.update();
    
    if (registration.waiting) {
      // New version waiting to activate
      showUpdatePrompt();
    }
  } catch (error) {
    console.warn('Service Worker update check failed:', error);
  }
}

function showUpdatePrompt() {
  // Create a non-blocking update notification
  const updateBanner = document.createElement('div');
  updateBanner.style.cssText = `
    position: fixed;
    bottom: env(safe-area-inset-bottom, 0);
    left: 0;
    right: 0;
    background: rgba(236, 72, 153, 0.95);
    color: white;
    padding: 12px;
    text-align: center;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  `;
  
  updateBanner.innerHTML = `
    <span>A new version is available!</span>
    <button onclick="window.location.reload()" style="
      background: white;
      color: #EC4899;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
    ">Update Now</button>
    <button onclick="this.parentElement.remove()" style="
      background: transparent;
      border: 1px solid rgba(255,255,255,0.5);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      margin-left: 8px;
      cursor: pointer;
    ">Later</button>
  `;

  document.body.appendChild(updateBanner);
}

// Handle offline/online status
if ('serviceWorker' in navigator) {
  let offlinePromptShown = false;

  window.addEventListener('online', async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('waitlist-signup');
      console.log('Background sync registered for waitlist-signup');
    } catch (error) {
      console.warn('Background sync registration failed:', error);
    }
  });

  window.addEventListener('offline', () => {
    if (!offlinePromptShown) {
      // Show offline notification only once
      const offlineBanner = document.createElement('div');
      offlineBanner.style.cssText = `
        position: fixed;
        top: env(safe-area-inset-top, 0);
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px;
        text-align: center;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        z-index: 9999;
      `;
      offlineBanner.textContent = 'You are currently offline. Some features may be limited.';
      document.body.appendChild(offlineBanner);
      offlinePromptShown = true;

      // Remove banner when back online
      window.addEventListener('online', () => {
        offlineBanner.remove();
        offlinePromptShown = false;
      }, { once: true });
    }
  });
} 