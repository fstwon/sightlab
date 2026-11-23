// 홈에 보일 노트를 고른다 (F2). 목록은 발행일 최신순으로 들어온다.
// Featured: 가장 최근 노트 1개 / Recent Notes: 그다음 3개 (Featured와 겹치지 않음)
export function selectHomeNotes<T>(
  notes: readonly T[],
  recentCount = 3,
): { featured: T | null; recent: T[] } {
  return {
    featured: notes[0] ?? null,
    recent: notes.slice(1, 1 + recentCount),
  };
}
