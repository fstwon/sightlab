// Notes 목록 한 페이지의 노트 수 (데스크톱 3열 × 3줄)
export const NOTES_PAGE_SIZE = 9;

// 전체 페이지 수. 항목이 없어도 1페이지로 본다 (빈 상태를 1페이지에 보여 줌).
export function getTotalPages(count: number, size = NOTES_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(count / size));
}

// page번째(1부터) 페이지의 항목
export function paginate<T>(items: readonly T[], page: number, size = NOTES_PAGE_SIZE): T[] {
  const start = (page - 1) * size;
  return items.slice(start, start + size);
}
