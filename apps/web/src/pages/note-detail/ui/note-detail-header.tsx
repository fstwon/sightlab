import { getReadingTime, type NoteDetail } from '@/entities/note';
import { formatDate } from '@/shared/lib/format-date';

import styles from './note-detail-header.module.scss';

type NoteDetailHeaderProps = {
  note: NoteDetail;
};

// 노트 머리말: 제목(h1) → 발행일 · 읽는 시간 → Category · Tags (Figma PUBLIC-03 / MOBILE-03)
export function NoteDetailHeader({ note }: NoteDetailHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{note.title}</h1>
      <p className={styles.meta}>
        <time dateTime={note.publishedAt}>{formatDate(note.publishedAt)}</time>
        {' · '}
        {getReadingTime(note.markdown)} min read
      </p>

      <dl className={styles.labels}>
        <div className={styles.group}>
          <dt className={styles.term}>Category</dt>
          <dd className={styles.values}>
            <span className="sl-tag sl-tag--brand">{note.category.name}</span>
          </dd>
        </div>
        {note.tags.length > 0 && (
          <div className={styles.group}>
            <dt className={styles.term}>Tags</dt>
            {note.tags.map((tag) => (
              <dd key={tag.slug} className={styles.values}>
                <span className="sl-tag">{tag.name}</span>
              </dd>
            ))}
          </div>
        )}
      </dl>
    </header>
  );
}
