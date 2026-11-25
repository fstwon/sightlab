import { describe, expect, it } from 'vitest';

import type { NoteSummary } from '@/shared/api/notion';

import { selectRelatedNotes } from './select-related-notes';

function note(id: string, category: string, tags: string[], publishedAt: string): NoteSummary {
  return {
    id,
    slug: id,
    title: id,
    summary: '',
    publishedAt,
    updatedAt: `${publishedAt}T00:00:00.000Z`,
    category: { name: category, slug: category },
    type: { name: '노트', slug: 'note' },
    tags: tags.map((tag) => ({ name: tag, slug: tag })),
    series: null,
    projectId: null,
  };
}

const ids = (notes: NoteSummary[]) => notes.map((item) => item.id);

describe('selectRelatedNotes', () => {
  const current = note('current', 'react', ['hooks', 'state'], '2026-09-07');

  it('현재 노트는 빼고, 다른 노트가 없으면 빈 목록', () => {
    expect(selectRelatedNotes(current, [current])).toEqual([]);
  });

  it('같은 카테고리를 태그 수보다 먼저 고른다', () => {
    const notes = [
      current,
      note('other-category', 'vue', ['hooks', 'state'], '2026-09-07'),
      note('same-category', 'react', [], '2026-01-01'),
    ];
    expect(ids(selectRelatedNotes(current, notes, 1))).toEqual(['same-category']);
  });

  it('카테고리가 같으면 겹치는 태그가 많은 순', () => {
    const notes = [
      current,
      note('one-tag', 'react', ['hooks'], '2026-09-06'),
      note('two-tags', 'react', ['hooks', 'state'], '2026-01-01'),
      note('no-tag', 'react', ['css'], '2026-09-07'),
    ];
    expect(ids(selectRelatedNotes(current, notes))).toEqual(['two-tags', 'one-tag']);
  });

  it('카테고리·태그가 같으면 발행일이 가까운 순 (앞뒤 구분 없음)', () => {
    const notes = [
      current,
      note('far', 'react', ['hooks'], '2026-01-01'),
      note('after', 'react', ['hooks'], '2026-09-10'),
      note('before', 'react', ['hooks'], '2026-09-01'),
    ];
    expect(ids(selectRelatedNotes(current, notes))).toEqual(['after', 'before']);
  });

  it('겹치는 점이 없어도 다른 노트로 채운다', () => {
    const notes = [current, note('unrelated', 'css', ['grid'], '2025-01-01')];
    expect(ids(selectRelatedNotes(current, notes))).toEqual(['unrelated']);
  });
});
