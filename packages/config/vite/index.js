import { defineConfig, mergeConfig } from 'vite';

/**
 * 프레임워크에 종속되지 않는 기본 Vite 설정 생성
 * 개별 실험의 Vite 설정에서 필요한 옵션만 확장
 */
export function createViteConfig(config = {}) {
  return mergeConfig(
    defineConfig({
      clearScreen: false,
      build: {
        outDir: 'dist',
      },
    }),
    config,
  );
}
