import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerSize = 'content' | 'prose';

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'main' | 'section' | 'article';
  size?: ContainerSize;
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
    <Tag className={[styles.container, styles[size], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  );
}
