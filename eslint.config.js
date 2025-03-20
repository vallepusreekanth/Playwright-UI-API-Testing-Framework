import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 12,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            }
        },
        plugins: {
            '@typescript-eslint': ts,
        },
        rules: {
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    {
        ignores: [
            'node_modules/',
            'assets/',
            'playwright-report/',
            'test-results/',
            'reports/',
            'test-data/'
        ],
    },
];