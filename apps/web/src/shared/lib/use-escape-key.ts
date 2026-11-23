import { useEffect, useEffectEvent } from 'react';

// isEnabled인 동안 Esc 키를 누르면 onEscape를 부른다.
// onEscape가 렌더마다 새로 만들어져도 리스너를 다시 붙이지 않도록 useEffectEvent로 감싼다.
export function useEscapeKey(onEscape: () => void, isEnabled: boolean): void {
  const handleEscape = useEffectEvent(onEscape);

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleEscape();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled]);
}
