import Link from 'next/link';

import { ProjectCard, type ProjectSummary } from '@/entities/project';

import { HomeEmptyState } from './home-empty-state';
import { HomeSection } from './home-section';
import styles from './recent-projects.module.scss';

type RecentProjectsProps = {
  projects: ProjectSummary[];
};

// 최근 프로젝트 섹션: 카드 최대 3개(번호 01~), 없으면 빈 상태. 제목 오른쪽에 Projects 보기.
export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <HomeSection
      id="recent-projects"
      title="Recent Projects"
      action={
        <Link href="/projects" className="sl-button sl-button--secondary">
          Projects 보기
        </Link>
      }
    >
      {projects.length > 0 ? (
        <ul className={styles.grid}>
          {projects.map((project, index) => (
            <li key={project.id} className={styles.item}>
              <ProjectCard project={project} index={index + 1} />
            </li>
          ))}
        </ul>
      ) : (
        <HomeEmptyState
          title="아직 공개된 프로젝트가 없습니다"
          description="프로젝트가 공개되면 이곳에 표시됩니다."
        />
      )}
    </HomeSection>
  );
}
