import Link from 'next/link';

import { ArrowRightIcon } from '@/shared/ui/icon';

import styles from './mobile-menu-item.module.scss';

type MobileMenuItemProps = {
  order: number;
  label: string;
  href: string;
  isActive: boolean;
  onSelect: () => void;
};

// 모바일 메뉴 항목: 번호(01) + 이름 + 화살표. 현재 화면이면 왼쪽 막대와 강조색.
export function MobileMenuItem({ order, label, href, isActive, onSelect }: MobileMenuItemProps) {
  return (
    <Link
      href={href}
      className={isActive ? `${styles.item} ${styles.itemActive}` : styles.item}
      aria-current={isActive ? 'page' : undefined}
      onClick={onSelect}
    >
      <span className={styles.text}>
        <span className={styles.order} aria-hidden="true">
          {String(order).padStart(2, '0')}
        </span>
        <span className={styles.label}>{label}</span>
      </span>
      <ArrowRightIcon className={styles.arrow} aria-hidden="true" focusable="false" />
    </Link>
  );
}
