import type { ReactNode } from 'react';

import {
  CheckIcon,
  CloseIcon,
  ExclamationIcon,
  type IconComponent,
  InfoIcon,
} from '@/shared/ui/icon';

import { CALLOUT_TITLES, type CalloutType, getCalloutType } from '../lib/get-callout-type';

const ICONS: Record<CalloutType, IconComponent> = {
  info: InfoIcon,
  tip: CheckIcon,
  warning: ExclamationIcon,
  error: CloseIcon,
};

type NoteCalloutProps = {
  // Notion 콜아웃 배경색 (<callout color="blue_bg">)
  color?: string;
  children?: ReactNode;
};

// Notion 콜아웃 → 공용 Callout (Figma 77:100). 배경색으로 종류를 고르고, Notion 이모지는 쓰지 않는다.
export function NoteCallout({ color, children }: NoteCalloutProps) {
  const type = getCalloutType(color);
  const Icon = ICONS[type];

  return (
    <div className={`sl-callout sl-callout--${type}`} role="note">
      <span className="sl-callout__icon">
        <Icon aria-hidden="true" />
      </span>
      <div className="sl-callout__body">
        <p className="sl-callout__title">{CALLOUT_TITLES[type]}</p>
        <div className="sl-callout__content">{children}</div>
      </div>
    </div>
  );
}
