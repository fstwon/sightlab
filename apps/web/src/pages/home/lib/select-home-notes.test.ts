import { describe, expect, it } from 'vitest';

import { selectHomeNotes } from './select-home-notes';

describe('selectHomeNotes', () => {
  it('노트가 없으면 Featured는 null, Recent는 빈 배열이다', () => {
    expect(selectHomeNotes([])).toEqual({ featured: null, recent: [] });
  });

  it('노트가 1개면 Featured만 있다', () => {
    expect(selectHomeNotes(['a'])).toEqual({ featured: 'a', recent: [] });
  });

  it('가장 최근 노트가 Featured, 그다음 3개가 Recent다 (겹치지 않음)', () => {
    expect(selectHomeNotes(['a', 'b', 'c', 'd'])).toEqual({
      featured: 'a',
      recent: ['b', 'c', 'd'],
    });
    expect(selectHomeNotes(['a', 'b', 'c', 'd', 'e', 'f'])).toEqual({
      featured: 'a',
      recent: ['b', 'c', 'd'],
    });
  });
});
