import { afterEach } from 'vitest';

// 컴포넌트 테스트(jsdom 환경)는 테스트마다 그린 화면을 지운다.
// Testing Library의 자동 정리는 전역 afterEach(globals: true)가 있어야 동작해서 직접 등록한다.
// node 환경 테스트에서는 document가 없으므로 건너뛴다.
afterEach(async () => {
  if (typeof document === 'undefined') return;
  const { cleanup } = await import('@testing-library/react');
  cleanup();
});
