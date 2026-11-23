import { describe, expect, it } from 'vitest';

import { formatDate } from '@/shared/lib/format-date';

describe('formatDate', () => {
  it('YYYY-MM-DD를 YYYY.MM.DD로 바꾼다', () => {
    expect(formatDate('2026-09-07')).toBe('2026.09.07');
  });

  it('시각이 붙어 있어도 날짜만 쓴다', () => {
    expect(formatDate('2026-11-23T09:00:00.000+09:00')).toBe('2026.11.23');
  });
});
