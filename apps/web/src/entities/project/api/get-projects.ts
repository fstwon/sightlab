import { cacheLife, cacheTag } from 'next/cache';

import { copyToAssetStorage } from '@/shared/api/asset-storage';
import { getPublishedProjects, type ProjectSummary } from '@/shared/api/notion';

// 미리보기 이미지를 Blob에 복사한 주소로 바꾼다 (Notion 이미지 주소는 1시간 뒤 만료, D4-5).
// 복사하지 못하면 미리보기 없이 둔다 (화면은 자리 표시를 그린다).
async function withStoredPreview(project: ProjectSummary): Promise<ProjectSummary> {
  if (!project.preview) return project;
  const url = await copyToAssetStorage('projects', project.preview.url);
  return { ...project, preview: url ? { ...project.preview, url } : null };
}

// 공개된 프로젝트 목록의 캐시 층 (D0-2 ③). 캐시 기간·이름표를 정한 이유는 entities/note/api/get-notes.ts와 같다.
// 캐시 안에서 이미지를 복사하므로 빌드 중 한 번만 복사한다.
export async function getProjects(): Promise<ProjectSummary[]> {
  'use cache';
  cacheLife('days');
  cacheTag('projects');
  return Promise.all((await getPublishedProjects()).map(withStoredPreview));
}
