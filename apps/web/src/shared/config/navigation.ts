// 상단 메뉴 항목. 데스크톱 헤더와 모바일 메뉴가 함께 쓴다.
export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Notes', href: '/notes' },
  { label: 'Projects', href: '/projects' },
];
