import { DesktopNav } from './desktop-nav';
import { HeaderLogo } from './header-logo';
import { MobileMenu } from './mobile-menu';
import styles from './site-header.module.scss';

// 공통 헤더 (서버 컴포넌트, 조립만). Figma Component / Navigation, MOBILE Header.
// 768px 이상은 데스크톱 메뉴, 미만은 모바일 메뉴 버튼.
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <HeaderLogo />
        <DesktopNav />
        <MobileMenu />
      </div>
    </header>
  );
}
