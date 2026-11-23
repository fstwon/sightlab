import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/ui/icon';

import { getPageHref } from '../lib/get-page-href';
import { getPageItems } from '../lib/get-page-items';
import styles from './notes-pagination.module.scss';

type NotesPaginationProps = {
  current: number;
  total: number;
};

// 공용 sl-pagination 마크업 (Storybook "Components/Pagination" 규칙).
// 번호 목록은 데스크톱(현재 앞뒤 1개)·모바일(현재만) 두 벌을 그리고 CSS로 하나만 보인다.
// 숨긴 쪽은 display: none이라 화면 낭독기에도 읽히지 않는다.
export function NotesPagination({ current, total }: NotesPaginationProps) {
  if (total <= 1) return null;

  return (
    <nav aria-label="페이지">
      <PageList current={current} total={total} siblings={1} className={styles.desktop} />
      <PageList current={current} total={total} siblings={0} className={styles.mobile} />
    </nav>
  );
}

type PageListProps = NotesPaginationProps & {
  siblings: number;
  className: string | undefined;
};

function PageList({ current, total, siblings, className }: PageListProps) {
  return (
    <ol className={['sl-pagination', className].filter(Boolean).join(' ')}>
      <li>
        <StepLink page={current - 1} disabled={current <= 1} label="이전 페이지">
          <ArrowLeftIcon className="sl-pagination__icon" aria-hidden="true" />
        </StepLink>
      </li>
      {getPageItems(current, total, siblings).map((item, index) => (
        <li key={item === 'ellipsis' ? `ellipsis-${index}` : item}>
          {item === 'ellipsis' ? (
            <span className="sl-pagination__ellipsis">…</span>
          ) : (
            <Link
              href={getPageHref(item)}
              className={
                item === current
                  ? 'sl-pagination__item sl-pagination__item--current'
                  : 'sl-pagination__item'
              }
              aria-current={item === current ? 'page' : undefined}
            >
              {item}
            </Link>
          )}
        </li>
      ))}
      <li>
        <StepLink page={current + 1} disabled={current >= total} label="다음 페이지">
          <ArrowRightIcon className="sl-pagination__icon" aria-hidden="true" />
        </StepLink>
      </li>
    </ol>
  );
}

type StepLinkProps = {
  page: number;
  disabled: boolean;
  label: string;
  children: ReactNode;
};

// 이전·다음. 이동할 수 없으면 href 없는 링크 + aria-disabled (공용 규칙)
function StepLink({ page, disabled, label, children }: StepLinkProps) {
  if (disabled) {
    return (
      // 공용 Pagination 규칙: 이동할 수 없는 항목은 href 없이 role="link" + aria-disabled로 알린다.
      // 키보드로 갈 곳이 없으므로 focus를 받지 않는 것이 의도된 동작이다.
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        className="sl-pagination__item sl-pagination__item--disabled"
        role="link"
        aria-disabled="true"
        aria-label={label}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={getPageHref(page)} className="sl-pagination__item" aria-label={label}>
      {children}
    </Link>
  );
}
