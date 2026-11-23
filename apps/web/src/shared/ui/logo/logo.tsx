import styles from './logo.module.scss';

type LogoProps = {
  // primary: 데스크톱 헤더(심볼 36px, 글자 28px) / compact: 모바일 헤더(심볼 28px, 글자 20px)
  variant?: 'primary' | 'compact';
};

// Sightlab 로고 (Figma Brand / Logo Final). 관찰 심볼 + 글자.
// 링크는 쓰는 곳에서 감싼다. 심볼은 장식이라 낭독하지 않고, 이름은 글자로 전달한다.
export function Logo({ variant = 'primary' }: LogoProps) {
  const className = variant === 'compact' ? `${styles.logo} ${styles.logoCompact}` : styles.logo;

  return (
    <span className={className}>
      <svg className={styles.symbol} viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <circle className={styles.ring} cx="18" cy="18" r="17" />
        <ellipse className={styles.lens} cx="18" cy="18" rx="10.8" ry="7.2" />
        <circle className={styles.pupil} cx="18" cy="18" r="3.05" />
      </svg>
      <span className={styles.wordmark}>Sightlab</span>
    </span>
  );
}
