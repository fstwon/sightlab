import 'server-only';

import { collectPaginatedAPI, isFullPage } from '@notionhq/client';

import { getServerEnv } from '@/shared/config/env';
import { getDateInTimeZone } from '@/shared/lib/get-date-in-time-zone';

import { getNotionClient } from './client';
import { mapNotePage } from './note-mapper';
import type { NoteSummary } from './types';

// 예약 발행 기준 날짜의 시간대
const PUBLISH_TIME_ZONE = 'Asia/Seoul';

// 공개된 노트 목록 (발행일 최신순).
// 공개 조건(D4-2a): Status = Published 그리고 PublishedAt <= 오늘(서울). 미래 날짜는 Published여도 숨긴다.
// 필수 속성이 빠진 글은 빌드 로그에 경고를 남기고 제외한다 (글 하나 때문에 배포 전체가 막히지 않게).
export async function getPublishedNotes(now: Date = new Date()): Promise<NoteSummary[]> {
  const notion = getNotionClient();
  const today = getDateInTimeZone(now, PUBLISH_TIME_ZONE);

  const results = await collectPaginatedAPI(notion.dataSources.query, {
    data_source_id: getServerEnv().notionNotesDataSourceId,
    filter: {
      and: [
        { property: 'Status', select: { equals: 'Published' } },
        { property: 'PublishedAt', date: { on_or_before: today } },
      ],
    },
    sorts: [{ property: 'PublishedAt', direction: 'descending' }],
  });

  const notes: NoteSummary[] = [];
  for (const result of results) {
    if (result.object !== 'page' || !isFullPage(result)) continue;
    const mapped = mapNotePage(result);
    if (mapped.ok) {
      notes.push(mapped.value);
    } else {
      console.warn(
        `[notion] 노트 ${result.id} 제외: 필수 속성 없음 (${mapped.missing.join(', ')})`,
      );
    }
  }
  return notes;
}
