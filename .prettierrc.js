/**
 * Prettier Configuration
 * Phase 11: Developer Experience & Testing
 */

module.exports = {
  // Basic formatting
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  
  // Indentation
  tabWidth: 2,
  useTabs: false,
  
  // Line handling
  printWidth: 100,
  endOfLine: 'lf',
  
  // JSX formatting
  jsxSingleQuote: true,
  
  // Plugin configurations
  plugins: [
    'prettier-plugin-tailwindcss', // Must be last for proper class sorting
  ],
  
  // Tailwind CSS class sorting
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn', 'cva', 'tv'],
  
  // File-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
        embeddedLanguageFormatting: 'auto',
      },
    },
    {
      files: '*.{yaml,yml}',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
    {
      files: '*.{css,scss,less}',
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['package.json'],
      options: {
        tabWidth: 2,
        useTabs: false,
      },
    },
    {
      files: ['*.tsx', '*.jsx'],
      options: {
        jsxSingleQuote: true,
        bracketSameLine: false,
      },
    },
    {
      files: ['*.stories.{js,jsx,ts,tsx}'],
      options: {
        printWidth: 120, // Allow longer lines in stories
      },
    },
    {
      files: ['*.config.{js,ts,mjs}'],
      options: {
        printWidth: 120,
        semi: false,
      },
    },
  ],
  
  // Ignore patterns
  ignorePath: '.prettierignore',
} 