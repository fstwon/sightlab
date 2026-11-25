'use client';

import { useEffect, useRef, useState } from 'react';

import type { TocItem } from '@/entities/note';
import { ArrowUpIcon, ChevronDownIcon } from '@/shared/ui/icon';

import { useActiveHeading } from '../lib/use-active-heading';
import { NoteTocList } from './note-toc-list';
import styles from './note-toc-mobile.module.scss';

// "목차로" 버튼이 이동할 목차의 id
const TOC_ID = 'note-toc';

type NoteTocMobileProps = {
  items: TocItem[];
};

// lg 미만 화면의 본문 위 접는 목차 (Figma MOBILE-03, 공용 Mobile TOC) + "목차로" 버튼 (공용 To TOC Action).
// 펼치고 접기는 <details>의 기본 동작이라 JS가 없어도 된다.
export function NoteTocMobile({ items }: NoteTocMobileProps) {
  const activeId = useActiveHeading(items);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isTocAbove, setIsTocAbove] = useState(false);

  // 목차가 화면 위로 완전히 지나갔을 때만 "목차로" 버튼을 보인다.
  // 화면 아래에 있어 안 보이는 경우(top > 0)는 제외한다.
  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setIsTocAbove(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(details);
    return () => observer.disconnect();
  }, []);

  // 항목을 누르면 링크가 제목으로 이동하고 주소에 #id를 남긴다. 그 뒤 목차를 접는다.
  const closeToc = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  // "목차로"를 누르면 링크가 목차로 이동하고, 목차를 펼쳐 바로 고를 수 있게 한다.
  const openToc = () => {
    if (detailsRef.current) detailsRef.current.open = true;
  };

  return (
    <div className={styles.wrapper}>
      <details id={TOC_ID} ref={detailsRef} className={`sl-mobile-toc ${styles.toc}`}>
        <summary className="sl-mobile-toc__header">
          <span>이 글의 목차</span>
          <ChevronDownIcon className="sl-mobile-toc__icon" aria-hidden="true" />
        </summary>
        <nav className="sl-mobile-toc__body" aria-label="이 글의 목차">
          <NoteTocList
            items={items}
            activeId={activeId}
            className="sl-mobile-toc__list"
            onItemClick={closeToc}
          />
        </nav>
      </details>

      {isTocAbove && (
        <a className="sl-to-toc" href={`#${TOC_ID}`} onClick={openToc}>
          <ArrowUpIcon className="sl-to-toc__icon" aria-hidden="true" />
          <span>목차</span>
        </a>
      )}
    </div>
  );
}
