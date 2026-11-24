'use client';

import { useSearchParams } from 'next/navigation';

import type { NoteSummary } from '@/entities/note';

import { readNotesQuery } from '../lib/notes-query';
import { getTotalPages } from '../lib/paginate';
import { parsePage } from '../lib/parse-page';
import { searchNotes } from '../lib/search-notes';
import { NotesControls } from './notes-controls';
import { NotesResults } from './notes-results';

type NotesExplorerProps = {
  notes: NoteSummary[];
};

// 브라우저에서 URL 상태(?q=, ?page=)를 읽어 검색 → 페이지 자르기 순서로 목록을 그린다.
// 정적 페이지에서 useSearchParams를 쓰므로 부모가 Suspense로 감싸야 한다 (fallback은 빌드 때 그린 1페이지).
// 태그 필터(?tags=)는 검색 앞 단계로 이어서 붙인다.
export function NotesExplorer({ notes }: NotesExplorerProps) {
  // Next 타입은 pages 폴더가 있는 앱과의 호환 때문에 null을 포함한다 (App Router에서는 항상 값이 있음)
  const query = readNotesQuery(useSearchParams());
  const results = searchNotes(notes, query.q);
  const page = parsePage(query.page, getTotalPages(results.length));

  return (
    <NotesControls query={query.q}>
      <NotesResults notes={results} page={page} query={query.q} hasAnyNotes={notes.length > 0} />
    </NotesControls>
  );
}
