import { Suspense } from 'react';

import { getNotes } from '@/entities/note/server';
import { PageHeader } from '@/shared/ui/page-header';

import { NotesControls } from './notes-controls';
import { NotesExplorer } from './notes-explorer';
import styles from './notes-page.module.scss';
import { NotesResults } from './notes-results';

// Notes 목록 (Figma PUBLIC-02 / Notes, F3). 데이터는 빌드 때 캐시 층에서 받는다.
// 검색·목록은 브라우저가 URL을 읽어 그리고, 그 전(정적 HTML)에는 빈 검색창과 1페이지를 보여 준다.
export async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Notes"
        title="Learning Notes"
        lead="검색과 태그 필터를 사용해 필요한 학습 기록을 찾습니다."
      />
      <Suspense
        fallback={
          <NotesControls query="">
            <NotesResults notes={notes} page={1} query="" hasAnyNotes={notes.length > 0} />
          </NotesControls>
        }
      >
        <NotesExplorer notes={notes} />
      </Suspense>
    </div>
  );
}
