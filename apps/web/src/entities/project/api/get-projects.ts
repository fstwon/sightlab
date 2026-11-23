import { cacheLife, cacheTag } from 'next/cache';

import { getPublishedProjects, type ProjectSummary } from '@/shared/api/notion';

// 공개된 프로젝트 목록의 캐시 층 (D0-2 ③). 캐시 기간·이름표를 정한 이유는 entities/note/api/get-notes.ts와 같다.
export async function getProjects(): Promise<ProjectSummary[]> {
  'use cache';
  cacheLife('max');
  cacheTag('projects');
  return getPublishedProjects();
}
