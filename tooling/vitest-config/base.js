// 앱·패키지가 확장하는 Vitest 기본 설정. 소비 쪽 vitest.config.ts에서 mergeConfig로 덧붙인다.
// 런타임 의존성 없이 객체만 내보낸다 (vitest는 소비 패키지가 설치).

/** @type {import('vitest/config').ViteUserConfig} */
export const baseConfig = {
  test: {
    // 테스트는 대상 옆에 둔다 (D10·D13): foo.ts ↔ foo.test.ts
    include: ['src/**/*.test.{ts,tsx}'],
    // 기본은 Node 환경 (순수 함수·데이터 층). DOM이 필요한 파일은 맨 위에 `// @vitest-environment jsdom`
    environment: 'node',
    // 테스트 사이에 mock 상태가 섞이지 않도록 매번 원래대로 되돌린다 (clearMocks는 Vitest 5 기본값)
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
  },
};
