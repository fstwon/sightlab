import Link from 'next/link';

import type { ProjectSummary } from '@/shared/api/notion';

import { formatConnectedNotes } from '../lib/format-connected-notes';
import styles from './project-card.module.scss';
import { ProjectStack } from './project-stack';

type ProjectCardProps = {
  project: ProjectSummary;
  // 목록 안 순서 (1부터). 미리보기 자리에 01, 02처럼 표시한다.
  index: number;
  // 연결된 공개 노트 수 (Draft 노트는 세지 않도록 화면에서 계산해 넘긴다)
  connectedNotes: number;
};

// 프로젝트 목록 카드 (Figma Project Card, node 143:58). 제목은 섹션 제목(h2) 아래라 h3.
// 미리보기: 이미지(Blob 주소)가 있으면 이미지 + 왼쪽 위 진행 상태 배지 (Show Preview),
// 없으면 번호 + 진행 상태 자리 표시. 이미지는 장식이라 alt를 비운다 (제목이 같은 카드 안에 있음).
// 읽는 순서는 제목이 먼저, 화면에서는 미리보기가 위 (CSS order). 링크·focus 처리는 NoteCard와 같다.
export function ProjectCard({ project, index, connectedNotes }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link href={`/projects/${project.slug}`} className={styles.link}>
          {project.title}
        </Link>
      </h3>
      {project.preview ? (
        <div className={`${styles.preview} ${styles.withImage}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Blob 주소를 그대로 쓴다 (이미지 최적화 한도·설정 없이) */}
          <img className={styles.image} src={project.preview.url} alt="" loading="lazy" />
          <span className={styles.badge}>{project.progress.name}</span>
        </div>
      ) : (
        <div className={styles.preview}>
          <span className={styles.index} aria-hidden="true">
            {String(index).padStart(2, '0')}
          </span>
          <span className={styles.progress}>{project.progress.name}</span>
        </div>
      )}
      <p className={styles.summary}>{project.summary}</p>
      <ProjectStack stack={project.stack} />
      <p className={styles.notes}>{formatConnectedNotes(connectedNotes)}</p>
    </article>
  );
}
