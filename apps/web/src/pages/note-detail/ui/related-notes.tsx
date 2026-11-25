import { NoteCard, type NoteSummary } from '@/entities/note';

import styles from './related-notes.module.scss';

type RelatedNotesProps = {
  notes: NoteSummary[];
};

// 본문 아래 관련 노트 2개 (Figma PUBLIC-03 Related Notes / MOBILE-03). 고르는 규칙은 selectRelatedNotes (F4-1).
export function RelatedNotes({ notes }: RelatedNotesProps) {
  return (
    <section className={styles.related} aria-labelledby="related-notes-title">
      <h2 id="related-notes-title" className={styles.title}>
        Related Notes
      </h2>
      <ul className={styles.list}>
        {notes.map((note) => (
          <li key={note.id}>
            <NoteCard note={note} />
          </li>
        ))}
      </ul>
    </section>
  );
}
