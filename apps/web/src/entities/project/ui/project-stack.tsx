import type { Label } from '@/shared/api/notion';
import { splitTags } from '@/shared/lib/split-tags';

import styles from './project-stack.module.scss';

type ProjectStackProps = {
  stack: Label[];
};

// 프로젝트 카드의 기술 스택 줄: 앞의 2개 + 나머지 +N (중립 태그). 모바일에서는 숨긴다 (Figma 모바일 카드에 없음).
export function ProjectStack({ stack }: ProjectStackProps) {
  const { visible, hiddenCount } = splitTags(stack);
  if (visible.length === 0) return null;

  return (
    <ul className={styles.stack} aria-label="기술 스택">
      {visible.map((item) => (
        <li key={item.slug}>
          <span className="sl-tag">{item.name}</span>
        </li>
      ))}
      {hiddenCount > 0 && (
        <li>
          <span className="sl-tag" aria-label={`기술 ${hiddenCount}개 더 있음`}>
            +{hiddenCount}
          </span>
        </li>
      )}
    </ul>
  );
}
