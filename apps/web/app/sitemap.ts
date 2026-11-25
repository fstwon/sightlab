import type { MetadataRoute } from 'next';

import { getNotes } from '@/entities/note/server';
import { getProjects } from '@/entities/project/server';
import { getSiteUrl } from '@/shared/config/env';
import { buildSitemapEntries } from '@/shared/lib/build-sitemap-entries';

// /sitemap.xml을 만드는 Next 특수 파일. 빌드 때 정적 파일로 만들어진다.
// 목록 페이지와 같은 캐시 결과를 써서 Notion 호출은 늘지 않는다.
// Next 필수 파일이라 default export (D10 named export 규칙의 예외)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [notes, projects] = await Promise.all([getNotes(), getProjects()]);
  return buildSitemapEntries({ siteUrl: getSiteUrl(), notes, projects });
}
