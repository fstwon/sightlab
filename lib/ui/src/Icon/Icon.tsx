import type { CSSProperties, HTMLAttributes } from 'react';
import { iconSources } from '@sightlab/icons';
import type { IconName } from '@sightlab/icons';

export type { IconName } from '@sightlab/icons';

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  name: IconName;
  size?: number | string;
  title?: string;
};

export function Icon({
  name,
  size = 24,
  title,
  style,
  'aria-label': ariaLabel,
  ...props
}: IconProps) {
  const accessibleName = ariaLabel ?? title;
  const iconStyle: CSSProperties = {
    display: 'inline-block',
    flexShrink: 0,
    width: size,
    height: size,
    backgroundColor: 'currentColor',
    WebkitMask: `url("${iconSources[name]}") center / contain no-repeat`,
    mask: `url("${iconSources[name]}") center / contain no-repeat`,
    verticalAlign: 'middle',
    ...style,
  };

  return (
    <span
      {...props}
      style={iconStyle}
      role={accessibleName ? 'img' : undefined}
      aria-label={accessibleName}
      aria-hidden={accessibleName ? undefined : true}
      title={title}
    />
  );
}
