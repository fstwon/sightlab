import Link from 'next/link';
import { notFound } from 'next/navigation';

import { groupNotesByProject, NoteCard } from '@/entities/note';
import { getNotes } from '@/entities/note/server';
import { getProject } from '@/entities/project/server';

import styles from './project-detail-page.module.scss';
import { ProjectInfo } from './project-info';
import { ProjectPreview } from './project-preview';

type ProjectDetailPageProps = {
  slug: string;
};

// 프로젝트 상세 (Figma PUBLIC-05 / MOBILE-05, P4-2). 공개 목록에 없는 slug면 404.
// 브레드크럼 → 제목·소개 → 미리보기 + 정보 카드 → Connected Notes(연결된 공개 노트, 최신순).
// 연결된 공개 노트가 없으면 Connected Notes 영역을 그리지 않는다.
export async function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const project = await getProject(slug);
  // notFound()는 렌더링을 여기서 멈추고 404 화면을 보낸다
  if (!project) notFound();

  const connectedNotes = groupNotesByProject(await getNotes()).get(project.id) ?? [];

  return (
    <div className={styles.page}>
      <nav aria-label="현재 위치" className={styles.breadcrumb}>
        <ol className="sl-breadcrumb">
          <li className="sl-breadcrumb__item">
            <Link className="sl-breadcrumb__link" href="/projects">
              Projects
            </Link>
          </li>
          <li className="sl-breadcrumb__item">
            <span className="sl-breadcrumb__current" aria-current="page">
              {project.title}
            </span>
          </li>
        </ol>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
      </header>

      <div className={styles.overview}>
        <ProjectPreview title={project.title} />
        <ProjectInfo project={project} connectedNotes={connectedNotes.length} />
      </div>

      {connectedNotes.length > 0 && (
        <section className={styles.connected} aria-labelledby="connected-notes-title">
          <h2 id="connected-notes-title" className={styles.connectedTitle}>
            Connected Notes
          </h2>
          <ul className={styles.grid}>
            {connectedNotes.map((note) => (
              <li key={note.id} className={styles.item}>
                <NoteCard note={note} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
