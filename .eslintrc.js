module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
    // '@vue/standard',
    // '@vue/typescript/recommended',
    // '@vue/prettier',
    // '@vue/prettier/@typescript-eslint',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
