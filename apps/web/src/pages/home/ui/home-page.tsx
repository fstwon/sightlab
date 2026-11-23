import { FeaturedNoteCard } from '@/entities/note';
import { getNotes } from '@/entities/note/server';
import { getProjects } from '@/entities/project/server';

import { selectHomeNotes } from '../lib/select-home-notes';
import { HomeHero } from './home-hero';
import styles from './home-page.module.scss';
import { RecentNotes } from './recent-notes';
import { RecentProjects } from './recent-projects';

// 홈 (Figma PUBLIC-01 / Home, F2): 히어로 → Featured Note → Recent Notes → Recent Projects.
// 데이터는 캐시 층(entities/*/api, 'use cache')에서 받아 빌드 때 정적 페이지로 만든다.
// 노트가 1개뿐이면 Featured만 보이고 Recent Notes는 숨긴다 ("노트가 없습니다" 문구가 맞지 않으므로).
export async function HomePage() {
  const [notes, projects] = await Promise.all([getNotes(), getProjects()]);
  const { featured, recent } = selectHomeNotes(notes);

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <HomeHero />
        {featured && <FeaturedNoteCard note={featured} />}
      </div>
      {(featured === null || recent.length > 0) && <RecentNotes notes={recent} />}
      <RecentProjects projects={projects.slice(0, 3)} />
    </div>
  );
}
