module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        require: 'readonly', module: 'writable', process: 'readonly',
        console: 'readonly', describe: 'readonly', test: 'readonly', expect: 'readonly'
      }
    },
    rules: { 'no-unused-vars': 'error' }
  }
];
