import { cacheLife, cacheTag } from 'next/cache';

import type { ProjectSummary } from '@/shared/api/notion';

import { getProjects } from './get-projects';

// 프로젝트 상세의 캐시 층. 프로젝트에는 본문이 없어 캐시된 공개 목록에서 slug로 찾기만 한다 (Notion 호출 없음).
// 공개 목록에 없는 slug면 null (404).
export async function getProject(slug: string): Promise<ProjectSummary | null> {
  'use cache';
  cacheLife('max');
  cacheTag('projects');
  return (await getProjects()).find((project) => project.slug === slug) ?? null;
}

// 빌드 때 미리 만들 프로젝트 상세 주소 목록 (generateStaticParams)
export async function getProjectSlugs(): Promise<string[]> {
  'use cache';
  cacheLife('max');
  cacheTag('projects');
  return (await getProjects()).map((project) => project.slug);
}
