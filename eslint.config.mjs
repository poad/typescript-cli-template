// @ts-check

import eslint from '@eslint/js';

import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      '**/*.d.ts',
      '*.{js,jsx}',
      'app/tsconfig.json',
      'app/stories',
      '**/*.css',
      'node_modules/**/*',
      './.next/*',
      'out',
      '.storybook',
    ],
    files: ['app/**/*.{js,jsx,ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    // @ts-ignore
    rules: {
      ...prettier.rules,
    },
  },
);
