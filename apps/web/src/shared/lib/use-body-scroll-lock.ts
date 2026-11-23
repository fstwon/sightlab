import { useEffect } from 'react';

// isLocked인 동안 뒤 화면(body) 스크롤을 막는다. 해제할 때 원래 값으로 되돌린다.
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}
