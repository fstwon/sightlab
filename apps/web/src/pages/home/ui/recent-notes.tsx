import { NoteCard, type NoteSummary } from '@/entities/note';

import { HomeEmptyState } from './home-empty-state';
import { HomeSection } from './home-section';
import styles from './recent-notes.module.scss';

type RecentNotesProps = {
  notes: NoteSummary[];
};

// 최근 노트 섹션: 카드 최대 3개, 없으면 빈 상태.
export function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <HomeSection id="recent-notes" title="Recent Notes">
      {notes.length > 0 ? (
        <ul className={styles.grid}>
          {notes.map((note) => (
            <li key={note.id} className={styles.item}>
              <NoteCard note={note} />
            </li>
          ))}
        </ul>
      ) : (
        <HomeEmptyState
          title="아직 공개된 노트가 없습니다"
          description="첫 노트가 발행되면 이곳에 표시됩니다."
        />
      )}
    </HomeSection>
  );
}
