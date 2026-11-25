export type HeadingPosition = {
  id: string;
  // 화면 위에서 제목까지의 거리(px). 화면 위로 지나가면 음수
  top: number;
};

// 지금 읽고 있는 제목: 기준선(화면 위에서 line px)을 지나 위로 올라간 제목 중 마지막 것.
// 첫 제목에 닿기 전이면 null. 페이지 끝에 닿으면 마지막 제목 (짧은 마지막 절은 기준선까지 못 올라오므로).
// headings는 본문 순서대로 들어온다.
export function getActiveHeadingId(
  headings: HeadingPosition[],
  line: number,
  isAtBottom: boolean,
): string | null {
  const last = headings.at(-1);
  if (!last) return null;
  if (isAtBottom) return last.id;

  let activeId: string | null = null;
  for (const heading of headings) {
    if (heading.top > line) break;
    activeId = heading.id;
  }
  return activeId;
}
