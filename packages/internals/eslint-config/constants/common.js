export const SOURCE_FILES = ['**/*.{js,mjs,cjs,jsx,ts,tsx}'];

export const TS_FILES = ['**/*.{ts,tsx}'];

export const JS_FILES = ['**/*.{js,mjs,cjs,jsx}'];

export const IGNORE_BASE = [
  '**/.temp/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/.cache/**',
  '**/.build/**',
  '**/.vercel/**',
  '**/.DS_Store',
  '**/dist/**',
  '**/public/**',
  '**/node_modules/**',
  '**/coverage/**',
  '**/pnpm-lock.yaml',
  '**/next-env.d.ts',
  '!.vscode/**',
  '!scripts/**',
];
