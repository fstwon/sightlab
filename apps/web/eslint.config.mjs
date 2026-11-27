import { nextConfig } from '@sightlab/eslint-config/next';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  nextConfig,
  // playwright-report·test-results는 E2E가 만든 결과물 (실패하면 보고서용 스크립트가 함께 생김)
  globalIgnores(['.next/', 'next-env.d.ts', 'playwright-report/', 'test-results/']),
  {
    languageOptions: { parserOptions: { tsconfigRootDir: import.meta.dirname } },
  },
);
