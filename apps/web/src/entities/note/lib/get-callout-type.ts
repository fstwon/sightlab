export type CalloutType = 'info' | 'tip' | 'warning' | 'error';

// 종류별 제목 (Figma Callout)
export const CALLOUT_TITLES: Record<CalloutType, string> = {
  info: '참고',
  tip: '팁',
  warning: '주의',
  error: '중요',
};

// Notion 콜아웃 배경색(<callout color="blue_bg">) → 콜아웃 종류.
// 글을 쓸 때 "색만 고르면 종류가 정해진다"는 규칙 (이모지는 쓰지 않음). 모르는 색·색 없음은 info.
export function getCalloutType(color: string | null | undefined): CalloutType {
  const name = (color ?? '').replace(/_background$|_bg$/, '');
  if (name === 'green') return 'tip';
  if (name === 'yellow' || name === 'orange' || name === 'brown') return 'warning';
  if (name === 'red' || name === 'pink') return 'error';
  return 'info';
}
