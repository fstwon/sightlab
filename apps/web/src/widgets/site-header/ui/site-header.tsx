import Link from 'next/link';

import { Logo } from '@/shared/ui/logo';

import { NavLinks } from './nav-links';
import styles from './site-header.module.scss';

// 데스크톱 헤더 (Figma Component / Navigation). 모바일 헤더·메뉴는 768px 미만용으로 따로 둔다.
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink}>
          <Logo />
        </Link>
        <nav aria-label="주 메뉴">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
