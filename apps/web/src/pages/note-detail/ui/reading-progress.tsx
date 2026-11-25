'use client';

import { useEffect, useState } from 'react';

import { getReadingProgress } from '../lib/get-reading-progress';
import styles from './reading-progress.module.scss';

type ReadingProgressProps = {
  // 진행률을 잴 본문(article) 요소의 id
  targetId: string;
};

// 읽기 진행 막대 (Figma PUBLIC-03 / MOBILE-03 Reading Progress). 화면 맨 위에 고정된 3px 막대.
// 스크롤마다 requestAnimationFrame으로 화면당 한 번 본문 위치를 재서 비율을 구한다.
// 막대 길이는 width 대신 transform: scaleX로 바꾼다 (레이아웃 계산 없이 다시 그리기만 함).
// 장식이라 화면 낭독기에는 숨긴다.
export function ReadingProgress({ targetId }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      setProgress(getReadingProgress(target.getBoundingClientRect(), window.innerHeight));
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
  }, [targetId]);

  // 본문을 읽기 전(0)에는 막대를 숨긴다. 페이지 맨 위의 브랜드 줄(Top Rule)을 가리지 않게 하기 위해서다.
  if (progress === 0) return null;

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.value} style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
