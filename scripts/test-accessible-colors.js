#!/usr/bin/env node

/**
 * Test Accessible Colors
 * 
 * Verify our new accessible color palette meets WCAG standards
 */

// Reuse contrast functions from the audit script
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLin = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLin = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLin = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

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

function meetsWCAG(color1, color2, level = 'AA', size = 'normal') {
  const ratio = getContrastRatio(color1, color2);
  if (!ratio) return false;
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
  
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
}

// Our new accessible colors
const accessibleColors = {
  pink700: '#BE185D',
  pink800: '#9F1239',
  green600: '#059669',
  green700: '#047857',
  red600: '#DC2626',
  red700: '#B91C1C',
  yellow600: '#D97706',
  blue600: '#2563EB',
  purple600: '#9333EA',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  white: '#FFFFFF',
};

console.log('✨ Testing New Accessible Color Palette');
console.log('=====================================\n');

// Test new combinations
const accessibleCombinations = [
  { name: 'Primary pink (700) on white', fg: accessibleColors.pink700, bg: accessibleColors.white },
  { name: 'Primary pink (800) on white', fg: accessibleColors.pink800, bg: accessibleColors.white },
  { name: 'White text on primary pink (700)', fg: accessibleColors.white, bg: accessibleColors.pink700 },
  { name: 'Success green (600) on white', fg: accessibleColors.green600, bg: accessibleColors.white },
  { name: 'Success green (700) on white', fg: accessibleColors.green700, bg: accessibleColors.white },
  { name: 'Error red (600) on white', fg: accessibleColors.red600, bg: accessibleColors.white },
  { name: 'Error red (700) on white', fg: accessibleColors.red700, bg: accessibleColors.white },
  { name: 'Text gray (700) on white', fg: accessibleColors.gray700, bg: accessibleColors.white },
  { name: 'Text gray (900) on white', fg: accessibleColors.gray900, bg: accessibleColors.white },
];

let totalTests = 0;
let passedAA = 0;
let passedAAA = 0;

accessibleCombinations.forEach(({ name, fg, bg }) => {
  const ratio = getContrastRatio(fg, bg);
  const wcagAA = meetsWCAG(fg, bg, 'AA');
  const wcagAAA = meetsWCAG(fg, bg, 'AAA');
  
  totalTests++;
  if (wcagAA) passedAA++;
  if (wcagAAA) passedAAA++;
  
  console.log(`🎨 ${name}`);
  console.log(`   Contrast Ratio: ${ratio ? ratio.toFixed(2) : 'Invalid'}`);
  console.log(`   WCAG AA: ${wcagAA ? '✅ Pass' : '❌ Fail'}`);
  console.log(`   WCAG AAA: ${wcagAAA ? '✅ Pass' : '❌ Fail'}`);
  
  if (wcagAAA) {
    console.log('   🌟 Excellent: Passes both AA and AAA standards');
  } else if (wcagAA) {
    console.log('   ✅ Good: Meets WCAG AA requirements');
  } else {
    console.log('   ❌ Poor: Needs improvement');
  }
  
  console.log('');
});

console.log('📊 Results Summary:');
console.log(`   WCAG AA Compliance: ${passedAA}/${totalTests} (${((passedAA/totalTests)*100).toFixed(1)}%)`);
console.log(`   WCAG AAA Compliance: ${passedAAA}/${totalTests} (${((passedAAA/totalTests)*100).toFixed(1)}%)`);

if (passedAA === totalTests) {
  console.log('\n🎉 Perfect! All new colors meet WCAG AA standards.');
  console.log('✨ Ready to implement in the design system.');
} else {
  console.log('\n⚠️ Some colors still need adjustment.');
}

console.log('\n📋 Implementation Guide:');
console.log('   1. Replace pink-500 with pink-700 for text and buttons');
console.log('   2. Use pink-800 for better contrast on hover states');
console.log('   3. Replace green-500 with green-600 for status indicators');
console.log('   4. Replace red-500 with red-600 for error states');
console.log('   5. Use gray-700+ for all text on white backgrounds');
console.log('\n🔄 Consider creating CSS custom properties for these colors');