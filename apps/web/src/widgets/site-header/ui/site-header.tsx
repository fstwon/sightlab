import Link from 'next/link';

import { Logo } from '@/shared/ui/logo';

import { MobileMenu } from './mobile-menu';
import { NavLinks } from './nav-links';
import styles from './site-header.module.scss';

// 공통 헤더 (Figma Component / Navigation, MOBILE Header).
// 768px 이상은 로고 Primary + 메뉴 링크, 미만은 로고 Compact + 메뉴 버튼(모바일 메뉴).
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink}>
          <span className={styles.logoDesktop}>
            <Logo />
          </span>
          <span className={styles.logoMobile}>
            <Logo variant="compact" />
          </span>
        </Link>
        <nav aria-label="주 메뉴" className={styles.desktopNav}>
          <NavLinks />
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
