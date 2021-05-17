module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {},
  parserOptions: {
    parser: 'babel-eslint'
  }
}
