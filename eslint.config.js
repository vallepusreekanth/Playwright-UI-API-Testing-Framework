const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');
const playwright = require('eslint-plugin-playwright');

module.exports = [
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
            'playwright': playwright,
        },
        rules: {
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'playwright/missing-playwright-await': 'error',
            'playwright/no-commented-out-tests': 'warn',
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