import type { ComponentProps } from 'react';
import type { ExtraProps } from 'react-markdown';

import { CopyCodeButton } from './copy-code-button';

type NoteCodeBlockProps = ComponentProps<'pre'> & ExtraProps;

// 코드 블록 → 공용 Code Block (Figma 77:71): 머리줄(언어 + 복사) + 줄 번호 코드 영역.
// 글자 색은 shiki가 빌드 때 입힌 것을 그대로 쓰고, shiki의 바탕색 대신 공용 스타일의 bg-code를 쓴다.
export function NoteCodeBlock({ node, children }: NoteCodeBlockProps) {
  const language = String(node?.properties['dataLanguage'] ?? 'text');

  return (
    <figure className="sl-code-block">
      <figcaption className="sl-code-block__header">
        <span>{language}</span>
        <CopyCodeButton />
      </figcaption>
      {/* 긴 줄은 이 영역만 가로로 스크롤한다. 키보드로도 스크롤할 수 있게 focus를 받는다 */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="sl-code-block__body" tabIndex={0}>
        <pre className="sl-code-block__code">{children}</pre>
      </div>
    </figure>
  );
}
