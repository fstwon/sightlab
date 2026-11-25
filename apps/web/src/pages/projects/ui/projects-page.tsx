import { ProjectCard } from '@/entities/project';
import { getProjects } from '@/entities/project/server';
import { SearchIcon } from '@/shared/ui/icon';
import { PageHeader } from '@/shared/ui/page-header';

import styles from './projects-page.module.scss';

// Projects 목록 (Figma PUBLIC-04 / MOBILE-04, F6). 공개 프로젝트 전체를 발행일 최신순 카드로 보여 준다.
// 데이터는 빌드 때 캐시 층에서 받는다. 페이지 나누기는 두지 않는다 (F6 "카드 목록").
// 공개 프로젝트가 없으면 빈 상태 (Figma PUBLIC-04A / MOBILE-04A).
export async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        lead="프로젝트의 목표와 해결한 문제, 연결된 학습 기록을 함께 살펴봅니다."
      />
      <section aria-labelledby="projects-list-title">
        {/* 카드 제목(h3)이 h1 바로 아래로 건너뛰지 않도록 화면에 보이지 않는 목록 제목을 둔다 */}
        <h2 id="projects-list-title" className={styles.hidden}>
          프로젝트 목록
        </h2>
        {projects.length > 0 ? (
          <ul className={styles.grid}>
            {projects.map((project, index) => (
              <li key={project.id} className={styles.item}>
                <ProjectCard project={project} index={index + 1} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="sl-state sl-state--empty" role="status">
            <span className="sl-state__icon">
              <SearchIcon aria-hidden="true" />
            </span>
            <div className="sl-state__copy">
              <p className="sl-state__title">아직 공개된 프로젝트가 없습니다</p>
              <p className="sl-state__description">프로젝트가 공개되면 이곳에 표시됩니다.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
