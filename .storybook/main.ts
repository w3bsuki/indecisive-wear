/**
 * Storybook Main Configuration
 * Phase 11: Developer Experience & Testing
 */

import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: '../next.config.mjs',
    },
  },
  
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  features: {
    experimentalRSC: true,
  },
  
  staticDirs: ['../public'],
  
  env: (config) => ({
    ...config,
    STORYBOOK: 'true',
  }),
  
  webpackFinal: async (config) => {
    // Handle SVG imports
    const fileLoaderRule = config.module?.rules?.find((rule) => {
      if (typeof rule !== 'object' || !rule) return false
      if ('test' in rule && rule.test instanceof RegExp) {
        return rule.test.test('.svg')
      }
      return false
    })
    
    if (fileLoaderRule && typeof fileLoaderRule === 'object') {
      fileLoaderRule.exclude = /\.svg$/
    }
    
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
}

export default config 