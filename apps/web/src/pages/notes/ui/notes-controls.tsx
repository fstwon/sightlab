import type { ReactNode } from 'react';

import type { TagOption } from '../lib/tag-filter';
import styles from './notes-controls.module.scss';
import { NotesSearch } from './notes-search';
import { NotesSelectedTags } from './notes-selected-tags';
import { NotesTagFilter } from './notes-tag-filter';

type NotesControlsProps = {
  query: string;
  tagOptions: TagOption[];
  selectedTags: string[];
  children: ReactNode;
};

// 검색·태그 필터 줄, 선택한 태그 줄, 그 아래 결과의 배치 (Figma PUBLIC-02: 검색 420px, 태그 필터 180px).
// 빌드 때(fallback)와 브라우저에서 같은 배치를 써서 하이드레이션 뒤 화면이 흔들리지 않게 한다.
export function NotesControls({ query, tagOptions, selectedTags, children }: NotesControlsProps) {
  return (
    <div className={styles.explorer}>
      <div className={styles.filters}>
        <div className={styles.controls}>
          <div className={styles.search}>
            <NotesSearch query={query} />
          </div>
          <NotesTagFilter options={tagOptions} selected={selectedTags} query={query} />
        </div>
        <NotesSelectedTags options={tagOptions} selected={selectedTags} query={query} />
      </div>
      {children}
    </div>
  );
}
