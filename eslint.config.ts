import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { configs, parser } from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error ignore type errors
import pluginPromise from 'eslint-plugin-promise';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, './.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['dist/'],
  },
  eslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  ...configs.strict,
  ...configs.stylistic,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}', '*.config.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        allowDefaultProject: ['eslint.config.ts', 'vite.config.ts'],
      },
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
