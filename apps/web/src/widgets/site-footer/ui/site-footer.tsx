import styles from './site-footer.module.scss';

// 공통 푸터 (Figma Component / Footer). 768px 이상은 가로, 미만은 세로 배치.
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Sightlab</p>
        <p className={styles.tagline}>Learning notes, built to revisit.</p>
      </div>
    </footer>
  );
}
