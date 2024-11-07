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
    rules: {
      // Use jsconfig.json
      'no-undef': 'off',
    },
  },
  {
    ignores: ['**/main.js'],
    files: ['**/*.js'],
    rules: {
      // Assume anything not min.js is included in the index.html file
      'no-unused-vars': 'warn',
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
