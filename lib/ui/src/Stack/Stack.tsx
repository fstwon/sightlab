import type { HTMLAttributes, ReactNode } from 'react';

type Spacing = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: 'row' | 'column';
  gap?: Spacing;
  children: ReactNode;
};

export function Stack({ direction = 'column', gap = 'md', style, children, ...props }: StackProps) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: `var(--sl-spacing-${gap})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
