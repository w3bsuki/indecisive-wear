export default {
  source: ['design-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'design-tokens.css',
        format: 'css/variables'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/lib/design-system/',
      files: [{
        destination: 'tokens-generated.js',
        format: 'javascript/es6'
      }]
    }
  }
}