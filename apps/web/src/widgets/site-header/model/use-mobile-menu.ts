import { useId, useRef, useState } from 'react';

import { BREAKPOINT_MD } from '@/shared/config/breakpoints';
import { useBodyScrollLock } from '@/shared/lib/use-body-scroll-lock';
import { useEscapeKey } from '@/shared/lib/use-escape-key';
import { useMediaQuery } from '@/shared/lib/use-media-query';

// 모바일 메뉴의 상태와 동작.
// 열려 있는 동안: 뒤 화면 스크롤 잠금, Esc로 닫고 메뉴 버튼으로 focus 복귀, 768px 이상으로 넓어지면 닫기.
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const isDesktop = useMediaQuery(`(width >= ${BREAKPOINT_MD}px)`);

  // 넓어지면 닫는다. 이전 렌더 값에 맞춰 렌더 중에 상태를 고치는 방식 (React 문서 권장, 효과 불필요)
  if (isOpen && isDesktop) setIsOpen(false);

  useBodyScrollLock(isOpen);
  useEscapeKey(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, isOpen);

  return {
    isOpen,
    buttonRef,
    panelId,
    toggle: () => {
      setIsOpen((open) => !open);
    },
    close: () => {
      setIsOpen(false);
    },
  };
}
