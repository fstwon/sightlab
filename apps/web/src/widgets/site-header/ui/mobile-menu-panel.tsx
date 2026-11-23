import type { NavItem } from '@/shared/config/navigation';
import { isActivePath } from '@/shared/lib/is-active-path';

import { MobileMenuItem } from './mobile-menu-item';
import styles from './mobile-menu-panel.module.scss';

type MobileMenuPanelProps = {
  id: string;
  items: readonly NavItem[];
  pathname: string;
  onClose: () => void;
};

// 헤더 아래에 펼치는 패널(메뉴 목록 + 아래 문구)과 덮개. 항목을 고르거나 덮개를 누르면 onClose.
export function MobileMenuPanel({ id, items, pathname, onClose }: MobileMenuPanelProps) {
  return (
    <div id={id} className={styles.overlay}>
      <nav aria-label="주 메뉴" className={styles.panel}>
        <ol className={styles.list}>
          {items.map(({ label, href }, index) => (
            <li key={href}>
              <MobileMenuItem
                order={index + 1}
                label={label}
                href={href}
                isActive={isActivePath(pathname, href)}
                onSelect={onClose}
              />
            </li>
          ))}
        </ol>
        <p className={styles.footer}>LEARNING ARCHIVE</p>
      </nav>
      {/* 덮개: 누르면 닫힌다. 키보드는 Esc나 메뉴 버튼으로 닫으므로 Tab 순서에서 뺀다 */}
      <button
        type="button"
        className={styles.scrim}
        aria-label="메뉴 닫기"
        tabIndex={-1}
        onClick={onClose}
      />
    </div>
  );
}
