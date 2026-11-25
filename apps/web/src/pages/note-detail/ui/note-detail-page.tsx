import { notFound } from 'next/navigation';

import { getToc } from '@/entities/note';
import { getNoteDetail, NoteBody } from '@/entities/note/server';

import { NoteBreadcrumb } from './note-breadcrumb';
import { NoteDetailHeader } from './note-detail-header';
import styles from './note-detail-page.module.scss';
import { NoteTocDesktop } from './note-toc-desktop';
import { NoteTocMobile } from './note-toc-mobile';
import { ReadingProgress } from './reading-progress';

// 읽기 진행률을 잴 본문 요소의 id
const ARTICLE_ID = 'note-article';

type NoteDetailPageProps = {
  slug: string;
};

// 노트 상세 (Figma PUBLIC-03 / MOBILE-03, F4). 공개 목록에 없는 slug면 404.
// 목차는 빌드 때 본문에서 만들고, 넓은 화면은 본문 옆·좁은 화면은 본문 위에 둔다. 제목이 없으면 목차도 없다.
// 읽기 진행 막대는 본문 기준으로 화면 맨 위에 표시한다. 참고 자료·관련 노트(D5)는 다음 단계에서 붙인다.
export async function NoteDetailPage({ slug }: NoteDetailPageProps) {
  const note = await getNoteDetail(slug);
  // notFound()는 렌더링을 여기서 멈추고 404 화면을 보낸다 (아래 코드는 실행되지 않음)
  if (!note) notFound();

  const toc = getToc(note.markdown);
  const hasToc = toc.length > 0;

  return (
    <div className={styles.page}>
      <ReadingProgress targetId={ARTICLE_ID} />
      <NoteBreadcrumb category={note.category.name} title={note.title} />
      <div className={styles.layout}>
        <article id={ARTICLE_ID} className={styles.article}>
          <NoteDetailHeader note={note} />
          {hasToc && <NoteTocMobile items={toc} />}
          <NoteBody markdown={note.markdown} />
        </article>
        {hasToc && (
          <aside className={styles.aside}>
            <NoteTocDesktop items={toc} />
          </aside>
        )}
      </div>
    </div>
  );
}
