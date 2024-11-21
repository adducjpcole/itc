import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginJsdoc from 'eslint-plugin-jsdoc';
import pluginImport from 'eslint-plugin-import';
import pluginHtml from '@html-eslint/eslint-plugin';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginImport.flatConfigs.recommended,
  pluginJsdoc.configs['flat/recommended'],
  {
    ignores: ['node_modules', '**/dist'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      'jsdoc/tag-lines': ['error' | 'warn', 'any', { startLines: 1 }],
      'jsdoc/check-tag-names': [
        'error' | 'warn',
        { enableFixer: false, typed: true },
      ],
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-param-description': 'off',
    },
  },
  {
    files: ['**/main.js'],
    rules: {
      // Assume everything is globally available; get errors at runtime.
      'no-undef': 'off',
    },
  },
  {
    ignores: ['**/main.js'],
    files: ['**/*.js'],
    rules: {
      // Assume anything not 'main.js' is going to be used in the main.js file
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^(GLOBAL_|SHARED_)',
        },
      ],
    },
  },
  {
    ...pluginHtml.configs['flat/recommended'],
    files: ['**/*.html'],
    rules: {
      ...pluginHtml.configs['flat/recommended'].rules,
      '@html-eslint/require-closing-tags': [
        'error',
        {
          selfClosing: 'always',
        },
      ],
      // Turn off any styling rules
      '@html-eslint/attrs-newline': 'off',
      '@html-eslint/indent': 'off',
      '@html-eslint/no-extra-spacing-attrs': 'off',
    },
  },
  configPrettier,
];
