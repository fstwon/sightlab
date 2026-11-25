'use client';

import type { TocItem } from '@/entities/note';

import { useActiveHeading } from '../lib/use-active-heading';
import styles from './note-toc-desktop.module.scss';
import { NoteTocList } from './note-toc-list';

type NoteTocDesktopProps = {
  items: TocItem[];
};

// 넓은 화면(lg 이상)의 본문 옆 목차 카드 (Figma PUBLIC-03 Desktop TOC).
// 화면에 붙어 있는 것은 CSS(position: sticky)가 하고, JS는 현재 항목만 표시한다.
export function NoteTocDesktop({ items }: NoteTocDesktopProps) {
  const activeId = useActiveHeading(items);

  return (
    <nav className={styles.toc} aria-labelledby="note-toc-desktop-title">
      <h2 id="note-toc-desktop-title" className={styles.title}>
        On this page
      </h2>
      <NoteTocList items={items} activeId={activeId} className={styles.list} />
    </nav>
  );
}
