/**
 * @type {import('eslint').Linter.RulesRecord}
 */
export const rulesUnusedImports = {
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'error',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      caughtErrors: 'none',
      vars: 'all',
      varsIgnorePattern: '^_',
    },
  ],
};
