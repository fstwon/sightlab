import { describe, expect, it } from 'vitest';

import type { ProjectSummary } from '@/shared/api/notion';

import { getProjectOgContent } from './get-project-og-content';

const label = (name: string) => ({ name, slug: name.toLowerCase() });

const base: ProjectSummary = {
  id: 'id',
  slug: 'sightlab',
  title: 'Sightlab',
  summary: '학습 기록과 복습 경험을 하나의 흐름으로 연결합니다.',
  publishedAt: '2026-11-01',
  updatedAt: '2026-11-01T00:00:00.000Z',
  role: '',
  stack: [label('Next.js'), label('Turborepo'), label('Notion')],
  progress: label('In progress'),
  preview: null,
  noteIds: [],
};

describe('getProjectOgContent', () => {
  it('진행 상태를 눈썹 글에, 스택을 아래 줄에 넣는다', () => {
    expect(getProjectOgContent(base)).toEqual({
      eyebrow: 'Project · In progress',
      title: 'Sightlab',
      summary: '학습 기록과 복습 경험을 하나의 흐름으로 연결합니다.',
      meta: 'Next.js · Turborepo · Notion',
    });
  });

  it('스택은 앞의 3개만 넣는다', () => {
    const project = { ...base, stack: [...base.stack, label('Vercel')] };
    expect(getProjectOgContent(project).meta).toBe('Next.js · Turborepo · Notion');
  });

  it('요약·스택이 비어 있으면 그 줄을 넣지 않는다', () => {
    const content = getProjectOgContent({ ...base, summary: '', stack: [] });
    expect(content).not.toHaveProperty('summary');
    expect(content).not.toHaveProperty('meta');
  });
});
