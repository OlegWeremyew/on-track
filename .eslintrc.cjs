/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    "@vue/eslint-config-typescript"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  overrides: [
    {
      files: ['postcss.config.cjs', 'tailwind.config.js',],
      env: {
        node: true,
      },
    },
  ],
}
