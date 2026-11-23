import Link from 'next/link';

import styles from './nav-link.module.scss';

type NavLinkProps = {
  label: string;
  href: string;
  isActive: boolean;
};

// 데스크톱 메뉴 링크 하나. 현재 화면이면 강조색(수정자 클래스)과 aria-current.
export function NavLink({ label, href, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}
