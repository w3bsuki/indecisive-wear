#!/usr/bin/env node

/**
 * Fix Lucide React Imports
 * 
 * This script automatically converts multiple lucide-react imports
 * into individual imports for better tree-shaking
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to process based on the report
const filesToFix = [
  'src/components/ui/error-states.tsx',
  'src/components/ui/TrustBadges.tsx',
  'src/components/ui/ProfessionalCookieConsent.tsx',
  'src/app/(marketing)/page.tsx',
  'src/components/layout/navbar/UserActions.tsx',
  'src/components/layout/navbar/UserActions.backup.tsx',
  'src/components/layout/navbar/MobileMenu.tsx',
  'src/components/features/shop/ShopPageSimple.tsx',
  'src/components/features/footer/Footer.tsx',
  'src/components/features/e-commerce/ProductFilters.tsx',
  'src/components/features/shop/filters/FilterDrawer.tsx',
  'src/components/features/production/dashboard/components/OverviewCards.tsx',
  'src/components/features/production/dashboard/components/PerformanceTab.tsx',
  'src/components/features/production/dashboard/components/VitalsTab.tsx',
  'src/components/features/production/dashboard/components/ErrorsTab.tsx',
  'src/components/features/production/dashboard/components/MonitoringTab.tsx'
];

function optimizeLucideImports(content, filePath) {
  const lucideImportRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/g;
  let optimized = content;
  let hasChanges = false;
  
  const matches = Array.from(content.matchAll(lucideImportRegex));
  
  for (const match of matches) {
    const fullImport = match[0];
    const iconsString = match[1];
    const icons = iconsString
      .split(',')
      .map(icon => icon.trim())
      .filter(Boolean);
    
    // Only optimize if there are multiple icons
    if (icons.length > 1) {
      const individualImports = icons
        .map(icon => `import { ${icon} } from 'lucide-react'`)
        .join('\n');
      
      optimized = optimized.replace(fullImport, individualImports);
      hasChanges = true;
      
      console.log(`✅ ${filePath}: Optimized ${icons.length} icons`);
    }
  }
  
  return { content: optimized, hasChanges };
}

function processAllFiles() {
  // Process all TypeScript/TSX files with lucide-react imports
  const allFiles = glob.sync('src/**/*.{ts,tsx}', {
    ignore: ['node_modules/**', '.next/**', 'dist/**']
  });

  let totalFiles = 0;
  let totalOptimized = 0;

  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check if file has lucide-react imports
      if (content.includes('from \'lucide-react\'') || content.includes('from "lucide-react"')) {
        const { content: optimized, hasChanges } = optimizeLucideImports(content, file);
        
        if (hasChanges) {
          fs.writeFileSync(file, optimized);
          totalOptimized++;
        }
        totalFiles++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total files checked: ${allFiles.length}`);
  console.log(`   Files with lucide imports: ${totalFiles}`);
  console.log(`   Files optimized: ${totalOptimized}`);
}

// Run the optimization
console.log('🔧 Optimizing lucide-react imports...\n');
processAllFiles();
console.log('\n✨ Optimization complete!');