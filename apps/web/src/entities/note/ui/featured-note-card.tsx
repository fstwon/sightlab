import Link from 'next/link';

import type { NoteSummary } from '@/shared/api/notion';
import { formatDate } from '@/shared/lib/format-date';

import styles from './featured-note-card.module.scss';
import { NoteTags } from './note-tags';

type FeaturedNoteCardProps = {
  note: NoteSummary;
};

// 홈 상단의 대표 노트 카드 (Figma Featured Note Card, node 442:747). 위에 섹션 제목이 없어 제목은 h2.
// 카드 전체 링크·focus 처리 방식은 NoteCard와 같다.
export function FeaturedNoteCard({ note }: FeaturedNoteCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.eyebrow}>Featured note</p>
      <h2 className={styles.title}>
        <Link href={`/notes/${note.slug}`} className={styles.link}>
          {note.title}
        </Link>
      </h2>
      <p className={styles.summary}>{note.summary}</p>
      <NoteTags tags={note.tags} />
      <time className={styles.date} dateTime={note.publishedAt}>
        {formatDate(note.publishedAt)}
      </time>
    </article>
  );
}
