import { describe, expect, it } from 'vitest';

import { getReadingProgress } from './get-reading-progress';

const VIEWPORT = 800;

describe('getReadingProgress', () => {
  it('본문 시작이 아직 화면 위에 닿지 않았으면 0', () => {
    expect(getReadingProgress({ top: 200, height: 3000 }, VIEWPORT)).toBe(0);
  });

  it('지나간 길이를 본문 높이 - 화면 높이로 나눈다', () => {
    // 스크롤할 거리 2200 중 1100을 지남
    expect(getReadingProgress({ top: -1100, height: 3000 }, VIEWPORT)).toBe(0.5);
  });

  it('본문 끝이 화면 아래에 닿은 뒤로는 1', () => {
    expect(getReadingProgress({ top: -2600, height: 3000 }, VIEWPORT)).toBe(1);
  });

  it('본문이 화면보다 짧으면 1', () => {
    expect(getReadingProgress({ top: 100, height: 500 }, VIEWPORT)).toBe(1);
  });
});
