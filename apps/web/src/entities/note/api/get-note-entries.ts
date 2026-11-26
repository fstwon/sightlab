import { cacheLife, cacheTag } from 'next/cache';

import { getPublishedNoteEntries, type NoteEntry } from '@/shared/api/notion';

// 공개 노트 목록 조회 결과(목록 값 + 상세 전용 값)의 캐시 층 (D0-2 ③). entities/note 안에서만 쓴다.
// 목록(getNotes)과 상세(getNoteDetail)가 이 한 번의 조회를 함께 써서, 상세가 속성을 다시 조회하지 않는다.
// 'use cache': 빌드 때 한 번 조회한 결과를 정적 페이지에 넣는다.
// cacheLife('days'): 하루마다 다시 조회한다 (방문이 있을 때). 예약 발행은 Notion에서 바뀌는 것이 없어
//   웹훅이 오지 않으므로, 발행일이 된 글은 이 주기로 나타난다. 웹훅이 빠졌을 때의 안전장치도 된다.
//   이 결과를 쓰는 바깥 캐시 함수도 모두 'days'로 맞춘다 (바깥에 적은 cacheLife가 안쪽보다 우선).
// cacheTag('notes'): Notion 웹훅(/api/revalidate)이 revalidateTag('notes')로 바로 무효화하는 이름표.
export async function getNoteEntries(): Promise<NoteEntry[]> {
  'use cache';
  cacheLife('days');
  cacheTag('notes');
  return getPublishedNoteEntries();
}
