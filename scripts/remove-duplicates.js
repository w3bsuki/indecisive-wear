#!/usr/bin/env node

/**
 * Duplicate File Removal Script
 * Safely removes identified duplicate files from the codebase
 */

const fs = require('fs');
const path = require('path');

// List of duplicate files to remove (keeping the better/more complete version)
const DUPLICATES_TO_REMOVE = [
  // Noise gradient components - keeping the ui/ version (has TypeScript types)
  'components/noisy-gradient-backgrounds.tsx',
  
  // Add more duplicates as we find them
  // Format: 'relative/path/from/project/root/file.ext'
];

// Files to keep (for reference)
const DUPLICATES_TO_KEEP = [
  'components/ui/noisy-gradient-backgrounds.tsx', // More complete with TypeScript
];

function removeDuplicates() {
  console.log('🔍 Starting duplicate file removal...\n');
  
  let removedCount = 0;
  let errors = [];

  DUPLICATES_TO_REMOVE.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    
    try {
      if (fs.existsSync(fullPath)) {
        // Get file stats for logging
        const stats = fs.statSync(fullPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        
        // Remove the file
        fs.unlinkSync(fullPath);
        
        console.log(`✅ Removed: ${filePath} (${sizeKB} KB)`);
        removedCount++;
      } else {
        console.log(`⚠️  File not found: ${filePath}`);
      }
    } catch (error) {
      const errorMsg = `❌ Error removing ${filePath}: ${error.message}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Files removed: ${removedCount}`);
  console.log(`   Errors: ${errors.length}`);
  
  if (DUPLICATES_TO_KEEP.length > 0) {
    console.log(`\n✅ Files kept (canonical versions):`);
    DUPLICATES_TO_KEEP.forEach(file => {
      console.log(`   - ${file}`);
    });
  }

  if (errors.length > 0) {
    console.log(`\n❌ Errors encountered:`);
    errors.forEach(error => console.log(`   ${error}`));
    process.exit(1);
  }

  console.log('\n🎉 Duplicate removal completed successfully!');
}

// Run the script
if (require.main === module) {
  removeDuplicates();
}

module.exports = { removeDuplicates, DUPLICATES_TO_REMOVE, DUPLICATES_TO_KEEP }; 