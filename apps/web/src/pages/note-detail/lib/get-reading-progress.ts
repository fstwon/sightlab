type ArticleBox = {
  // 화면 위에서 본문 시작까지의 거리(px). 본문 시작이 화면 위로 지나가면 음수
  top: number;
  height: number;
};

// 본문을 읽은 비율 (0~1). 본문 시작이 화면 맨 위에 닿으면 0, 본문 끝이 화면 맨 아래에 닿으면 1.
// 비율 = 화면 위로 지나간 길이 ÷ (본문 높이 − 화면 높이). 본문이 화면보다 짧으면 스크롤할 거리가 없어 1.
export function getReadingProgress({ top, height }: ArticleBox, viewportHeight: number): number {
  const scrollable = height - viewportHeight;
  if (scrollable <= 0) return 1;
  return Math.min(1, Math.max(0, -top / scrollable));
}
