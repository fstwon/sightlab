'use client';

import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/shared/config/navigation';
import { isActivePath } from '@/shared/lib/is-active-path';

import styles from './desktop-nav.module.scss';
import { NavLink } from './nav-link';

// 768px 이상 메뉴 (조립): 현재 주소를 알아야 해서 클라이언트 컴포넌트로 둔다.
export function DesktopNav() {
  // 타입상 null일 수 있다 (Pages Router 호환). App Router에서는 항상 문자열.
  const pathname = usePathname() ?? '';

  return (
    <nav aria-label="주 메뉴" className={styles.nav}>
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href}>
            <NavLink label={label} href={href} isActive={isActivePath(pathname, href)} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
