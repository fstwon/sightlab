import type { Metadata } from 'next';

import { OPEN_GRAPH_BASE } from '@/shared/config/site';

// 제목·설명은 레이아웃 기본값(Sightlab)을 쓰고, 대표 주소와 링크 미리보기만 정한다
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { ...OPEN_GRAPH_BASE, type: 'website', url: '/' },
};

// 라우팅만 담당한다. 화면은 FSD pages 계층에서 가져온다.
export { HomePage as default } from '@/pages/home';
