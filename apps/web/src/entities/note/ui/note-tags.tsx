import type { Label } from '@/shared/api/notion';

import { splitTags } from '../lib/split-tags';
import styles from './note-tags.module.scss';

type NoteTagsProps = {
  tags: Label[];
};

// 카드의 태그 줄: 앞의 2개는 brand 태그, 나머지는 +N 배지 (Figma Note Card Tag Row).
// 태그는 카드 링크 안의 장식이라 링크로 만들지 않는다 (태그 필터는 Notes 화면에서).
export function NoteTags({ tags }: NoteTagsProps) {
  const { visible, hiddenCount } = splitTags(tags);
  if (visible.length === 0) return null;

  return (
    <ul className={styles.tags}>
      {visible.map((tag) => (
        <li key={tag.slug}>
          <span className="sl-tag sl-tag--brand">{tag.name}</span>
        </li>
      ))}
      {hiddenCount > 0 && (
        <li>
          <span className="sl-tag" aria-label={`태그 ${hiddenCount}개 더 있음`}>
            +{hiddenCount}
          </span>
        </li>
      )}
    </ul>
  );
}
