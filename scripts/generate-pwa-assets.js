/**
 * PWA Assets Generator
 * This script ensures all necessary PWA icons and assets exist before deployment
 */

const fs = require('node:fs');
const path = require('node:path');

// PWA icon sizes needed
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SOURCE_ICON = path.join(__dirname, '../public/icons/icon-512x512.png');
const ICONS_DIR = path.join(__dirname, '../public/icons');

// Paths to check/create
const PATHS = [
  ICONS_DIR,
  path.join(__dirname, '../public/offline'),
];

// Create necessary directories if they don't exist
function ensureDirectoriesExist() {
  for (const dir of PATHS) {
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

// Log status of required icon files
function checkRequiredIcons() {
  // Check source icon
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error(`⚠️ Warning: Source icon ${SOURCE_ICON} not found. Please create it.`);
    console.log('You should provide a 512x512 PNG source icon for PWA.');
    return false;
  }

  // Check all required icon sizes
  let allIconsExist = true;
  for (const size of ICON_SIZES) {
    const iconPath = path.join(ICONS_DIR, `icon-${size}x${size}.png`);
    if (!fs.existsSync(iconPath)) {
      console.warn(`⚠️ Missing icon: ${iconPath}`);
      allIconsExist = false;
    } else {
      console.log(`✓ Found icon: ${iconPath}`);
    }
  }

  // Check maskable icon
  const maskableIconPath = path.join(ICONS_DIR, 'maskable-icon.png');
  if (!fs.existsSync(maskableIconPath)) {
    console.warn(`⚠️ Missing maskable icon: ${maskableIconPath}`);
    allIconsExist = false;
  } else {
    console.log(`✓ Found maskable icon: ${maskableIconPath}`);
  }

  // Check Safari pinned tab icon
  const safariPinnedTabPath = path.join(__dirname, '../public/icons/safari-pinned-tab.svg');
  if (!fs.existsSync(safariPinnedTabPath)) {
    console.warn(`⚠️ Missing Safari pinned tab icon: ${safariPinnedTabPath}`);
    allIconsExist = false;
  } else {
    console.log(`✓ Found Safari pinned tab icon: ${safariPinnedTabPath}`);
  }

  return allIconsExist;
}

// Create a simple offline page if it doesn't exist
function ensureOfflinePage() {
  const offlinePath = path.join(__dirname, '../public/offline/index.html');
  if (!fs.existsSync(offlinePath)) {
    console.log('Creating basic offline page...');
    const offlineContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>INDECISIVEWEAR - Offline</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #ffffff;
      color: #171717;
      text-align: center;
      padding: 0 1rem;
    }
    .logo {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
    }
    .indecisive {
      background: linear-gradient(to right, #ec4899, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding-right: 0.5rem;
    }
    .wear {
      border: 2px solid #ec4899;
      padding: 0.25rem 0.5rem;
      margin-left: -0.5rem;
    }
    .message {
      max-width: 500px;
      margin-bottom: 2rem;
    }
    .button {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(to bottom right, #ec4899, #f472b6);
      color: white;
      border: none;
      border-radius: 0.375rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(236, 72, 153, 0.2);
    }
  </style>
</head>
<body>
  <div class="logo">
    <span class="indecisive">INDECISIVE</span><span class="wear">WEAR</span>
  </div>
  <div class="message">
    <h1>You're offline</h1>
    <p>It looks like you lost your connection. Check your internet and try again.</p>
  </div>
  <button class="button" onclick="window.location.reload()">Try Again</button>
</body>
</html>
    `.trim();
    fs.writeFileSync(offlinePath, offlineContent);
    console.log(`Created offline page at ${offlinePath}`);
  } else {
    console.log(`✓ Offline page already exists at ${offlinePath}`);
  }
}

// Main function to run the script
function main() {
  console.log('=== PWA Assets Generator ===');
  
  // Ensure directories exist
  ensureDirectoriesExist();
  
  // Check required icons
  const iconsOk = checkRequiredIcons();
  
  // Create offline page
  ensureOfflinePage();

  console.log('\n=== Summary ===');
  if (!iconsOk) {
    console.warn('⚠️ Some PWA icons are missing. Your PWA may not work properly on all devices.');
    console.log('Please generate the missing icons for a complete PWA experience.');
  } else {
    console.log('✓ All required PWA assets are present.');
  }
  
  console.log('\nPWA asset check complete.');
}

main(); 