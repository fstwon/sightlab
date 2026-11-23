import Link from 'next/link';

import type { ProjectSummary } from '@/shared/api/notion';

import { formatConnectedNotes } from '../lib/format-connected-notes';
import styles from './project-card.module.scss';
import { ProjectStack } from './project-stack';

type ProjectCardProps = {
  project: ProjectSummary;
  // 목록 안 순서 (1부터). 미리보기 자리에 01, 02처럼 표시한다.
  index: number;
};

// 프로젝트 목록 카드 (Figma Project Card, node 143:58). 제목은 섹션 제목(h2) 아래라 h3.
// 미리보기는 번호·진행 상태 자리 표시만 쓴다: Notion 이미지 주소는 1시간 뒤 만료되어,
// 이미지는 Blob에 복사하는 작업(D0-2 ② asset-storage) 이후에 붙인다.
// 읽는 순서는 제목이 먼저, 화면에서는 미리보기가 위 (CSS order). 링크·focus 처리는 NoteCard와 같다.
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link href={`/projects/${project.slug}`} className={styles.link}>
          {project.title}
        </Link>
      </h3>
      <div className={styles.preview}>
        <span className={styles.index} aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <span className={styles.progress}>{project.progress.name}</span>
      </div>
      <p className={styles.summary}>{project.summary}</p>
      <ProjectStack stack={project.stack} />
      <p className={styles.notes}>{formatConnectedNotes(project.noteIds.length)}</p>
    </article>
  );
}
