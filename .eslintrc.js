/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import', 'perfectionist'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {},
        },
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: true,
      },
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            alphabetize: {
              caseInsensitive: true,
              order: 'asc',
            },
            'newlines-between': 'always',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            type: 'line-length',
            order: 'desc',
          },
        ],
      },
    },
  ],
};
