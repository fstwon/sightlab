'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { useDebouncedCallback } from '@/shared/lib/use-debounced-callback';
import { SearchIcon } from '@/shared/ui/icon';

import { buildNotesHref } from '../lib/notes-query';

// 입력을 멈추고 URL을 바꾸기까지 기다리는 시간
export const SEARCH_DELAY_MS = 300;

type NotesSearchProps = {
  // URL의 현재 검색어 (?q=)
  query: string;
};

// 노트 검색 입력 (공용 sl-search 마크업, Figma Search Input).
// 입력값은 바로 화면에 보이고, 입력을 멈추면 URL(?q=)을 바꾼다. 페이지는 1로 돌아간다.
// router.replace: 글자마다 히스토리가 쌓이지 않게, scroll: false: 화면이 맨 위로 튀지 않게.
// form action="/notes": JS가 아직 돌지 않아도 Enter로 /notes?q=… 에 이동한다.
export function NotesSearch({ query }: NotesSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);

  // 뒤로 가기 등으로 URL의 검색어가 바뀌면 입력란도 따라간다 (렌더 중 상태 맞추기)
  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setValue(query);
  }

  const applyQuery = (nextQuery: string) => {
    if (nextQuery.trim() === query) return;
    router.replace(buildNotesHref({ q: nextQuery }), { scroll: false });
  };
  const debounced = useDebouncedCallback(applyQuery, SEARCH_DELAY_MS);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debounced.cancel();
    applyQuery(value);
  };

  return (
    <form role="search" action="/notes" onSubmit={handleSubmit}>
      <label className="sl-search">
        <SearchIcon className="sl-search__icon" aria-hidden="true" />
        <input
          className="sl-search__input"
          type="search"
          name="q"
          placeholder="노트 검색"
          aria-label="노트 검색"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            debounced.run(event.target.value);
          }}
        />
      </label>
    </form>
  );
}
