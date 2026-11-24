import 'server-only';

import { isFullPage } from '@notionhq/client';

import { getNotionClient } from './client';
import { mapNoteDetailPage } from './note-detail-mapper';
import type { NoteDetail } from './types';

// 노트 본문을 마크다운으로 받는다 (D4-3, markdown_version v2).
// 글이 아주 길어 잘렸거나(truncated) 마크다운으로 바꿀 수 없는 블록이 있으면 빌드 로그에 경고를 남긴다.
async function getNoteMarkdown(pageId: string): Promise<string> {
  const response = await getNotionClient().pages.retrieveMarkdown({
    page_id: pageId,
    markdown_version: 'v2',
  });
  if (response.truncated) {
    console.warn(`[notion] 노트 ${pageId} 본문이 잘렸습니다 (블록 수 한도 초과)`);
  }
  if (response.unknown_block_ids.length > 0) {
    console.warn(
      `[notion] 노트 ${pageId} 본문에 변환하지 못한 블록 ${response.unknown_block_ids.length}개 (bookmark·embed 등)`,
    );
  }
  return response.markdown;
}

// 공개된 노트 하나의 상세 (속성 + 본문). 공개 여부는 목록(getPublishedNotes)에서 이미 확인한 id로 부른다.
// 필수 속성이 빠졌으면 경고 후 null (목록과 같은 규칙).
export async function getPublishedNoteDetail(pageId: string): Promise<NoteDetail | null> {
  const [page, markdown] = await Promise.all([
    getNotionClient().pages.retrieve({ page_id: pageId }),
    getNoteMarkdown(pageId),
  ]);
  if (!isFullPage(page)) return null;

  const mapped = mapNoteDetailPage(page, markdown);
  if (!mapped.ok) {
    console.warn(`[notion] 노트 ${pageId} 제외: 필수 속성 없음 (${mapped.missing.join(', ')})`);
    return null;
  }
  return mapped.value;
}
