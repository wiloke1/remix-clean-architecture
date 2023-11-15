/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node', 'plugin:react/jsx-runtime', 'prettier'],
  // parserOptions: {
  //   project: './tsconfig.json',
  // },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/function-component-definition': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    '@typescript-eslint/naming-convention': 0,
    'import/no-duplicates': 0,
  },
};
