/**
 * Color Contrast Checker for WCAG 2.1 AA Compliance
 * 
 * This utility checks if color combinations meet accessibility standards
 */

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLin = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLin = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLin = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

// Calculate contrast ratio
export function getContrastRatio(color1: string, color2: string): number | null {
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
export function meetsWCAG(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA', size: 'normal' | 'large' = 'normal'): boolean {
  const ratio = getContrastRatio(color1, color2);
  if (!ratio) return false;
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
  
  // WCAG AA standards
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
}

// Our brand colors for testing
export const brandColors = {
  // Pink gradients used in the app
  pink500: '#EC4899',    // Main pink
  pink600: '#DB2777',    // Darker pink
  purple600: '#9333EA',  // Purple accent
  
  // Backgrounds
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray900: '#111827',
  
  // Status colors
  green500: '#10B981',
  red500: '#EF4444',
  yellow500: '#F59E0B',
  blue500: '#3B82F6',
};

// Test our color combinations
export function auditBrandColors(): Array<{
  combination: string;
  ratio: number | null;
  wcagAA: boolean;
  wcagAAA: boolean;
  recommendations: string[];
}> {
  const results: Array<{
    combination: string;
    ratio: number | null;
    wcagAA: boolean;
    wcagAAA: boolean;
    recommendations: string[];
  }> = [];
  
  // Test critical combinations used in our UI
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
  
  testCombinations.forEach(({ name, fg, bg }) => {
    const ratio = getContrastRatio(fg, bg);
    const wcagAA = meetsWCAG(fg, bg, 'AA');
    const wcagAAA = meetsWCAG(fg, bg, 'AAA');
    
    const recommendations: string[] = [];
    
    if (!wcagAA) {
      recommendations.push('❌ Fails WCAG AA - Consider darker text or lighter background');
    } else if (!wcagAAA) {
      recommendations.push('⚠️ Passes AA but fails AAA - Good for most users');
    } else {
      recommendations.push('✅ Excellent contrast - Passes both AA and AAA');
    }
    
    if (ratio && ratio < 3) {
      recommendations.push('🔴 Very poor contrast - Immediate fix needed');
    } else if (ratio && ratio < 4.5) {
      recommendations.push('🟡 Poor contrast for normal text - Use larger text or improve contrast');
    }
    
    results.push({
      combination: name,
      ratio,
      wcagAA,
      wcagAAA,
      recommendations,
    });
  });
  
  return results;
}

// Generate a contrast report
export function generateContrastReport(): string {
  const results = auditBrandColors();
  
  let report = 'WCAG Color Contrast Audit Report\n';
  report += '================================\n\n';
  
  results.forEach(result => {
    report += `${result.combination}\n`;
    report += `Contrast Ratio: ${result.ratio ? result.ratio.toFixed(2) : 'Invalid'}\n`;
    report += `WCAG AA: ${result.wcagAA ? '✅ Pass' : '❌ Fail'}\n`;
    report += `WCAG AAA: ${result.wcagAAA ? '✅ Pass' : '❌ Fail'}\n`;
    result.recommendations.forEach(rec => {
      report += `${rec}\n`;
    });
    report += '\n';
  });
  
  // Summary
  const passAA = results.filter(r => r.wcagAA).length;
  const passAAA = results.filter(r => r.wcagAAA).length;
  const total = results.length;
  
  report += `Summary:\n`;
  report += `WCAG AA Compliance: ${passAA}/${total} (${((passAA/total)*100).toFixed(1)}%)\n`;
  report += `WCAG AAA Compliance: ${passAAA}/${total} (${((passAAA/total)*100).toFixed(1)}%)\n`;
  
  return report;
}