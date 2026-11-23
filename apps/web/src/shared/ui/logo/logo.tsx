import { LogoSymbol } from '@/shared/ui/icon';

import styles from './logo.module.scss';

type LogoProps = {
  // primary: 데스크톱 헤더(심볼 36px, 글자 28px) / compact: 모바일 헤더(심볼 28px, 글자 20px)
  variant?: 'primary' | 'compact';
};

// Sightlab 로고 (Figma Brand / Logo Final). 관찰 심볼(@sightlab/icons/brand) + 글자.
// 링크는 쓰는 곳에서 감싼다. 심볼은 장식이라 낭독하지 않고, 이름은 글자로 전달한다.
export function Logo({ variant = 'primary' }: LogoProps) {
  const className = variant === 'compact' ? `${styles.logo} ${styles.logoCompact}` : styles.logo;

  return (
    <span className={className}>
      <LogoSymbol className={styles.symbol} aria-hidden="true" focusable="false" />
      <span className={styles.wordmark}>Sightlab</span>
    </span>
  );
}
