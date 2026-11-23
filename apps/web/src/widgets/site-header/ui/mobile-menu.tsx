'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { BREAKPOINT_MD } from '@/shared/config/breakpoints';
import { NAV_ITEMS } from '@/shared/config/navigation';
import { ArrowRightIcon, CloseIcon, MenuIcon } from '@/shared/ui/icon';

import styles from './mobile-menu.module.scss';

// 768px 미만 메뉴 (Figma MOBILE-00 / Navigation Open). 헤더 아래에 패널과 덮개를 펼친다.
// 닫기: 버튼, 덮개, Esc, 메뉴 이동, 화면이 768px 이상으로 넓어질 때.
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? '';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = () => {
    setIsOpen(false);
  };

  // 열려 있는 동안: 뒤 화면 스크롤 잠금, Esc로 닫고 버튼으로 focus 복귀, 넓어지면 닫기
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    const desktopQuery = window.matchMedia(`(width >= ${BREAKPOINT_MD}px)`);
    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleResize);
    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleResize);
    };
  }, [isOpen]);

  const ToggleIcon = isOpen ? CloseIcon : MenuIcon;

  return (
    <div className={styles.mobileMenu}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        <ToggleIcon className={styles.toggleIcon} aria-hidden="true" focusable="false" />
      </button>

      {isOpen && (
        <div id={panelId} className={styles.overlay}>
          <nav aria-label="주 메뉴" className={styles.panel}>
            <ol className={styles.list}>
              {NAV_ITEMS.map(({ label, href }, index) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={isActive ? `${styles.item} ${styles.itemActive}` : styles.item}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={close}
                    >
                      <span className={styles.itemText}>
                        <span className={styles.itemIndex} aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.itemLabel}>{label}</span>
                      </span>
                      <ArrowRightIcon
                        className={styles.itemArrow}
                        aria-hidden="true"
                        focusable="false"
                      />
                    </Link>
                  </li>
                );
              })}
            </ol>
            <p className={styles.panelFooter}>LEARNING ARCHIVE</p>
          </nav>
          {/* 덮개: 누르면 닫힌다. 키보드는 Esc나 메뉴 버튼으로 닫으므로 Tab 순서에서 뺀다 */}
          <button
            type="button"
            className={styles.scrim}
            aria-label="메뉴 닫기"
            tabIndex={-1}
            onClick={close}
          />
        </div>
      )}
    </div>
  );
}
