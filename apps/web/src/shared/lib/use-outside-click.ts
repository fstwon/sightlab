import { type RefObject, useEffect, useEffectEvent } from 'react';

// isEnabled인 동안 ref 요소 바깥을 누르면 onOutsideClick을 부른다 (펼친 패널 닫기 등).
// 마우스·터치·펜을 함께 받으려고 pointerdown을 쓴다.
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
  isEnabled: boolean,
): void {
  const handleOutsideClick = useEffectEvent(onOutsideClick);

  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handleOutsideClick();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isEnabled, ref]);
}
