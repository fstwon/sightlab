// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { NotesSearch, SEARCH_DELAY_MS } from './notes-search';

// next/navigation은 Next 앱 안에서만 동작하므로 가짜로 바꾸고, replace 호출만 확인한다.
const replace = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace }) }));

// 가짜 타이머로 300ms 기다림을 앞으로 감는다. 입력은 fireEvent(동기)로 보낸다:
// user-event는 내부에서 타이머로 기다려, 멈춘 가짜 타이머와 함께 쓰면 끝나지 않는다.
function setup(query = '') {
  vi.useFakeTimers();
  const utils = render(<NotesSearch query={query} />);
  const input = screen.getByRole('searchbox', { name: '노트 검색' });
  const type = (value: string) => {
    fireEvent.change(input, { target: { value } });
  };
  const wait = (ms = SEARCH_DELAY_MS) => {
    act(() => {
      vi.advanceTimersByTime(ms);
    });
  };
  return { input, type, wait, ...utils };
}

describe('NotesSearch', () => {
  beforeEach(() => {
    replace.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('입력을 멈추고 300ms가 지나면 URL을 한 번만 바꾼다', () => {
    const { input, type, wait } = setup();

    type('r');
    wait(100);
    type('react');
    expect(input).toHaveProperty('value', 'react');
    wait(SEARCH_DELAY_MS - 1);
    expect(replace).not.toHaveBeenCalled();

    wait(1);
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith('/notes?q=react', { scroll: false });
  });

  it('검색어를 모두 지우면 /notes로 돌아간다 (페이지도 지움)', () => {
    const { type, wait } = setup('react');

    type('');
    wait();
    expect(replace).toHaveBeenCalledWith('/notes', { scroll: false });
  });

  it('Enter(제출)를 누르면 기다리지 않고 바로 바꾸고, 기다리던 실행은 취소한다', () => {
    const { input, type, wait } = setup();

    type('jwt');
    fireEvent.submit(input);
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith('/notes?q=jwt', { scroll: false });

    wait();
    expect(replace).toHaveBeenCalledTimes(1);
  });

  it('URL의 검색어와 같으면 다시 바꾸지 않는다 (앞뒤 공백 무시)', () => {
    const { type, wait } = setup('react');

    type('react ');
    wait();
    expect(replace).not.toHaveBeenCalled();
  });

  it('뒤로 가기 등으로 URL 검색어가 바뀌면 입력란도 따라간다', () => {
    const { rerender, input } = setup('react');

    rerender(<NotesSearch query="jwt" />);
    expect(input).toHaveProperty('value', 'jwt');
  });
});
