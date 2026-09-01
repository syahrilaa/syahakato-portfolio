import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export const configs = {
  recommended: {
    js: eslint.configs.recommended,
    'ts-base': tseslint.configs.recommended,
    'ts-type-check': tseslint.configs.recommendedTypeChecked,
    'ts-disable-check': tseslint.configs.disableTypeChecked,
  },
};
