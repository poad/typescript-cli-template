// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import tseslint from 'typescript-eslint';
// @ts-expect-error ignore type errors
import importPlugin from 'eslint-plugin-import';

import pluginPromise from 'eslint-plugin-promise'

import { includeIgnoreFile } from '@eslint/compat';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, "./.gitignore");

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['dist/'],
  },
  eslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ...importPlugin.flatConfigs.recommended,
    ...importPlugin.flatConfigs.typescript,
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
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/ts/indent': ['error', 2],
      "comma-dangle": ["error", "always-multiline"],
      "quotes": ["error", "single"],
      semi: ["error", "always"],
    }
  },
);
