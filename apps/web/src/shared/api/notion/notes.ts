import 'server-only';

import { getServerEnv } from '@/shared/config/env';

import { mapNotePage } from './note-mapper';
import { queryPublished } from './query-published';
import type { NoteSummary } from './types';

// 공개된 노트 목록 (발행일 최신순)
export function getPublishedNotes(now: Date = new Date()): Promise<NoteSummary[]> {
  return queryPublished({
    dataSourceId: getServerEnv().notionNotesDataSourceId,
    map: mapNotePage,
    kind: '노트',
    now,
  });
}
