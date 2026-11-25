import type { Metadata } from 'next';

import { OPEN_GRAPH_BASE } from '@/shared/config/site';

export const metadata: Metadata = {
  title: 'Notes',
  description: '검색과 태그 필터를 사용해 필요한 학습 기록을 찾습니다.',
  // 검색어·필터·페이지가 붙은 주소(/notes?q=react)도 대표 주소는 /notes 하나로 모은다
  alternates: { canonical: '/notes' },
  openGraph: { ...OPEN_GRAPH_BASE, type: 'website', url: '/notes' },
};

// 라우팅만 담당한다. 화면은 FSD pages 계층에서 가져온다.
export { NotesPage as default } from '@/pages/notes';
