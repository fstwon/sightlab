'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/shared/config/navigation';

import styles from './nav-links.module.scss';

// 현재 주소를 알아야 해서 클라이언트 컴포넌트로 둔다 (헤더의 나머지는 서버 컴포넌트).
export function NavLinks() {
  // 타입상 null일 수 있다 (Pages Router 호환). App Router에서는 항상 문자열.
  const pathname = usePathname() ?? '';

  return (
    <ul className={styles.list}>
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              className={isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
