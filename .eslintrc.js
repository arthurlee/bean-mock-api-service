module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    "indent": ["error", "tab"],
    "no-tabs": 0,
    "space-before-function-paren": 0
  }
}
