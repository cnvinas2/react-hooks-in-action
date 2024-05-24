module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': ['error', 'never'], // Disallow trailing commas
    'eol-last': ['error', 'never'] // Disallow newline at end of file
    // other rules...
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}