'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { useEscapeKey } from '@/shared/lib/use-escape-key';
import { useOutsideClick } from '@/shared/lib/use-outside-click';
import { CheckIcon, ChevronDownIcon } from '@/shared/ui/icon';

import { buildNotesHref } from '../lib/notes-query';
import { type TagOption, toggleTag } from '../lib/tag-filter';
import styles from './notes-tag-filter.module.scss';

// 칩을 지운 뒤 focus를 돌려줄 곳 (NotesSelectedTags)
export const TAG_FILTER_BUTTON_ID = 'notes-tag-filter-button';
const PANEL_ID = 'notes-tag-filter-panel';

type NotesTagFilterProps = {
  options: TagOption[];
  // 선택한 태그 slug (URL의 ?tags= 중 실제로 있는 것)
  selected: string[];
  // 현재 검색어. 태그를 바꿔도 유지한다.
  query: string;
};

// 태그 필터 (공용 Filter Select + Filter Panel + Filter Option, Figma PUBLIC-02A).
// 체크박스를 바꾸면 바로 URL(?tags=)을 바꾼다 (적용 버튼 없음, 페이지는 1로).
// Esc를 누르면 닫고 버튼으로 focus를 돌려준다. 바깥을 누르면 닫기만 한다 (누른 곳의 focus를 뺏지 않음).
export function NotesTagFilter({ options, selected, query }: NotesTagFilterProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEscapeKey(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, isOpen);
  useOutsideClick(rootRef, () => setIsOpen(false), isOpen);

  const handleToggle = (slug: string) => {
    const href = buildNotesHref({ q: query, tags: toggleTag(selected, slug) });
    router.replace(href, { scroll: false });
  };

  return (
    <div ref={rootRef} className={styles.filter}>
      <button
        ref={buttonRef}
        id={TAG_FILTER_BUTTON_ID}
        type="button"
        className={isOpen ? 'sl-filter-select sl-filter-select--open' : 'sl-filter-select'}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        disabled={options.length === 0}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{selected.length > 0 ? `태그 ${selected.length}개 선택` : '모든 태그'}</span>
        <ChevronDownIcon className="sl-filter-select__icon" aria-hidden="true" />
      </button>
      {isOpen && (
        <div id={PANEL_ID} className={`sl-filter-panel ${styles.panel ?? ''}`}>
          <fieldset className="sl-filter-panel__group">
            <legend className="sl-filter-panel__legend">태그</legend>
            {options.map((option) => (
              <label key={option.slug} className="sl-filter-option">
                <input
                  className="sl-filter-option__input"
                  type="checkbox"
                  name="tags"
                  value={option.slug}
                  checked={selected.includes(option.slug)}
                  onChange={() => handleToggle(option.slug)}
                />
                <span className="sl-filter-option__box" aria-hidden="true">
                  <CheckIcon className="sl-filter-option__check" aria-hidden="true" />
                </span>
                <span className="sl-filter-option__label">{option.name}</span>
                {/* JSX는 줄바꿈 공백을 지워 이름이 "React8"로 붙어 읽히므로 공백을 직접 넣는다 */}{' '}
                <span className="sl-filter-option__count">{option.count}</span>
              </label>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  );
}
