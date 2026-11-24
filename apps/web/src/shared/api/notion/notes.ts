import 'server-only';

import { getServerEnv } from '@/shared/config/env';

import { mapNoteEntry } from './note-entry-mapper';
import { queryPublished } from './query-published';
import type { NoteEntry } from './types';

// 공개된 노트 목록 (발행일 최신순). 한 건마다 목록 값(summary)과 상세 전용 값(extras)을 함께 돌려준다.
// 목록 조회 응답에 모든 속성이 들어 있어, 상세 화면이 속성을 다시 조회하지 않아도 된다.
export function getPublishedNoteEntries(now: Date = new Date()): Promise<NoteEntry[]> {
  return queryPublished({
    dataSourceId: getServerEnv().notionNotesDataSourceId,
    map: mapNoteEntry,
    kind: '노트',
    now,
  });
}
