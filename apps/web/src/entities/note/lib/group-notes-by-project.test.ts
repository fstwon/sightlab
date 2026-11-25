import { describe, expect, it } from 'vitest';

import type { NoteSummary } from '@/shared/api/notion';

import { groupNotesByProject } from './group-notes-by-project';

function note(id: string, projectId: string | null): NoteSummary {
  return {
    id,
    slug: id,
    title: id,
    summary: '',
    publishedAt: '2026-09-07',
    updatedAt: '2026-09-07T00:00:00.000Z',
    category: { name: 'React', slug: 'react' },
    type: { name: '노트', slug: 'note' },
    tags: [],
    series: null,
    projectId,
  };
}

describe('groupNotesByProject', () => {
  it('프로젝트 id별로 노트를 들어온 순서대로 묶는다', () => {
    const groups = groupNotesByProject([note('a', 'p1'), note('b', 'p2'), note('c', 'p1')]);
    expect(groups.get('p1')?.map((item) => item.id)).toEqual(['a', 'c']);
    expect(groups.get('p2')?.map((item) => item.id)).toEqual(['b']);
  });

  it('프로젝트에 연결되지 않은 노트는 넣지 않는다', () => {
    const groups = groupNotesByProject([note('a', null)]);
    expect(groups.size).toBe(0);
  });
});
