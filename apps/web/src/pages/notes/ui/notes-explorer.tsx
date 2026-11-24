'use client';

import { useSearchParams } from 'next/navigation';

import type { NoteSummary } from '@/entities/note';

import { readNotesQuery } from '../lib/notes-query';
import { getTotalPages } from '../lib/paginate';
import { parsePage } from '../lib/parse-page';
import { searchNotes } from '../lib/search-notes';
import { filterByTags, getTagOptions, selectExistingTags } from '../lib/tag-filter';
import { NotesControls } from './notes-controls';
import { NotesResults } from './notes-results';

type NotesExplorerProps = {
  notes: NoteSummary[];
};

// 브라우저에서 URL 상태(?tags=, ?q=, ?page=)를 읽어 태그 → 검색 → 페이지 자르기 순서로 목록을 그린다.
// 정적 페이지에서 useSearchParams를 쓰므로 부모가 Suspense로 감싸야 한다 (fallback은 빌드 때 그린 1페이지).
export function NotesExplorer({ notes }: NotesExplorerProps) {
  // Next 타입은 pages 폴더가 있는 앱과의 호환 때문에 null을 포함한다 (App Router에서는 항상 값이 있음)
  const query = readNotesQuery(useSearchParams());
  const tagOptions = getTagOptions(notes);
  const selectedTags = selectExistingTags(query.tags, tagOptions);
  const results = searchNotes(filterByTags(notes, selectedTags), query.q);
  const page = parsePage(query.page, getTotalPages(results.length));

  return (
    <NotesControls query={query.q} tagOptions={tagOptions} selectedTags={selectedTags}>
      <NotesResults
        notes={results}
        page={page}
        filters={{ q: query.q, tags: selectedTags }}
        hasAnyNotes={notes.length > 0}
      />
    </NotesControls>
  );
}
