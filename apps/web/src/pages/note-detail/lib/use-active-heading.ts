import { useEffect, useState } from 'react';

import type { TocItem } from '@/entities/note';

import { getActiveHeadingId } from './get-active-heading-id';

// 화면 위에서 이 거리(px)를 지난 제목을 "읽는 중"으로 본다.
// 제목으로 이동하면 제목이 scroll-margin-top(48px) 위치에 멈추므로 그보다 아래로 둔다.
const ACTIVE_LINE = 96;

// 스크롤 위치에 따라 지금 읽고 있는 목차 항목의 id를 돌려준다.
// 스크롤 이벤트는 자주 오므로 requestAnimationFrame으로 화면을 그리기 전 한 번만 계산한다.
export function useActiveHeading(items: TocItem[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const headings = items.flatMap(({ id }) => {
        const element = document.getElementById(id);
        return element ? [{ id, top: element.getBoundingClientRect().top }] : [];
      });
      const { scrollY, innerHeight } = window;
      // 스크롤한 적이 있고 페이지 끝에 닿았는지 (소수점 오차 1px 허용)
      const isAtBottom =
        scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 1;
      setActiveId(getActiveHeadingId(headings, ACTIVE_LINE, isAtBottom));
    };

    // 이미 이번 화면에 계산이 예약돼 있으면 건너뛴다
    const scheduleUpdate = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [items]);

  return activeId;
}
