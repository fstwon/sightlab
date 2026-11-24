import 'server-only';

import { getNotionClient } from './client';

// 노트 본문을 마크다운으로 받는다 (D4-3, markdown_version v2). 노트 상세마다 한 번 부른다.
// 속성은 목록 조회(getPublishedNoteEntries) 결과를 쓰므로 여기서 다시 조회하지 않는다.
// 글이 아주 길어 잘렸거나(truncated) 마크다운으로 바꿀 수 없는 블록이 있으면 빌드 로그에 경고를 남긴다.
export async function getNoteMarkdown(pageId: string): Promise<string> {
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
