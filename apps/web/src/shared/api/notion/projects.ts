import 'server-only';

import { getServerEnv } from '@/shared/config/env';

import { mapProjectPage } from './project-mapper';
import { queryPublished } from './query-published';
import type { ProjectSummary } from './types';

// 공개된 프로젝트 목록 (발행일 최신순)
export function getPublishedProjects(now: Date = new Date()): Promise<ProjectSummary[]> {
  return queryPublished({
    dataSourceId: getServerEnv().notionProjectsDataSourceId,
    map: mapProjectPage,
    kind: '프로젝트',
    now,
  });
}
