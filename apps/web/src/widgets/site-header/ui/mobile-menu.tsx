'use client';

import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/shared/config/navigation';

import { useMobileMenu } from '../model/use-mobile-menu';
import styles from './mobile-menu.module.scss';
import { MobileMenuPanel } from './mobile-menu-panel';
import { MobileMenuToggle } from './mobile-menu-toggle';

// 768px 미만 메뉴 (조립): 상태·동작은 useMobileMenu, 화면은 버튼과 패널.
export function MobileMenu() {
  const { isOpen, buttonRef, panelId, toggle, close } = useMobileMenu();
  // 타입상 null일 수 있다 (Pages Router 호환). App Router에서는 항상 문자열.
  const pathname = usePathname() ?? '';

  return (
    <div className={styles.mobileMenu}>
      <MobileMenuToggle ref={buttonRef} isOpen={isOpen} controlsId={panelId} onToggle={toggle} />
      {isOpen && (
        <MobileMenuPanel id={panelId} items={NAV_ITEMS} pathname={pathname} onClose={close} />
      )}
    </div>
  );
}
