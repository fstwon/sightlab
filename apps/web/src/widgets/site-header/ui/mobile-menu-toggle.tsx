import type { Ref } from 'react';

import { CloseIcon, MenuIcon } from '@/shared/ui/icon';

import styles from './mobile-menu-toggle.module.scss';

type MobileMenuToggleProps = {
  ref: Ref<HTMLButtonElement>;
  isOpen: boolean;
  controlsId: string;
  onToggle: () => void;
};

// 모바일 메뉴 열기·닫기 버튼 (44px). 열려 있으면 close 아이콘.
export function MobileMenuToggle({ ref, isOpen, controlsId, onToggle }: MobileMenuToggleProps) {
  const Icon = isOpen ? CloseIcon : MenuIcon;

  return (
    <button
      ref={ref}
      type="button"
      className={styles.toggle}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      onClick={onToggle}
    >
      <Icon className={styles.icon} aria-hidden="true" focusable="false" />
    </button>
  );
}
