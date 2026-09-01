import react from '@eslint-react/eslint-plugin';
import globals from 'globals';
import * as base from './base.js';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export const config = [
  ...base.config,
  react.configs['recommended-typescript'],
  {
    languageOptions: {
      ...react.configs['recommended-typescript'].languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['recommended-typescript'].rules,
      '@eslint-react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
