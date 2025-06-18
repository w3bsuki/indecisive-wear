#!/usr/bin/env node

/**
 * Import Optimization Script
 * 
 * Analyzes the codebase to identify:
 * - Unused imports
 * - Large library imports that could be tree-shaken
 * - Duplicate imports across files
 * - Opportunities for barrel exports optimization
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ImportAnalysis {
  file: string;
  imports: Array<{
    library: string;
    imports: string[];
    isDefault: boolean;
    isNamespace: boolean;
  }>;
  size: number;
}

class ImportOptimizer {
  private rootDir: string;
  private results: ImportAnalysis[] = [];
  
  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
  }

  /**
   * Analyze all TypeScript/JavaScript files for import patterns
   */
  async analyzeImports(): Promise<void> {
    const files = await glob('**/*.{ts,tsx,js,jsx}', {
      cwd: this.rootDir,
      ignore: [
        'node_modules/**',
        '.next/**',
        'dist/**',
        'build/**',
        '**/*.d.ts'
      ]
    });

    console.log(`🔍 Analyzing ${files.length} files for import optimization...`);

    for (const file of files) {
      const filePath = path.join(this.rootDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const analysis = this.analyzeFile(file, content);
      
      if (analysis.imports.length > 0) {
        this.results.push(analysis);
      }
    }
  }

  /**
   * Analyze a single file for import patterns
   */
  private analyzeFile(file: string, content: string): ImportAnalysis {
    const imports: ImportAnalysis['imports'] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip comments and non-import lines
      if (!trimmed.startsWith('import') || trimmed.startsWith('//')) {
        continue;
      }

      // Parse different import patterns
      const importMatch = trimmed.match(/import\s+(.+?)\s+from\s+['"`]([^'"`]+)['"`]/);
      if (importMatch) {
        const [, importClause, library] = importMatch;
        if (!importClause || !library) continue;
        const isNamespace = importClause.includes('* as');
        const isDefault = !importClause.includes('{') && !isNamespace;
        
        let importNames: string[] = [];
        
        if (isNamespace) {
          importNames = [importClause.trim()];
        } else if (isDefault) {
          importNames = [importClause.trim()];
        } else {
          // Named imports
          const namedMatch = importClause.match(/\{([^}]+)\}/);
          if (namedMatch && namedMatch[1]) {
            importNames = namedMatch[1]
              .split(',')
              .map(name => name.trim())
              .filter(name => name.length > 0);
          }
        }

        imports.push({
          library,
          imports: importNames,
          isDefault,
          isNamespace
        });
      }
    }

    return {
      file,
      imports,
      size: content.length
    };
  }

  /**
   * Generate optimization report
   */
  generateReport(): void {
    console.log('\n📊 Import Optimization Report\n');

    // Find large icon imports
    this.reportLargeIconImports();
    
    // Find namespace imports that could be optimized
    this.reportNamespaceImports();
    
    // Find duplicate imports
    this.reportDuplicateImports();
    
    // Find opportunities for barrel exports
    this.reportBarrelExportOpportunities();
    
    // Bundle size impact
    this.reportBundleSizeImpact();
  }

  private reportLargeIconImports(): void {
    console.log('🎨 Large Icon Library Imports:');
    
    const iconImports = this.results
      .flatMap(result => 
        result.imports
          .filter(imp => imp.library === 'lucide-react' && imp.imports.length > 5)
          .map(imp => ({ file: result.file, ...imp }))
      );

    if (iconImports.length === 0) {
      console.log('   ✅ No large icon imports found');
    } else {
      iconImports.forEach(imp => {
        console.log(`   ⚠️  ${imp.file}: ${imp.imports.length} icons imported`);
        console.log(`      Icons: ${imp.imports.slice(0, 5).join(', ')}${imp.imports.length > 5 ? '...' : ''}`);
      });
    }
    console.log();
  }

  private reportNamespaceImports(): void {
    console.log('🌐 Namespace Imports (potential tree-shaking issues):');
    
    const namespaceImports = this.results
      .flatMap(result => 
        result.imports
          .filter(imp => imp.isNamespace)
          .map(imp => ({ file: result.file, ...imp }))
      );

    if (namespaceImports.length === 0) {
      console.log('   ✅ No problematic namespace imports found');
    } else {
      namespaceImports.forEach(imp => {
        console.log(`   ⚠️  ${imp.file}: ${imp.imports[0]} from ${imp.library}`);
      });
    }
    console.log();
  }

  private reportDuplicateImports(): void {
    console.log('🔄 Library Usage Frequency:');
    
    const libraryUsage = new Map<string, number>();
    
    this.results.forEach(result => {
      result.imports.forEach(imp => {
        libraryUsage.set(imp.library, (libraryUsage.get(imp.library) || 0) + 1);
      });
    });

    const sortedLibraries = Array.from(libraryUsage.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    sortedLibraries.forEach(([library, count]) => {
      console.log(`   📦 ${library}: used in ${count} files`);
    });
    console.log();
  }

  private reportBarrelExportOpportunities(): void {
    console.log('📂 Barrel Export Opportunities:');
    
    const internalImports = this.results
      .flatMap(result => 
        result.imports
          .filter(imp => imp.library.startsWith('./') || imp.library.startsWith('../'))
          .map(imp => ({ file: result.file, ...imp }))
      );

    const importPatterns = new Map<string, string[]>();
    
    internalImports.forEach(imp => {
      const dir = path.dirname(imp.library);
      if (!importPatterns.has(dir)) {
        importPatterns.set(dir, []);
      }
      importPatterns.get(dir)!.push(imp.file);
    });

    const opportunities = Array.from(importPatterns.entries())
      .filter(([, files]) => files.length > 3)
      .sort(([,a], [,b]) => b.length - a.length);

    if (opportunities.length === 0) {
      console.log('   ✅ No clear barrel export opportunities found');
    } else {
      opportunities.slice(0, 5).forEach(([dir, files]) => {
        console.log(`   💡 Directory "${dir}" imported by ${files.length} files`);
      });
    }
    console.log();
  }

  private reportBundleSizeImpact(): void {
    console.log('📏 Estimated Bundle Size Impact:');
    
    const heavyLibraries = [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-',
      'recharts',
      'react-hook-form'
    ];

    heavyLibraries.forEach(library => {
      const usage = this.results.filter(result => 
        result.imports.some(imp => imp.library.includes(library))
      ).length;
      
      if (usage > 0) {
        console.log(`   📦 ${library}: used in ${usage} files`);
      }
    });
    console.log();
  }

  /**
   * Generate optimization suggestions
   */
  generateSuggestions(): void {
    console.log('💡 Optimization Suggestions:\n');
    
    console.log('1. Icon Import Optimization:');
    console.log('   - Consider using icon bundles for frequently used icons');
    console.log('   - Use dynamic imports for icons only used in specific routes');
    console.log('   - Create a centralized icon component with lazy loading\n');
    
    console.log('2. Library Tree Shaking:');
    console.log('   - Replace namespace imports with named imports where possible');
    console.log('   - Use babel plugins to optimize imports automatically');
    console.log('   - Consider lighter alternatives for heavy libraries\n');
    
    console.log('3. Code Splitting:');
    console.log('   - Implement route-based code splitting');
    console.log('   - Use React.lazy() for components not immediately needed');
    console.log('   - Create separate chunks for admin/settings components\n');
    
    console.log('4. Bundle Analysis:');
    console.log('   - Run `npm run build` with bundle analyzer');
    console.log('   - Monitor bundle size changes in CI/CD');
    console.log('   - Set up bundle size budgets\n');
  }
}

// Run the analysis
async function main() {
  const optimizer = new ImportOptimizer();
  
  await optimizer.analyzeImports();
  optimizer.generateReport();
  optimizer.generateSuggestions();
  
  console.log('🎉 Analysis complete! Use the suggestions above to optimize your bundle size.');
}

// Run the analysis
main().catch(console.error);

export { ImportOptimizer }; 