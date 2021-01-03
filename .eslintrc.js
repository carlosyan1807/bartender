module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    // 'eslint:recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint',
    // '@vue/standard',
    // '@vue/typescript/recommended',
    // '@vue/prettier',
    // '@vue/prettier/@typescript-eslint',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
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
