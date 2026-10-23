import type { SVGProps } from 'react';
import Menu from '@sightlab/icons/menu?react';
import Close from '@sightlab/icons/close?react';
import Search from '@sightlab/icons/search?react';
import Filter from '@sightlab/icons/filter?react';
import ChevronUp from '@sightlab/icons/chevron-up?react';
import ChevronDown from '@sightlab/icons/chevron-down?react';
import ChevronLeft from '@sightlab/icons/chevron-left?react';
import ChevronRight from '@sightlab/icons/chevron-right?react';
import ArrowUp from '@sightlab/icons/arrow-up?react';
import ArrowLeft from '@sightlab/icons/arrow-left?react';
import ArrowRight from '@sightlab/icons/arrow-right?react';
import Copy from '@sightlab/icons/copy?react';
import Check from '@sightlab/icons/check?react';
import ExternalLink from '@sightlab/icons/external-link?react';
import Refresh from '@sightlab/icons/refresh?react';
import More from '@sightlab/icons/more?react';

const icons = {
  menu: Menu,
  close: Close,
  search: Search,
  filter: Filter,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'arrow-up': ArrowUp,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  copy: Copy,
  check: Check,
  'external-link': ExternalLink,
  refresh: Refresh,
  more: More,
};

export type IconName = keyof typeof icons;
export type IconProps = Omit<SVGProps<SVGSVGElement>, 'name' | 'children'> & {
  name: IconName;
  size?: number | string;
  title?: string;
};

export function Icon({ name, size = 24, title, 'aria-label': ariaLabel, ...props }: IconProps) {
  const Component = icons[name];
  const accessibleName = ariaLabel ?? title;

  return (
    <Component
      {...props}
      width={props.width ?? size}
      height={props.height ?? size}
      role={accessibleName ? 'img' : undefined}
      aria-label={accessibleName}
      aria-hidden={accessibleName ? undefined : true}
      focusable="false"
      title={title}
    />
  );
}
