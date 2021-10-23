module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': [2, 120, 2],
    'object-curly-spacing': ['error', 'always'],
    'no-magic-numbers': ['error', { 'ignore': [0, 1, 2, 3] }],
    'no-invalid-this': 0,
  },
};
