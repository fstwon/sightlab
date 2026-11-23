// 목록에 보일 항목과 숨긴 개수(+N 표시용)로 나눈다 (Figma 카드의 태그 2개 + Overflow Badge). 노트 태그·프로젝트 스택이 같이 쓴다.
export function splitTags<T>(tags: readonly T[], max = 2): { visible: T[]; hiddenCount: number } {
  return { visible: tags.slice(0, max), hiddenCount: Math.max(tags.length - max, 0) };
}
