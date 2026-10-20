import type { HTMLAttributes } from 'react';
import { TagBadge } from '../TagBadge/TagBadge';
import styles from './NoteCard.module.scss';

export type NoteCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: string;
  summary: string;
  tags: readonly string[];
  date: string;
  readingMinutes: number;
};

export function NoteCard({
  title,
  summary,
  tags,
  date,
  readingMinutes,
  className,
  ...props
}: NoteCardProps) {
  const visibleTags = tags.slice(0, 2);
  const remainingTags = Math.max(0, tags.length - visibleTags.length);

  return (
    <article
      {...props}
      className={[styles.card, className].filter(Boolean).join(' ')}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.tags} aria-label="태그">
        {visibleTags.map((tag, index) => (
          <TagBadge key={`${tag}-${index}`} variant="brand">
            {tag}
          </TagBadge>
        ))}
        {remainingTags > 0 && (
          <TagBadge variant="neutral" aria-label={`추가 태그 ${remainingTags}개`}>
            +{remainingTags}
          </TagBadge>
        )}
      </div>
      <p className={styles.meta}>
        <time dateTime={date}>{date}</time>
        <span aria-hidden="true"> · </span>
        <span>{readingMinutes} min</span>
      </p>
    </article>
  );
}
