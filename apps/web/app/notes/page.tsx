import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: '검색과 태그 필터를 사용해 필요한 학습 기록을 찾습니다.',
};

// 라우팅만 담당한다. 화면은 FSD pages 계층에서 가져온다.
export { NotesPage as default } from '@/pages/notes';
