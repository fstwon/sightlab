import type { ReactNode } from 'react';

import styles from './page-header.module.scss';

type PageHeaderProps = {
  // 제목 위 짧은 분류 글 (화면에서는 대문자)
  eyebrow: string;
  // 페이지의 h1. 줄바꿈 위치를 정하려면 <br />을 넣는다.
  title: ReactNode;
  lead: string;
  // 섹션 이름으로 쓸 때 (aria-labelledby)
  titleId?: string;
};

// 공개 화면 머리말: eyebrow → 제목(h1) → 소개 문장 (Figma Home 히어로·Notes 머리말).
export function PageHeader({ eyebrow, title, lead, titleId }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 id={titleId} className={styles.title}>
        {title}
      </h1>
      <p className={styles.lead}>{lead}</p>
    </div>
  );
}
