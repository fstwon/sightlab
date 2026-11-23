export type PageItem = number | 'ellipsis';

// 페이지 번호 목록. 처음·끝 페이지와 현재 페이지 앞뒤 siblings개를 보여 주고,
// 사이가 2페이지 이상 비면 말줄임, 1페이지만 비면 그 번호를 그대로 넣는다 (공용 Pagination 규칙).
// 예: (6, 12, 1) → 1 … 5 6 7 … 12 / (6, 12, 0) → 1 … 6 … 12
export function getPageItems(current: number, total: number, siblings = 1): PageItem[] {
  if (total < 1) return [];

  const pages = new Set([1, total]);
  for (let page = current - siblings; page <= current + siblings; page += 1) {
    if (page >= 1 && page <= total) pages.add(page);
  }

  const items: PageItem[] = [];
  let previous = 0;
  for (const page of [...pages].sort((a, b) => a - b)) {
    if (previous > 0) {
      const gap = page - previous;
      if (gap === 2) items.push(previous + 1);
      else if (gap > 2) items.push('ellipsis');
    }
    items.push(page);
    previous = page;
  }
  return items;
}
