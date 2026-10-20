import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Container.module.scss';

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'main' | 'section' | 'article';
  size?: 'content' | 'prose';
  children: ReactNode;
};

export function Container({
  as: Tag = 'div',
  size = 'content',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={[styles.container, styles[size], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
