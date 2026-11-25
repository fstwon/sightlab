import type { ComponentProps } from 'react';

import { ExternalLinkIcon, type IconComponent } from '@/shared/ui/icon';

import styles from './external-link-button.module.scss';

type ExternalLinkButtonProps = Omit<ComponentProps<'a'>, 'target' | 'rel'> & {
  href: string;
  // 글자 앞에 두는 아이콘 (예: Demo는 Globe, Source는 Code)
  icon?: IconComponent;
};

// 다른 사이트로 가는 버튼 모양 링크 (Figma Button Secondary + 앞·뒤 아이콘).
// 새 탭으로 열고, 화면 낭독기에는 새 탭에서 열린다는 것을 알린다. 아이콘은 꾸밈이라 읽지 않는다.
export function ExternalLinkButton({
  href,
  icon: Icon,
  className,
  children,
  ...rest
}: ExternalLinkButtonProps) {
  const classNames = ['sl-button', 'sl-button--secondary', className].filter(Boolean).join(' ');

  return (
    <a {...rest} className={classNames} href={href} target="_blank" rel="noopener noreferrer">
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {children}
      <ExternalLinkIcon className={styles.icon} aria-hidden="true" />
      <span className={styles.hidden}> (새 탭에서 열림)</span>
    </a>
  );
}
