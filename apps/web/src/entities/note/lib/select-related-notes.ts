import type { NoteSummary } from '@/shared/api/notion';

// 관련 노트 (F4-1): 현재 노트를 뺀 공개 노트를 아래 순서로 정렬해 앞에서 limit개를 고른다.
// ① 같은 연재 먼저 (연재 순서가 가까운 순) ② 같은 카테고리 ③ 겹치는 태그가 많은 순 ④ 발행일이 가까운 순
// 같은 연재 글로 자리가 다 차지 않으면 ②~④로 채운다. 겹치는 점이 없어도 다른 노트가 있으면 채운다 (자동 선택).
export function selectRelatedNotes(
  current: NoteSummary,
  notes: NoteSummary[],
  limit = 2,
): NoteSummary[] {
  const currentTags = new Set(current.tags.map((tag) => tag.slug));
  const currentTime = Date.parse(current.publishedAt);
  const currentSeries = current.series;

  return notes
    .filter((note) => note.id !== current.id)
    .map((note) => {
      const sameSeries = currentSeries !== null && note.series?.name === currentSeries.name;
      return {
        note,
        sameSeries: sameSeries ? 1 : 0,
        // 같은 연재가 아니면 0 (②부터 비교)
        orderDistance:
          sameSeries && note.series ? Math.abs(note.series.order - currentSeries.order) : 0,
        sameCategory: note.category.slug === current.category.slug ? 1 : 0,
        sharedTags: note.tags.filter((tag) => currentTags.has(tag.slug)).length,
        distance: Math.abs(Date.parse(note.publishedAt) - currentTime),
      };
    })
    .sort(
      (a, b) =>
        b.sameSeries - a.sameSeries ||
        a.orderDistance - b.orderDistance ||
        b.sameCategory - a.sameCategory ||
        b.sharedTags - a.sharedTags ||
        a.distance - b.distance,
    )
    .slice(0, limit)
    .map(({ note }) => note);
}
