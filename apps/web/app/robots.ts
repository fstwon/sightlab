import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/shared/config/env';

// /robots.txt를 만드는 Next 특수 파일. 모든 검색 로봇에게 전체 공개 페이지를 허용하고 sitemap 위치를 알린다.
// PR 미리보기 배포는 Vercel이 따로 noindex 헤더를 붙이므로 여기서 나누지 않는다.
// Next 필수 파일이라 default export (D10 named export 규칙의 예외)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
