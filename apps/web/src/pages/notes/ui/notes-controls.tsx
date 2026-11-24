import type { ReactNode } from 'react';

import styles from './notes-controls.module.scss';
import { NotesSearch } from './notes-search';

type NotesControlsProps = {
  query: string;
  children: ReactNode;
};

// 검색·필터 줄과 그 아래 결과의 배치 (Figma PUBLIC-02: 검색 420px, 오른쪽에 태그 필터 자리).
// 빌드 때(fallback)와 브라우저에서 같은 배치를 써서 하이드레이션 뒤 화면이 흔들리지 않게 한다.
export function NotesControls({ query, children }: NotesControlsProps) {
  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <div className={styles.search}>
          <NotesSearch query={query} />
        </div>
      </div>
      {children}
    </div>
  );
}
