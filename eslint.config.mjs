import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginHtml from '@html-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    ignores: ['node_modules', '**/dist'],
  },
  {
    files: ['**/*.js'],
    languageOptions: { globals: globals.browser },
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
];
