'use client';

import { useSearchParams } from 'next/navigation';

import type { NoteSummary } from '@/entities/note';

import { getTotalPages } from '../lib/paginate';
import { parsePage } from '../lib/parse-page';
import { NotesResults } from './notes-results';

type NotesExplorerProps = {
  notes: NoteSummary[];
};

// 브라우저에서 URL 상태(?page=)를 읽어 목록을 그린다. 정적 페이지에서 useSearchParams를 쓰므로
// 부모가 Suspense로 감싸야 한다 (fallback은 빌드 때 그린 1페이지).
// 검색(?q=)·태그 필터(?tags=)는 이 컴포넌트에 이어서 붙인다.
export function NotesExplorer({ notes }: NotesExplorerProps) {
  const searchParams = useSearchParams();
  // Next 타입은 pages 폴더가 있는 앱과의 호환 때문에 null을 포함한다 (App Router에서는 항상 값이 있음)
  const page = parsePage(searchParams?.get('page'), getTotalPages(notes.length));

  return <NotesResults notes={notes} page={page} />;
}
