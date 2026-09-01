import prettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import-x';
import pluginOnlyWarn from 'eslint-plugin-only-warn';
import turbo from 'eslint-plugin-turbo';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { IGNORE_BASE, JS_FILES, SOURCE_FILES } from './constants/common.js';
import { configs } from './eslint-config.js';
import { rules } from './eslint-rules.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export const config = [
  {
    ignores: [...IGNORE_BASE],
  },
  configs.recommended.js,
  ...configs.recommended['ts-type-check'],
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
      reportUnusedInlineConfigs: 'warn',
    },
  },
  {
    files: SOURCE_FILES,
    plugins: { turbo },
    rules: {
      ...rules.turbo.recommended,
    },
  },
  {
    files: SOURCE_FILES,
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.serviceworker,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
    plugins: {
      'only-warn': pluginOnlyWarn,
      'import-x': pluginImport,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      ...rules.typescript,
      'object-shorthand': ['error', 'always'],
      'prefer-const': ['error', { destructuring: 'all' }],

      ...rules['import-x'],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      'no-console': 'warn',
      'no-unused-vars': 'off',
      'no-duplicate-imports': 'off',

      ...rules['unused-imports'],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
  },
  {
    files: JS_FILES,
    ...configs.recommended['ts-disable-check'],
  },
  prettier,
];
