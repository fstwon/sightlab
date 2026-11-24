import { useEffect, useRef } from 'react';

// 마지막 호출 뒤 delay(ms) 동안 다시 부르지 않으면 callback을 한 번 실행한다 (입력 중에는 미룸).
// cancel은 기다리는 실행을 취소한다. 컴포넌트가 사라지면 기다리는 실행도 취소한다.
// callback이 렌더마다 새로 만들어져도 실행 시점의 최신 함수를 쓰도록 ref에 담아 둔다.
// (useEffectEvent로 만든 함수는 Effect 안에서만 부를 수 있어, 이벤트에서 건 타이머에는 쓸 수 없다)
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
): { run: (...args: Args) => void; cancel: () => void } {
  const latest = useRef(callback);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    latest.current = callback;
  });

  const cancel = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
  };

  const run = (...args: Args) => {
    cancel();
    timer.current = setTimeout(() => {
      timer.current = undefined;
      latest.current(...args);
    }, delay);
  };

  useEffect(() => cancel, []);

  return { run, cancel };
}
