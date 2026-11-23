import 'server-only';

import { collectPaginatedAPI, isFullPage, type PageObjectResponse } from '@notionhq/client';

import { getDateInTimeZone } from '@/shared/lib/get-date-in-time-zone';

import { getNotionClient } from './client';
import type { MapResult } from './mapping';

// 예약 발행 기준 날짜의 시간대
const PUBLISH_TIME_ZONE = 'Asia/Seoul';

type QueryPublishedOptions<T> = {
  dataSourceId: string;
  map: (page: PageObjectResponse) => MapResult<T>;
  // 경고 로그에 쓰는 이름 (예: 노트)
  kind: string;
  now: Date;
};

// 공개된 페이지 목록 (발행일 최신순).
// 공개 조건(D4-2a): Status = Published 그리고 PublishedAt <= 오늘(서울). 미래 날짜는 Published여도 숨긴다.
// 필수 속성이 빠진 페이지는 빌드 로그에 경고를 남기고 제외한다 (페이지 하나 때문에 배포 전체가 막히지 않게).
export async function queryPublished<T>({
  dataSourceId,
  map,
  kind,
  now,
}: QueryPublishedOptions<T>): Promise<T[]> {
  const today = getDateInTimeZone(now, PUBLISH_TIME_ZONE);

  const results = await collectPaginatedAPI(getNotionClient().dataSources.query, {
    data_source_id: dataSourceId,
    filter: {
      and: [
        { property: 'Status', select: { equals: 'Published' } },
        { property: 'PublishedAt', date: { on_or_before: today } },
      ],
    },
    sorts: [{ property: 'PublishedAt', direction: 'descending' }],
  });

  const items: T[] = [];
  for (const result of results) {
    if (result.object !== 'page' || !isFullPage(result)) continue;
    const mapped = map(result);
    if (mapped.ok) {
      items.push(mapped.value);
    } else {
      console.warn(
        `[notion] ${kind} ${result.id} 제외: 필수 속성 없음 (${mapped.missing.join(', ')})`,
      );
    }
  }
  return items;
}
