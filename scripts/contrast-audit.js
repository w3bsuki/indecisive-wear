#!/usr/bin/env node

/**
 * Color Contrast Audit Script
 * 
 * Run this script to check WCAG compliance of our brand colors
 * Usage: node scripts/contrast-audit.js
 */

// Simplified contrast checking (without TypeScript for easy Node.js execution)

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLin = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLin = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLin = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return null;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if contrast meets WCAG standards
function meetsWCAG(color1, color2, level = 'AA', size = 'normal') {
  const ratio = getContrastRatio(color1, color2);
  if (!ratio) return false;
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
  
  // WCAG AA standards
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
}

// Our brand colors
const brandColors = {
  pink500: '#EC4899',    // Main pink
  pink600: '#DB2777',    // Darker pink
  purple600: '#9333EA',  // Purple accent
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray900: '#111827',
  green500: '#10B981',
  red500: '#EF4444',
  yellow500: '#F59E0B',
  blue500: '#3B82F6',
};

// Test combinations used in our UI
const testCombinations = [
  { name: 'Pink buttons on white', fg: brandColors.pink500, bg: brandColors.white },
  { name: 'White text on pink', fg: brandColors.white, bg: brandColors.pink500 },
  { name: 'Black text on white', fg: brandColors.black, bg: brandColors.white },
  { name: 'White text on black', fg: brandColors.white, bg: brandColors.black },
  { name: 'Pink on gray background', fg: brandColors.pink500, bg: brandColors.gray50 },
  { name: 'Purple on white', fg: brandColors.purple600, bg: brandColors.white },
  { name: 'Green status on white', fg: brandColors.green500, bg: brandColors.white },
  { name: 'Red status on white', fg: brandColors.red500, bg: brandColors.white },
];

console.log('🎨 WCAG Color Contrast Audit Report');
console.log('================================\n');

let totalTests = 0;
let passedAA = 0;
let passedAAA = 0;

testCombinations.forEach(({ name, fg, bg }) => {
  const ratio = getContrastRatio(fg, bg);
  const wcagAA = meetsWCAG(fg, bg, 'AA');
  const wcagAAA = meetsWCAG(fg, bg, 'AAA');
  
  totalTests++;
  if (wcagAA) passedAA++;
  if (wcagAAA) passedAAA++;
  
  console.log(`📊 ${name}`);
  console.log(`   Contrast Ratio: ${ratio ? ratio.toFixed(2) : 'Invalid'}`);
  console.log(`   WCAG AA: ${wcagAA ? '✅ Pass' : '❌ Fail'}`);
  console.log(`   WCAG AAA: ${wcagAAA ? '✅ Pass' : '❌ Fail'}`);
  
  // Recommendations
  if (!wcagAA) {
    console.log('   🔴 Action needed: Fails WCAG AA - Consider darker text or lighter background');
  } else if (!wcagAAA) {
    console.log('   🟡 Good: Passes AA but fails AAA - Acceptable for most users');
  } else {
    console.log('   ✅ Excellent: Passes both AA and AAA standards');
  }
  
  if (ratio && ratio < 3) {
    console.log('   ⚠️ Critical: Very poor contrast - Immediate fix needed');
  } else if (ratio && ratio < 4.5) {
    console.log('   ⚠️ Warning: Poor contrast for normal text - Use larger text or improve contrast');
  }
  
  console.log('');
});

// Summary
console.log('📈 Summary:');
console.log(`   WCAG AA Compliance: ${passedAA}/${totalTests} (${((passedAA/totalTests)*100).toFixed(1)}%)`);
console.log(`   WCAG AAA Compliance: ${passedAAA}/${totalTests} (${((passedAAA/totalTests)*100).toFixed(1)}%)`);

if (passedAA === totalTests) {
  console.log('\n🎉 Great! All color combinations meet WCAG AA standards.');
} else {
  console.log('\n⚠️ Some combinations need improvement to meet WCAG AA standards.');
}

console.log('\n📝 Notes:');
console.log('   - WCAG AA is the minimum standard for accessibility compliance');
console.log('   - WCAG AAA provides enhanced accessibility for users with vision impairments');
console.log('   - Large text (18pt+ or 14pt+ bold) has more relaxed contrast requirements');
console.log('   - Consider these results when designing UI components');