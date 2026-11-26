import { cacheLife, cacheTag } from 'next/cache';

import { copyToAssetStorage } from '@/shared/api/asset-storage';
import { getNoteMarkdown, type NoteDetail } from '@/shared/api/notion';

import { replaceNoteImages } from '../lib/replace-note-images';
import { getNoteEntries } from './get-note-entries';

// 노트 상세의 캐시 층 (D0-2 ③). 캐시 기간·이름표를 정한 이유는 get-note-entries.ts와 같다.
// 속성은 캐시된 공개 목록에서 꺼내고, Notion에는 본문만 요청한다 (노트 하나당 API 1번).
// 캐시 안에서 이미지를 복사하므로 같은 본문은 빌드 중 한 번만 복사한다.
// 공개 목록에 있는 노트만 찾으므로 비공개·예약 글은 상세도 열리지 않는다. 없는 slug면 null (404).
export async function getNoteDetail(slug: string): Promise<NoteDetail | null> {
  'use cache';
  cacheLife('days');
  cacheTag('notes');
  const entry = (await getNoteEntries()).find((item) => item.summary.slug === slug);
  if (!entry) return null;

  // 본문 이미지는 Blob에 복사한 주소로 바꿔 둔다 (Notion 이미지 주소는 1시간 뒤 만료, D4-5)
  const markdown = await replaceNoteImages(await getNoteMarkdown(entry.summary.id), (url) =>
    copyToAssetStorage('notes', url),
  );
  return { ...entry.summary, ...entry.extras, markdown };
}

// 빌드 때 미리 만들 노트 상세 주소 목록 (generateStaticParams)
export async function getNoteSlugs(): Promise<string[]> {
  'use cache';
  cacheLife('days');
  cacheTag('notes');
  return (await getNoteEntries()).map((entry) => entry.summary.slug);
}
