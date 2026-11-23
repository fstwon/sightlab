import { HomeHero } from './home-hero';
import styles from './home-page.module.scss';

// 홈 (Figma PUBLIC-01 / Home). Featured·Recent Notes·Recent Projects는 다음 단계에서 붙인다.
export function HomePage() {
  return (
    <div className={styles.page}>
      <HomeHero />
    </div>
  );
}
