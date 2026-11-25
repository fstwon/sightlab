import type { NoteSummary } from '@/shared/api/notion';

// 관련 노트 (F4-1): 현재 노트를 뺀 공개 노트를 아래 순서로 정렬해 앞에서 limit개를 고른다.
// ① 같은 카테고리 먼저 ② 겹치는 태그가 많은 순 ③ 발행일이 가까운 순
// 겹치는 점이 없어도 다른 노트가 있으면 채운다 (자동 선택).
export function selectRelatedNotes(
  current: NoteSummary,
  notes: NoteSummary[],
  limit = 2,
): NoteSummary[] {
  const currentTags = new Set(current.tags.map((tag) => tag.slug));
  const currentTime = Date.parse(current.publishedAt);

  return notes
    .filter((note) => note.id !== current.id)
    .map((note) => ({
      note,
      sameCategory: note.category.slug === current.category.slug ? 1 : 0,
      sharedTags: note.tags.filter((tag) => currentTags.has(tag.slug)).length,
      distance: Math.abs(Date.parse(note.publishedAt) - currentTime),
    }))
    .sort(
      (a, b) =>
        b.sameCategory - a.sameCategory || b.sharedTags - a.sharedTags || a.distance - b.distance,
    )
    .slice(0, limit)
    .map(({ note }) => note);
}
