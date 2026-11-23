// 페이지 번호 링크 주소. 1페이지는 ?page 없이 /notes (같은 화면의 주소를 하나로).
export function getPageHref(page: number): string {
  return page <= 1 ? '/notes' : `/notes?page=${page}`;
}
