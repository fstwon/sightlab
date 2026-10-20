/// <reference path="./svg.d.ts" />
import type { SVGProps } from 'react';
import Menu from '@sightlab/icons/menu';
import Close from '@sightlab/icons/close';
import Search from '@sightlab/icons/search';
import Filter from '@sightlab/icons/filter';
import ChevronUp from '@sightlab/icons/chevron-up';
import ChevronDown from '@sightlab/icons/chevron-down';
import ChevronLeft from '@sightlab/icons/chevron-left';
import ChevronRight from '@sightlab/icons/chevron-right';
import ArrowUp from '@sightlab/icons/arrow-up';
import ArrowLeft from '@sightlab/icons/arrow-left';
import ArrowRight from '@sightlab/icons/arrow-right';
import Copy from '@sightlab/icons/copy';
import Check from '@sightlab/icons/check';
import ExternalLink from '@sightlab/icons/external-link';
import Refresh from '@sightlab/icons/refresh';
import More from '@sightlab/icons/more';

const icons = {
  'menu': Menu,
  'close': Close,
  'search': Search,
  'filter': Filter,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'arrow-up': ArrowUp,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'copy': Copy,
  'check': Check,
  'external-link': ExternalLink,
  'refresh': Refresh,
  'more': More,
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
