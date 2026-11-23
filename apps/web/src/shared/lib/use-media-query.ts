import { useSyncExternalStore } from 'react';

// 미디어 쿼리(예: '(width >= 768px)')가 지금 화면과 맞는지 돌려주고, 바뀌면 다시 렌더한다.
// 서버 렌더에서는 화면을 알 수 없어 false로 시작한다.
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => {
        mediaQuery.removeEventListener('change', onChange);
      };
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
