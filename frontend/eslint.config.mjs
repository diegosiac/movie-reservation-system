import { builtinModules } from 'module';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended'
  ),
  eslintConfigPrettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.js',
      },
    },

    rules: {
      'no-console': 'warn',

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      'sort-imports': 'off',
      'tailwindcss/no-custom-classname': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      'simple-import-sort/imports': [
        2,
        {
          groups: [
            ['^.+\\.s?css$'],
            [`^(${builtinModules.join('|')})(/|$)`, '^react', '^@?\\w'],
            ['^components(/.*|$)'],
            ['^lib(/.*|$)', '^hooks(/.*|$)'],
            ['^\\.'],
          ],
        },
      ],
    },

    ignores: [
      'dist/*',
      '.cache',
      'public',
      'node_modules',
      '*.esm.js',
      '/out',
      '.next/',
    ],
  },
];

export default config;
