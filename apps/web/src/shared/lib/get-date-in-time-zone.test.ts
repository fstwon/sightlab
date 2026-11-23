import { describe, expect, it } from 'vitest';

import { getDateInTimeZone } from '@/shared/lib/get-date-in-time-zone';

describe('getDateInTimeZone', () => {
  it('UTC 오후 3시 이후는 서울 기준으로 다음 날이다', () => {
    const date = new Date('2026-11-23T15:30:00Z');
    expect(getDateInTimeZone(date, 'UTC')).toBe('2026-11-23');
    expect(getDateInTimeZone(date, 'Asia/Seoul')).toBe('2026-11-24');
  });

  it('YYYY-MM-DD 형식으로 0을 채운다', () => {
    expect(getDateInTimeZone(new Date('2026-01-05T00:00:00Z'), 'UTC')).toBe('2026-01-05');
  });
});
