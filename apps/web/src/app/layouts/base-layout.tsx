import type { ReactNode } from 'react';

import { SkipLink } from '@/shared/ui/skip-link';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

import styles from './base-layout.module.scss';

// 모든 공개 화면의 틀: 본문 바로가기 → 상단 띠 → 헤더 → 본문 → 푸터.
export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <SkipLink />
      <div className={styles.topRule} aria-hidden="true" />
      <SiteHeader />
      <main id="main" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
