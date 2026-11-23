// 발행일(YYYY-MM-DD)을 화면 표기(YYYY.MM.DD)로 바꾼다. 시간대 계산 없이 글자만 바꿔 서버·브라우저 결과가 같다.
export function formatDate(date: string): string {
  return date.slice(0, 10).replaceAll('-', '.');
}
