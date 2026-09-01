/**
 * @type {import('eslint').Linter.RulesRecord}
 */
export const rulesImportX = {
  'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  'import-x/newline-after-import': ['error', { count: 1 }],
  'import-x/no-duplicates': 'error',
  'import-x/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
      pathGroups: [
        {
          pattern: '~/**',
          group: 'internal',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['type'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'never',
      warnOnUnassignedImports: true,
    },
  ],
};
