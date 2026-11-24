import type { PageObjectResponse } from '@notionhq/client';

import type { MapResult } from './mapping';
import { mapNotePage } from './note-mapper';
import { readLinks, readUrl } from './properties';
import type { NoteDetail, Reference } from './types';

// 주소의 도메인을 출처로 쓴다 (www. 제외). 주소가 잘못됐으면 출처 없이 둔다.
function toReference({ text, url }: { text: string; url: string }): Reference {
  let source = '';
  try {
    source = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    source = '';
  }
  return { title: text, url, source };
}

// Notion Notes 페이지 + 본문 마크다운 → NoteDetail.
// 필수 속성 판단은 목록 매퍼(mapNotePage)와 같다. 상세에만 필요한 값은 모두 선택 속성이다.
export function mapNoteDetailPage(
  page: PageObjectResponse,
  markdown: string,
): MapResult<NoteDetail> {
  const summary = mapNotePage(page);
  if (!summary.ok) return summary;

  const { properties } = page;
  return {
    ok: true,
    value: {
      ...summary.value,
      markdown,
      references: readLinks(properties, 'References').map(toReference),
      demoUrl: readUrl(properties, 'DemoUrl'),
      sourceUrl: readUrl(properties, 'SourceUrl'),
    },
  };
}
