// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CopyCodeButton } from './copy-code-button';

describe('CopyCodeButton', () => {
  it('같은 코드 블록의 코드 글자를 복사하고 "Copied"로 바꾼다', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    // user-event가 setup 때 clipboard를 자기 것으로 바꾸므로, 그 뒤에 가짜로 바꾼다
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    render(
      <figure>
        <figcaption>
          <CopyCodeButton />
        </figcaption>
        <pre>
          <code>
            <span className="sl-code-block__line">const a = 1;</span>
            {'\n'}
            <span className="sl-code-block__line">const b = 2;</span>
          </code>
        </pre>
      </figure>,
    );

    await user.click(screen.getByRole('button', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledWith('const a = 1;\nconst b = 2;');
    expect(screen.getByRole('button').textContent).toBe('Copied');
  });

  it('복사에 실패하면 "Copy"를 그대로 둔다', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });
    render(
      <figure>
        <CopyCodeButton />
        <code>x</code>
      </figure>,
    );

    await user.click(screen.getByRole('button', { name: 'Copy' }));

    expect(screen.getByRole('button').textContent).toBe('Copy');
  });
});
