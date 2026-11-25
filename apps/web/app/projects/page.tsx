import type { Metadata } from 'next';

import { OPEN_GRAPH_BASE } from '@/shared/config/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: '프로젝트의 목표와 해결한 문제, 연결된 학습 기록을 함께 살펴봅니다.',
  alternates: { canonical: '/projects' },
  openGraph: { ...OPEN_GRAPH_BASE, type: 'website', url: '/projects' },
};

// 라우팅만 담당한다. 화면은 FSD pages 계층에서 가져온다.
export { ProjectsPage as default } from '@/pages/projects';
