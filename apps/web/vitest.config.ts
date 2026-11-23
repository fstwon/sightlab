import { baseConfig } from '@sightlab/vitest-config/base';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    // tsconfig의 경로 별칭(@/* → src/*)을 테스트에서도 쓴다 (Vite 내장 기능)
    resolve: { tsconfigPaths: true },
  }),
);
