import type { ProjectSummary } from '@/entities/project';

import styles from './project-info.module.scss';

type ProjectInfoProps = {
  project: ProjectSummary;
  // 연결된 공개 노트 수
  connectedNotes: number;
};

// 프로젝트 정보 카드 (Figma PUBLIC-05 Project Meta / MOBILE-05 Project Info): Role · Stack · Status · Notes.
export function ProjectInfo({ project, connectedNotes }: ProjectInfoProps) {
  const rows = [
    { term: 'Role', value: project.role },
    { term: 'Stack', value: project.stack.map((item) => item.name).join(' · ') },
    { term: 'Status', value: project.progress.name },
    { term: 'Notes', value: `${connectedNotes} connected` },
  ];

  return (
    <section className={styles.info} aria-labelledby="project-info-title">
      <h2 id="project-info-title" className={styles.title}>
        Project info
      </h2>
      <dl className={styles.list}>
        {rows.map((row) => (
          <div key={row.term} className={styles.row}>
            <dt className={styles.term}>{row.term}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
