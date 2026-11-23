import Link from 'next/link';

import type { NoteSummary } from '@/shared/api/notion';
import { formatDate } from '@/shared/lib/format-date';

import styles from './note-card.module.scss';
import { NoteTags } from './note-tags';

type NoteCardProps = {
  note: NoteSummary;
};

// 노트 목록 카드 (Figma Note Card, node 38:14). 제목은 섹션 제목(h2) 아래라 h3.
// 링크는 제목에만 걸고 ::after로 카드 전체를 누를 수 있게 넓힌다 (화면 낭독기는 링크를 한 번만 읽음).
export function NoteCard({ note }: NoteCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link href={`/notes/${note.slug}`} className={styles.link}>
          {note.title}
        </Link>
      </h3>
      <p className={styles.summary}>{note.summary}</p>
      <NoteTags tags={note.tags} />
      <time className={styles.date} dateTime={note.publishedAt}>
        {formatDate(note.publishedAt)}
      </time>
    </article>
  );
}
