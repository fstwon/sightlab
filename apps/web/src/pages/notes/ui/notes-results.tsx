import { NoteCard, type NoteSummary } from '@/entities/note';
import { SearchIcon } from '@/shared/ui/icon';

import { getTotalPages, paginate } from '../lib/paginate';
import { NotesPagination } from './notes-pagination';
import styles from './notes-results.module.scss';

type NotesResultsProps = {
  notes: NoteSummary[];
  // 1 ~ 전체 페이지 수 사이로 정리된 값
  page: number;
};

// 결과 개수 + 카드 목록 + 페이지 번호. 빌드 때(Suspense fallback, 1페이지)와
// 브라우저(URL의 ?page=)에서 같은 컴포넌트로 그린다.
export function NotesResults({ notes, page }: NotesResultsProps) {
  const totalPages = getTotalPages(notes.length);
  const items = paginate(notes, page);

  return (
    <div className={styles.results}>
      <p className={styles.count}>
        {notes.length} {notes.length === 1 ? 'note' : 'notes'} · latest first
      </p>
      {items.length > 0 ? (
        <ul className={styles.grid}>
          {items.map((note) => (
            <li key={note.id} className={styles.item}>
              <NoteCard note={note} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="sl-state sl-state--empty" role="status">
          <span className="sl-state__icon">
            <SearchIcon aria-hidden="true" />
          </span>
          <div className="sl-state__copy">
            <p className="sl-state__title">아직 공개된 노트가 없습니다</p>
            <p className="sl-state__description">첫 노트가 발행되면 이곳에 표시됩니다.</p>
          </div>
        </div>
      )}
      <NotesPagination current={page} total={totalPages} />
    </div>
  );
}
