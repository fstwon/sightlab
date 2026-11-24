import { cacheLife, cacheTag } from 'next/cache';

import { getPublishedNoteDetail, type NoteDetail } from '@/shared/api/notion';

import { getNotes } from './get-notes';

// 노트 상세의 캐시 층 (D0-2 ③). 캐시 기간·이름표를 정한 이유는 get-notes.ts와 같다.
// 공개 목록(getNotes)에서 slug로 찾은 노트만 본문을 받는다 → 비공개·예약 글은 상세도 열리지 않는다.
// 없는 slug면 null (페이지가 404로 처리).
export async function getNoteDetail(slug: string): Promise<NoteDetail | null> {
  'use cache';
  cacheLife('max');
  cacheTag('notes');
  const note = (await getNotes()).find((item) => item.slug === slug);
  if (!note) return null;
  return getPublishedNoteDetail(note.id);
}

// 빌드 때 미리 만들 노트 상세 주소 목록 (generateStaticParams)
export async function getNoteSlugs(): Promise<string[]> {
  'use cache';
  cacheLife('max');
  cacheTag('notes');
  return (await getNotes()).map((note) => note.slug);
}
