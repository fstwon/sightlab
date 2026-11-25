import { notFound } from 'next/navigation';

import { getNoteDetail, NoteBody } from '@/entities/note/server';

import { NoteBreadcrumb } from './note-breadcrumb';
import { NoteDetailHeader } from './note-detail-header';
import styles from './note-detail-page.module.scss';

type NoteDetailPageProps = {
  slug: string;
};

// 노트 상세 (Figma PUBLIC-03 / MOBILE-03, F4). 공개 목록에 없는 slug면 404.
// 목차·읽기 진행 막대(D4), 참고 자료·관련 노트(D5)는 다음 단계에서 붙인다.
export async function NoteDetailPage({ slug }: NoteDetailPageProps) {
  const note = await getNoteDetail(slug);
  // notFound()는 렌더링을 여기서 멈추고 404 화면을 보낸다 (아래 코드는 실행되지 않음)
  if (!note) notFound();

  return (
    <div className={styles.page}>
      <NoteBreadcrumb category={note.category.name} title={note.title} />
      <article className={styles.article}>
        <NoteDetailHeader note={note} />
        <NoteBody markdown={note.markdown} />
      </article>
    </div>
  );
}
