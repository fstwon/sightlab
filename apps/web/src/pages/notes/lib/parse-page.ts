// URL의 ?page= 값을 1 ~ totalPages 사이 정수로 바꾼다. URL은 사용자가 고칠 수 있어 그대로 믿지 않는다.
// 숫자가 아니거나 1보다 작으면 1, 마지막 페이지보다 크면 마지막 페이지.
export function parsePage(raw: string | null | undefined, totalPages: number): number {
  const page = Number(raw);
  if (!Number.isInteger(page) || page < 1) return 1;
  return Math.min(page, Math.max(totalPages, 1));
}
