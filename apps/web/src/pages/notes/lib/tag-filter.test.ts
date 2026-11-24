import { describe, expect, it } from 'vitest';

import { buildNotesHref, readNotesQuery } from './notes-query';
import { filterByTags, getTagOptions, selectExistingTags, toggleTag } from './tag-filter';

const tag = (name: string) => ({ name, slug: name.toLowerCase().replace('.', '') });
const notes = [
  { id: 1, tags: [tag('React'), tag('Next.js')] },
  { id: 2, tags: [tag('React'), tag('CSS')] },
  { id: 3, tags: [tag('Next.js'), tag('React'), tag('Testing')] },
  { id: 4, tags: [] },
];
const ids = (list: { id: number }[]) => list.map((note) => note.id);

describe('getTagOptions', () => {
  it('태그별 노트 수를 세고, 많은 순·같으면 이름순으로 정렬한다', () => {
    expect(getTagOptions(notes)).toEqual([
      { name: 'React', slug: 'react', count: 3 },
      { name: 'Next.js', slug: 'nextjs', count: 2 },
      { name: 'CSS', slug: 'css', count: 1 },
      { name: 'Testing', slug: 'testing', count: 1 },
    ]);
  });
});

describe('selectExistingTags', () => {
  it('있는 태그만 URL 순서대로 남긴다', () => {
    expect(selectExistingTags(['css', 'zustand', 'react'], getTagOptions(notes))).toEqual([
      'css',
      'react',
    ]);
  });
});

describe('filterByTags', () => {
  it('선택이 없으면 전체', () => {
    expect(ids(filterByTags(notes, []))).toEqual([1, 2, 3, 4]);
  });

  it('선택한 태그를 모두 가진 노트만 남긴다 (AND)', () => {
    expect(ids(filterByTags(notes, ['react']))).toEqual([1, 2, 3]);
    expect(ids(filterByTags(notes, ['react', 'nextjs']))).toEqual([1, 3]);
    expect(ids(filterByTags(notes, ['css', 'testing']))).toEqual([]);
  });
});

describe('toggleTag', () => {
  it('없으면 뒤에 붙이고, 있으면 뺀다', () => {
    expect(toggleTag(['react'], 'css')).toEqual(['react', 'css']);
    expect(toggleTag(['react', 'css'], 'react')).toEqual(['css']);
  });
});

describe('태그 URL', () => {
  it('?tags=를 쉼표로 나누고 빈 값·중복을 뺀다', () => {
    expect(readNotesQuery(new URLSearchParams('tags=react,,nextjs,react')).tags).toEqual([
      'react',
      'nextjs',
    ]);
    expect(readNotesQuery(new URLSearchParams('')).tags).toEqual([]);
  });

  it('주소에는 쉼표를 그대로 쓰고, 검색어·태그·페이지 순으로 담는다', () => {
    expect(buildNotesHref({ tags: ['react', 'nextjs'] })).toBe('/notes?tags=react,nextjs');
    expect(buildNotesHref({ q: 'hook', tags: ['react'], page: 2 })).toBe(
      '/notes?q=hook&tags=react&page=2',
    );
    expect(buildNotesHref({ tags: [] })).toBe('/notes');
  });

  it('만든 주소를 다시 읽으면 같은 상태다', () => {
    const href = buildNotesHref({ q: '상태 설계', tags: ['react', 'nextjs'], page: 3 });
    const params = new URLSearchParams(href.split('?')[1]);
    expect(readNotesQuery(params)).toEqual({
      q: '상태 설계',
      tags: ['react', 'nextjs'],
      page: '3',
    });
  });
});
