'use client';

import { useRouter } from 'next/navigation';

import { CloseIcon } from '@/shared/ui/icon';

import { buildNotesHref } from '../lib/notes-query';
import { type TagOption, toggleTag } from '../lib/tag-filter';
import styles from './notes-selected-tags.module.scss';
import { TAG_FILTER_BUTTON_ID } from './notes-tag-filter';

type NotesSelectedTagsProps = {
  options: TagOption[];
  selected: string[];
  query: string;
};

// 선택한 태그 줄: 칩(누르면 그 태그 해제) + 필터 초기화(태그만 해제, 검색어는 유지).
// 누른 칩이 사라지면 focus 갈 곳이 없어지므로 태그 필터 버튼으로 옮긴다.
export function NotesSelectedTags({ options, selected, query }: NotesSelectedTagsProps) {
  const router = useRouter();
  if (selected.length === 0) return null;

  const nameOf = (slug: string) => options.find((option) => option.slug === slug)?.name ?? slug;
  const apply = (tags: string[]) => {
    router.replace(buildNotesHref({ q: query, tags }), { scroll: false });
    document.getElementById(TAG_FILTER_BUTTON_ID)?.focus();
  };

  return (
    <div className={styles.row}>
      <ul className={styles.chips} aria-label="선택한 태그">
        {selected.map((slug) => (
          <li key={slug}>
            <button
              type="button"
              className="sl-filter-chip"
              aria-label={`${nameOf(slug)} 필터 해제`}
              onClick={() => apply(toggleTag(selected, slug))}
            >
              <span>{nameOf(slug)}</span>
              <CloseIcon className="sl-filter-chip__icon" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="sl-button sl-button--ghost" onClick={() => apply([])}>
        필터 초기화
      </button>
    </div>
  );
}
