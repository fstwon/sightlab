import { Suspense } from 'react';

import { getNotes } from '@/entities/note/server';
import { PageHeader } from '@/shared/ui/page-header';

import { NotesExplorer } from './notes-explorer';
import styles from './notes-page.module.scss';
import { NotesResults } from './notes-results';

// Notes 목록 (Figma PUBLIC-02 / Notes, F3). 데이터는 빌드 때 캐시 층에서 받는다.
// 목록은 브라우저가 URL을 읽어 그리고, 그 전(정적 HTML)에는 1페이지를 보여 준다.
export async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Notes"
        title="Learning Notes"
        lead="검색과 태그 필터를 사용해 필요한 학습 기록을 찾습니다."
      />
      <Suspense fallback={<NotesResults notes={notes} page={1} />}>
        <NotesExplorer notes={notes} />
      </Suspense>
    </div>
  );
}
