import Link from 'next/link';

import { Logo } from '@/shared/ui/logo';

import styles from './header-logo.module.scss';

// 홈으로 가는 로고 링크. 768px 이상은 Primary, 미만은 Compact를 보여 준다.
export function HeaderLogo() {
  return (
    <Link href="/" className={styles.link}>
      <span className={styles.desktop}>
        <Logo />
      </span>
      <span className={styles.mobile}>
        <Logo variant="compact" />
      </span>
    </Link>
  );
}
