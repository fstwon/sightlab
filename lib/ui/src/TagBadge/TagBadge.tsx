import type { HTMLAttributes, ReactNode } from 'react';
import styles from './TagBadge.module.scss';

export type TagBadgeVariant = 'neutral' | 'brand' | 'accent';

export type TagBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  children: ReactNode;
  variant?: TagBadgeVariant;
  selected?: boolean;
};

export function TagBadge({
  children,
  variant = 'neutral',
  selected = false,
  className,
  ...props
}: TagBadgeProps) {
  return (
    <span
      {...props}
      className={[
        styles.badge,
        styles[variant],
        selected && styles.selected,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
