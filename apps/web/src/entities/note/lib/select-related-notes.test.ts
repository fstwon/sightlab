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

  describe('연재', () => {
    const inSeries = (id: string, base: NoteSummary, name: string, order: number) => ({
      ...base,
      id,
      slug: id,
      series: { name, order },
    });
    const currentInSeries = inSeries('current', current, 'hooks-series', 3);

    it('같은 연재를 카테고리·태그보다 먼저 고른다', () => {
      const notes = [
        currentInSeries,
        note('same-category', 'react', ['hooks', 'state'], '2026-09-07'),
        inSeries('series', note('x', 'css', [], '2025-01-01'), 'hooks-series', 1),
      ];
      expect(ids(selectRelatedNotes(currentInSeries, notes, 1))).toEqual(['series']);
    });

    it('같은 연재 안에서는 연재 순서가 가까운 순', () => {
      const notes = [
        currentInSeries,
        inSeries('order-1', note('x', 'react', [], '2026-09-07'), 'hooks-series', 1),
        inSeries('order-4', note('x', 'react', [], '2026-01-01'), 'hooks-series', 4),
        inSeries('order-2', note('x', 'react', [], '2026-01-01'), 'hooks-series', 2),
      ];
      expect(ids(selectRelatedNotes(currentInSeries, notes))).toEqual(['order-4', 'order-2']);
    });

    it('다른 연재는 같은 연재로 치지 않는다', () => {
      const notes = [
        currentInSeries,
        inSeries('other-series', note('x', 'css', [], '2026-09-07'), 'other', 3),
        note('same-category', 'react', [], '2025-01-01'),
      ];
      expect(ids(selectRelatedNotes(currentInSeries, notes, 1))).toEqual(['same-category']);
    });

    it('같은 연재 글이 모자라면 나머지 규칙으로 채운다', () => {
      const notes = [
        currentInSeries,
        note('same-category', 'react', ['hooks'], '2026-09-01'),
        inSeries('series', note('x', 'css', [], '2025-01-01'), 'hooks-series', 2),
        note('other-category', 'vue', ['hooks'], '2026-09-07'),
      ];
      expect(ids(selectRelatedNotes(currentInSeries, notes))).toEqual(['series', 'same-category']);
    });

    it('현재 노트가 연재가 아니면 연재는 순서에 영향이 없다', () => {
      const notes = [
        current,
        inSeries('series', note('x', 'css', [], '2026-09-07'), 'hooks-series', 1),
        note('same-category', 'react', [], '2025-01-01'),
      ];
      expect(ids(selectRelatedNotes(current, notes, 1))).toEqual(['same-category']);
    });
  });
});
