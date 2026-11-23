import type { ReactNode } from 'react';

import styles from './home-section.module.scss';

type HomeSectionProps = {
  id: string;
  title: string;
  // 제목 오른쪽 동작 (예: Projects 보기)
  action?: ReactNode;
  children: ReactNode;
};

// 홈의 목록 섹션 틀: 제목(h2) + 선택 동작 + 내용. 제목이 섹션 이름이 된다 (aria-labelledby).
export function HomeSection({ id, title, action, children }: HomeSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
