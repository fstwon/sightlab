// 카드에 보일 태그와 숨긴 태그 개수(+N 표시용)로 나눈다 (Figma Note Card: 태그 2개 + Overflow Badge).
export function splitTags<T>(tags: readonly T[], max = 2): { visible: T[]; hiddenCount: number } {
  return { visible: tags.slice(0, max), hiddenCount: Math.max(tags.length - max, 0) };
}
