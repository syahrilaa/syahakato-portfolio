import pluginNext from '@next/eslint-plugin-next';
import globals from 'globals';
import * as react from './react-library.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export const config = [
  ...react.config,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      'no-console': 'off',

      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
