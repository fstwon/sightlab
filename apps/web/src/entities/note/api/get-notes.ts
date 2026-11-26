import { cacheLife, cacheTag } from 'next/cache';

import type { NoteSummary } from '@/shared/api/notion';

import { getNoteEntries } from './get-note-entries';

// 공개된 노트 목록 (발행일 최신순). 화면·브라우저로 보내는 값은 목록 값(summary)만.
// 캐시 기간·이름표를 정한 이유는 get-note-entries.ts와 같다.
export async function getNotes(): Promise<NoteSummary[]> {
  'use cache';
  cacheLife('days');
  cacheTag('notes');
  return (await getNoteEntries()).map((entry) => entry.summary);
}
