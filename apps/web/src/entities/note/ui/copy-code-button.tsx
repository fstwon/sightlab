'use client';

import { type MouseEvent, useEffect, useState } from 'react';

import { CheckIcon, CopyIcon } from '@/shared/ui/icon';

// 복사 완료 표시를 보여 주는 시간
const COPIED_MS = 2000;

// 코드 블록의 복사 버튼. 같은 코드 블록(figure) 안의 코드 글자를 클립보드에 넣는다.
// 줄 번호는 CSS(::before)로 그려 글자에 포함되지 않는다.
// 완료되면 2초간 "Copied"로 바꾸고, aria-live로 화면 낭독기에도 알린다.
export function CopyCodeButton() {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const code = event.currentTarget.closest('figure')?.querySelector('code')?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch {
      // 권한이 없거나 안전하지 않은 주소(http)에서는 복사하지 못한다. 버튼 표시는 그대로 둔다.
    }
  };

  return (
    <button
      type="button"
      className="sl-code-block__copy"
      onClick={(event) => void handleClick(event)}
    >
      <span aria-live="polite">{isCopied ? 'Copied' : 'Copy'}</span>
      {isCopied ? (
        <CheckIcon width={14} height={14} aria-hidden="true" />
      ) : (
        <CopyIcon width={14} height={14} aria-hidden="true" />
      )}
    </button>
  );
}
