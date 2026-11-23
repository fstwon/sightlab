import { nextConfig } from '@sightlab/eslint-config/next';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(nextConfig, globalIgnores(['.next/', 'next-env.d.ts']), {
  languageOptions: { parserOptions: { tsconfigRootDir: import.meta.dirname } },
});
