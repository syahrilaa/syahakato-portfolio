import { rulesImportX } from './rules/rules-import-x.js';
import { rulesTurbo } from './rules/rules-turbo.js';
import { rulesTypescript } from './rules/rules-typescript.js';
import { rulesUnusedImports } from './rules/rules-unused-imports.js';

export const rules = {
  turbo: {
    recommended: rulesTurbo,
  },
  typescript: rulesTypescript,
  'import-x': rulesImportX,
  'unused-imports': rulesUnusedImports,
};
