// 현재 주소(pathname)가 메뉴 주소(href)이거나 그 하위 주소인지 판단한다.
// 예: '/notes' → '/notes', '/notes/context-api' 에서 true / '/notesx', '/' 에서 false
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
