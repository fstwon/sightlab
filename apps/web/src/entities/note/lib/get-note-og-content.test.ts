import { describe, expect, it } from 'vitest';

import type { NoteSummary } from '@/shared/api/notion';

import { getNoteOgContent } from './get-note-og-content';

const base: NoteSummary = {
  id: 'id',
  slug: 'cache-revalidation',
  title: '서버 캐시 재검증',
  summary: 'Notion 웹훅으로 글 갱신을 반영한다',
  publishedAt: '2026-11-26',
  updatedAt: '2026-11-26T00:00:00.000Z',
  category: { name: 'Next.js', slug: 'nextjs' },
  type: { name: '노트', slug: 'note' },
  tags: [],
  series: null,
  projectId: null,
};

describe('getNoteOgContent', () => {
  it('카테고리를 눈썹 글에, 제목·요약을 그대로 넣는다', () => {
    expect(getNoteOgContent(base)).toEqual({
      eyebrow: 'Note · Next.js',
      title: '서버 캐시 재검증',
      summary: 'Notion 웹훅으로 글 갱신을 반영한다',
      meta: '2026.11.26',
    });
  });

  it('연재가 있으면 아래 줄에 연재 이름과 순서를 붙인다', () => {
    const note = { ...base, series: { name: 'Sightlab 회고', order: 3 } };
    expect(getNoteOgContent(note).meta).toBe('Sightlab 회고 #3 · 2026.11.26');
  });

  it('요약이 비어 있으면 요약 줄을 넣지 않는다', () => {
    expect(getNoteOgContent({ ...base, summary: '' })).not.toHaveProperty('summary');
  });
});
