import tseslint from 'typescript-eslint';

export default [
  { ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**', '**/coverage/**', '**/*.tsbuildinfo'] },
  ...tseslint.configs.recommended,
];
