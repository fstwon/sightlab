import { cacheLife, cacheTag } from 'next/cache';

import { getPublishedNotes, type NoteSummary } from '@/shared/api/notion';

// 공개된 노트 목록의 캐시 층 (D0-2 ③). 페이지는 Notion 층을 직접 부르지 않고 이 함수를 쓴다.
// 'use cache': 빌드 때 한 번 조회한 결과를 정적 페이지에 넣는다.
// cacheLife('max'): A단계는 정적 빌드 + 하루 1회 재빌드라서 빌드 사이에 다시 가져오지 않는다
//   (새 빌드는 빌드 ID가 바뀌어 캐시가 새로 채워짐). D단계에서 'days' + 웹훅 재검증으로 바꾼다.
// cacheTag('notes'): D단계 웹훅이 revalidateTag('notes')로 이 결과만 무효화할 수 있게 붙이는 이름표.
export async function getNotes(): Promise<NoteSummary[]> {
  'use cache';
  cacheLife('max');
  cacheTag('notes');
  return getPublishedNotes();
}
