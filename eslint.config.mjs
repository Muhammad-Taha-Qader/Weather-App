import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': pluginReactConfig,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
];
