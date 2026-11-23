// 주어진 시각의 날짜(YYYY-MM-DD)를 특정 시간대 기준으로 돌려준다.
// 빌드 서버는 UTC라서, 한국 날짜 기준 예약 발행(D4-2a)을 판단할 때 시간대를 명시한다.
export function getDateInTimeZone(date: Date, timeZone: string): string {
  // en-CA 형식이 YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
