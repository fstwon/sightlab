import { describe, expect, it } from 'vitest';

import { buildNotesHref, readNotesQuery } from './notes-query';
import { searchNotes } from './search-notes';

const notes = [
  { id: 1, title: 'React 상태 설계', summary: 'Context 분리 기준을 정리합니다.' },
  { id: 2, title: '타입이 설명하는 컴포넌트', summary: 'Props 모델링으로 오류를 줄입니다.' },
  { id: 3, title: 'JWT 인증 흐름', summary: 'Access Token과 Refresh Token의 책임' },
];
const ids = (list: { id: number }[]) => list.map((note) => note.id);

describe('searchNotes', () => {
  it('빈 검색어면 전체를 돌려준다', () => {
    expect(ids(searchNotes(notes, ''))).toEqual([1, 2, 3]);
    expect(ids(searchNotes(notes, '   '))).toEqual([1, 2, 3]);
  });

  it('제목과 요약에서 대소문자를 무시하고 찾는다', () => {
    expect(ids(searchNotes(notes, 'react'))).toEqual([1]);
    expect(ids(searchNotes(notes, 'PROPS'))).toEqual([2]);
  });

  it('낱말이 모두 들어간 노트만 남긴다 (순서 무관)', () => {
    expect(ids(searchNotes(notes, 'token 인증'))).toEqual([3]);
    expect(ids(searchNotes(notes, 'token react'))).toEqual([]);
  });

  it('전각 문자도 같은 글자로 본다 (NFKC)', () => {
    expect(ids(searchNotes(notes, 'ＪＷＴ'))).toEqual([3]);
  });
});

describe('readNotesQuery', () => {
  it('검색어는 앞뒤 공백을 빼고, 없으면 빈 문자열이다', () => {
    expect(readNotesQuery(new URLSearchParams('q=%20react%20&page=2'))).toEqual({
      q: 'react',
      tags: [],
      page: '2',
    });
    expect(readNotesQuery(null)).toEqual({ q: '', tags: [], page: null });
  });
});

describe('buildNotesHref', () => {
  it('빈 검색어와 1페이지는 주소에서 뺀다', () => {
    expect(buildNotesHref({})).toBe('/notes');
    expect(buildNotesHref({ q: '  ', page: 1 })).toBe('/notes');
  });

  it('검색어와 페이지를 함께 담는다', () => {
    expect(buildNotesHref({ q: 'react' })).toBe('/notes?q=react');
    expect(buildNotesHref({ q: 'react', page: 2 })).toBe('/notes?q=react&page=2');
    expect(buildNotesHref({ page: 3 })).toBe('/notes?page=3');
  });

  it('검색어는 URL 형식으로 인코딩한다', () => {
    expect(buildNotesHref({ q: '상태 설계' })).toBe(
      '/notes?q=%EC%83%81%ED%83%9C+%EC%84%A4%EA%B3%84',
    );
  });
});
