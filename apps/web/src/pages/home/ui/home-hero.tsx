import Link from 'next/link';

import { PageHeader } from '@/shared/ui/page-header';

import styles from './home-hero.module.scss';
import { ObservationGraphic } from './observation-graphic';

// 홈 첫 화면 (Figma PUBLIC-01 / Home 히어로). 머리말 제목이 페이지의 h1.
// 버튼은 공용 sl-button 클래스를 쓴 링크 (hover·focus는 공용 스타일).
export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.text}>
        <PageHeader
          eyebrow="Learning archive"
          titleId="home-hero-title"
          title={
            <>
              배운 것을 기록하고,
              <br />
              다시 꺼내보는 공간.
            </>
          }
          lead="문제 해결 과정과 설계 판단을 축적하는 개인 학습 연구소입니다."
        />
        <div className={styles.actions}>
          <Link href="/notes" className="sl-button sl-button--primary">
            Notes 보기
          </Link>
          <Link href="/projects" className="sl-button sl-button--secondary">
            Projects 보기
          </Link>
        </div>
      </div>
      <ObservationGraphic />
    </section>
  );
}
