import type { AnchorHTMLAttributes } from 'react';
import { TagBadge } from '../TagBadge/TagBadge';
import styles from './ProjectCard.module.scss';

export type ProjectCardProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'title'> & {
  href: string;
  index: string;
  category: string;
  title: string;
  description: string;
  tags: readonly string[];
  connectedNotes: number;
  /** Storybook 등에서 모바일 시안을 독립적으로 검증할 때 사용합니다. */
  size?: 'responsive' | 'mobile';
};

export function ProjectCard({
  href,
  index,
  category,
  title,
  description,
  tags,
  connectedNotes,
  size = 'responsive',
  className,
  ...props
}: ProjectCardProps) {
  const visibleTags = tags.slice(0, 2);
  const remainingTags = Math.max(0, tags.length - visibleTags.length);

  return (
    <a
      {...props}
      href={href}
      data-size={size}
      className={[styles.card, className].filter(Boolean).join(' ')}
    >
      <div className={styles.thumbnail} aria-hidden="true">
        <span className={styles.index}>{index}</span>
        <span className={styles.category}>{category}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {tags.length > 0 && (
        <div className={styles.tags} aria-label="기술 태그">
          <div className={styles.tagItems}>
            {visibleTags.map((tag, i) => (
              <TagBadge key={`${tag}-${i}`} variant="neutral">
                {tag}
              </TagBadge>
            ))}
          </div>
          {remainingTags > 0 && (
            <TagBadge
              className={styles.tagOverflow}
              variant="neutral"
              aria-label={`추가 태그 ${remainingTags}개`}
            >
              +{remainingTags}
            </TagBadge>
          )}
        </div>
      )}
      <span className={styles.connectedNotes}>
        {connectedNotes} connected notes
      </span>
    </a>
  );
}
