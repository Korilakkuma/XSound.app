// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import nPlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'test/**/*.ts', 'mock/**/*.ts', '.storybook/**/*.ts'],
    ignores: ['*.snap'],
    plugins: {
      '@typescript-lint': tseslint.plugin,
      'jest': jestPlugin,
      'a11y': a11yPlugin,
      'n': nPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    languageOptions: {
      'parser': tseslint.parser
    },
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
    },
    settings: {
      'import/resolver': {
        'typescript': {}
      },
      'react': {
        'version': "detect"
      }
    }
  }
);
