module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'ignorePatterns': ['*.tpl.js'],
  'rules': {
    'max-len': [2, 120, 2],
    'object-curly-spacing': ['error', 'always'],
    'no-magic-numbers': 2,
    'no-invalid-this': 0,
  },
};
