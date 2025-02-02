// @ts-check

import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import reactRecommendedPlugin from 'eslint-plugin-react/configs/recommended.js';
import reactJSXRuntimePlugin from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'test/**/*.ts', 'mock/**/*.ts', '.storybook/**/*.ts'],
    ...reactRecommendedPlugin,
    ...reactJSXRuntimePlugin,
    ignores: ['*.snap'],
    plugins: {
      '@typscript-eslint': tseslintPlugin,
      'import': importPlugin,
      'jsx-a11y': a11yPlugin,
      'react-hooks': reactHooksPlugin
    },
    languageOptions: {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
      'parser': tseslint.parser,
      'parserOptions': {
        'ecmaFeatures': {
          'jsx': true
        }
      },
      'globals': {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
        ...globals.jest
      },
      ...reactRecommendedPlugin.languageOptions,
      ...reactJSXRuntimePlugin.languageOptions
    },
    settings: {
      'react': {
        'version': 'detect'
      },
      'import/resolver': {
        'typescript': {}
      }
    },
    extends: [
      ...tseslint.configs.recommended,
      ...compat.config(a11yPlugin.configs.recommended),
      ...compat.config(reactHooksPlugin.configs.recommended)
    ],
    rules: {
      'default-param-last': 'off',
      'indent': ['error', 2, {
        'ignoredNodes': ['TemplateLiteral'],
        'SwitchCase': 1
      }],
      'key-spacing': 'off',
      'no-case-declarations': 'error',
      'no-console': 'warn',
      'no-constant-condition': 'off',
      'no-else-return': 'error',
      'no-multi-spaces': 'off',
      'no-unneeded-ternary': 'off',
      'no-unused-vars': ['off', { 'vars': 'all', 'args': 'after-used' }],
      'no-var': 'warn',
      'prefer-promise-reject-errors': 'off',
      'quote-props': 'off',
      'quotes': ['error', 'single'],
      'radix': 'warn',
      'semi': ['error', 'always'],
      'space-before-function-paren': 'off',
      'template-curly-spacing': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-use-before-define': 'error',
    }
  }
);
