import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Stack.module.scss';

type Spacing = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: 'row' | 'column';
  gap?: Spacing;
  children: ReactNode;
};

const gapClasses: Record<Spacing, string> = {
  '2xs': styles.gap2xs,
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
  '2xl': styles.gap2xl,
  '3xl': styles.gap3xl,
};

export function Stack({
  direction = 'column',
  gap = 'md',
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      {...props}
      className={[styles.stack, styles[direction], gapClasses[gap], className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
