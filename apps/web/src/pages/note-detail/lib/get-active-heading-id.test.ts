import { describe, expect, it } from 'vitest';

import { getActiveHeadingId } from './get-active-heading-id';

const LINE = 96;

describe('getActiveHeadingId', () => {
  it('제목이 없으면 null', () => {
    expect(getActiveHeadingId([], LINE, false)).toBeNull();
  });

  it('첫 제목이 기준선에 닿기 전이면 null', () => {
    const headings = [
      { id: 'a', top: 300 },
      { id: 'b', top: 900 },
    ];
    expect(getActiveHeadingId(headings, LINE, false)).toBeNull();
  });

  it('기준선을 지난 제목 중 마지막 것을 고른다', () => {
    const headings = [
      { id: 'a', top: -400 },
      { id: 'b', top: 40 },
      { id: 'c', top: 500 },
    ];
    expect(getActiveHeadingId(headings, LINE, false)).toBe('b');
  });

  it('기준선에 딱 닿은 제목도 지난 것으로 본다', () => {
    const headings = [
      { id: 'a', top: -10 },
      { id: 'b', top: LINE },
    ];
    expect(getActiveHeadingId(headings, LINE, false)).toBe('b');
  });

  it('페이지 끝에 닿으면 마지막 제목', () => {
    const headings = [
      { id: 'a', top: -400 },
      { id: 'b', top: 300 },
    ];
    expect(getActiveHeadingId(headings, LINE, true)).toBe('b');
  });
});
