// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ProjectSummary } from '@/shared/api/notion';

import { ProjectCard } from './project-card';

const PROJECT: ProjectSummary = {
  id: 'project-1',
  slug: 'sightlab',
  title: 'Sightlab',
  summary: '학습 기록과 복습 경험을 하나의 흐름으로 연결합니다.',
  publishedAt: '2026-11-01',
  updatedAt: '2026-11-20T00:00:00.000Z',
  role: 'Frontend',
  stack: [{ name: 'React', slug: 'react' }],
  progress: { name: 'In progress', slug: 'in-progress' },
  preview: null,
  noteIds: [],
};

describe('ProjectCard 미리보기', () => {
  it('이미지가 없으면 번호와 진행 상태를 보여 준다', () => {
    const { container } = render(<ProjectCard project={PROJECT} index={1} connectedNotes={0} />);

    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('01')).toBeTruthy();
    expect(screen.getByText('In progress')).toBeTruthy();
  });

  it('이미지가 있으면 장식 이미지(alt 빈 값)와 진행 상태 배지를 보여 주고 번호는 뺀다', () => {
    const url = 'https://store.public.blob.vercel-storage.com/projects/abc.png';
    const { container } = render(
      <ProjectCard
        project={{ ...PROJECT, preview: { name: 'cover.png', url } }}
        index={1}
        connectedNotes={0}
      />,
    );

    const image = container.querySelector('img');
    expect(image?.getAttribute('src')).toBe(url);
    expect(image?.getAttribute('alt')).toBe('');
    expect(screen.queryByText('01')).toBeNull();
    expect(screen.getByText('In progress')).toBeTruthy();
  });
});
