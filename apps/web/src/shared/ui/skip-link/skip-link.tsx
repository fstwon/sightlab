import styles from './skip-link.module.scss';

// 본문 바로가기 (Figma Component / Skip Link). 평소에는 화면 밖에 두고 키보드 focus 때만 보인다.
export function SkipLink() {
  return (
    <a className={styles.skipLink} href="#main">
      본문 바로가기
    </a>
  );
}
