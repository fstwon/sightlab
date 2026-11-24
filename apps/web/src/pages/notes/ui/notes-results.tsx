import Link from 'next/link';

import { NoteCard, type NoteSummary } from '@/entities/note';
import { SearchIcon } from '@/shared/ui/icon';

import { getTotalPages, paginate } from '../lib/paginate';
import { NotesPagination } from './notes-pagination';
import styles from './notes-results.module.scss';

type NotesResultsProps = {
  // 검색까지 적용한 결과 (최신순)
  notes: NoteSummary[];
  // 1 ~ 전체 페이지 수 사이로 정리된 값
  page: number;
  // 현재 검색어. 페이지 번호 링크가 유지한다.
  query: string;
  // 공개된 노트가 하나라도 있는지 (결과 없음과 "아직 노트 없음"을 구분)
  hasAnyNotes: boolean;
};

// 결과 개수 + 카드 목록 + 페이지 번호. 빌드 때(Suspense fallback, 1페이지)와
// 브라우저(URL의 ?q=, ?page=)에서 같은 컴포넌트로 그린다.
export function NotesResults({ notes, page, query, hasAnyNotes }: NotesResultsProps) {
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
      ) : hasAnyNotes ? (
        <EmptyState
          title="조건에 맞는 노트가 없습니다"
          description="검색어나 선택한 태그를 변경해 다시 찾아보세요."
          showReset
        />
      ) : (
        <EmptyState
          title="아직 공개된 노트가 없습니다"
          description="첫 노트가 발행되면 이곳에 표시됩니다."
        />
      )}
      <NotesPagination current={page} total={totalPages} query={query} />
    </div>
  );
}

type EmptyStateProps = {
  title: string;
  description: string;
  showReset?: boolean;
};

// 공용 State UI 빈 결과 (Figma PUBLIC-02B). 조건 때문에 비었을 때만 "필터 초기화"로 /notes에 돌아간다.
function EmptyState({ title, description, showReset = false }: EmptyStateProps) {
  return (
    <div className="sl-state sl-state--empty" role="status">
      <span className="sl-state__icon">
        <SearchIcon aria-hidden="true" />
      </span>
      <div className="sl-state__copy">
        <p className="sl-state__title">{title}</p>
        <p className="sl-state__description">{description}</p>
      </div>
      {showReset && (
        <Link href="/notes" className="sl-button sl-button--secondary">
          필터 초기화
        </Link>
      )}
    </div>
  );
}
