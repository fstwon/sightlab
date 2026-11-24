import { baseConfig } from '@sightlab/vitest-config/base';
import type { Plugin } from 'vite';
import { defineConfig, mergeConfig } from 'vitest/config';

// 앱에서는 next.config.ts의 SVGR이 SVG를 React 컴포넌트로 바꾸지만, Vite는 SVG를 이미지 주소로 불러온다.
// 테스트에서는 아무것도 그리지 않는 컴포넌트로 대신한다 (아이콘은 장식이라 테스트 대상이 아님).
// SVG 파일은 react를 의존하지 않는 icons 패키지에 있어서, 여기서 react를 import하면 찾지 못한다.
const svgAsComponent: Plugin = {
  name: 'sightlab:svg-as-component',
  enforce: 'pre',
  load(id) {
    if (!id.split('?')[0]?.endsWith('.svg')) return null;
    return 'export default function SvgStub() { return null; }';
  },
};

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [svgAsComponent],
    // tsconfig의 경로 별칭(@/* → src/*)을 테스트에서도 쓴다 (Vite 내장 기능)
    resolve: { tsconfigPaths: true },
    // Next용 tsconfig는 JSX를 그대로 두는(preserve) 설정이라, 테스트에서는 Vite 내장 변환기(oxc)가
    // React 자동 런타임(react/jsx-runtime)으로 JSX를 바꾸게 한다.
    oxc: { jsx: { runtime: 'automatic' } },
    test: {
      // 컴포넌트 테스트 뒤 화면 정리. 기본 환경은 node, 컴포넌트 테스트 파일만
      // 맨 위 주석(// @vitest-environment jsdom)으로 브라우저 흉내 환경을 쓴다.
      setupFiles: ['./vitest.setup.ts'],
    },
  }),
);
