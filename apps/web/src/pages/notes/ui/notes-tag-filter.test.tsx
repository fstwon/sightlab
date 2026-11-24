// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { TagOption } from '../lib/tag-filter';
import { NotesSelectedTags } from './notes-selected-tags';
import { NotesTagFilter } from './notes-tag-filter';

// next/navigation은 Next 앱 안에서만 동작하므로 가짜로 바꾸고, replace 호출만 확인한다.
const replace = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace }) }));

const options: TagOption[] = [
  { name: 'React', slug: 'react', count: 8 },
  { name: 'Next.js', slug: 'nextjs', count: 5 },
  { name: 'CSS', slug: 'css', count: 4 },
];

function renderFilter(selected: string[] = [], query = '') {
  const user = userEvent.setup();
  render(
    <div>
      <NotesTagFilter options={options} selected={selected} query={query} />
      <NotesSelectedTags options={options} selected={selected} query={query} />
      <p>바깥</p>
    </div>,
  );
  const button = screen.getByRole('button', { name: /태그/ });
  return { user, button };
}

describe('NotesTagFilter', () => {
  beforeEach(() => {
    replace.mockClear();
  });

  it('버튼을 누르면 패널이 열리고 aria-expanded가 바뀐다', async () => {
    const { user, button } = renderFilter();
    expect(button).toHaveProperty('textContent', '모든 태그');
    expect(screen.queryByRole('group', { name: '태그' })).toBeNull();

    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('group', { name: '태그' })).toBeTruthy();
  });

  it('체크박스를 누르면 검색어를 유지한 채 ?tags=에 추가한다', async () => {
    const { user, button } = renderFilter(['react'], 'hook');
    expect(button).toHaveProperty('textContent', '태그 1개 선택');

    await user.click(button);
    expect(screen.getByRole('checkbox', { name: 'React 8' })).toHaveProperty('checked', true);
    await user.click(screen.getByRole('checkbox', { name: 'Next.js 5' }));
    expect(replace).toHaveBeenCalledWith('/notes?q=hook&tags=react,nextjs', { scroll: false });
  });

  it('선택된 체크박스를 다시 누르면 해제한다', async () => {
    const { user, button } = renderFilter(['react', 'css']);

    await user.click(button);
    await user.click(screen.getByRole('checkbox', { name: 'React 8' }));
    expect(replace).toHaveBeenCalledWith('/notes?tags=css', { scroll: false });
  });

  it('Esc를 누르면 닫고 버튼으로 focus를 돌려준다', async () => {
    const { user, button } = renderFilter();

    await user.click(button);
    await user.click(screen.getByRole('checkbox', { name: 'CSS 4' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('group', { name: '태그' })).toBeNull();
    expect(document.activeElement).toBe(button);
  });

  it('바깥을 누르면 닫는다', async () => {
    const { user, button } = renderFilter();

    await user.click(button);
    await user.click(screen.getByText('바깥'));
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('group', { name: '태그' })).toBeNull();
  });
});

describe('NotesSelectedTags', () => {
  beforeEach(() => {
    replace.mockClear();
  });

  it('선택이 없으면 그리지 않는다', () => {
    renderFilter();
    expect(screen.queryByRole('button', { name: '필터 초기화' })).toBeNull();
  });

  it('칩을 누르면 그 태그만 빼고, focus를 태그 필터 버튼으로 옮긴다', async () => {
    const { user, button } = renderFilter(['react', 'nextjs'], 'hook');

    await user.click(screen.getByRole('button', { name: 'React 필터 해제' }));
    expect(replace).toHaveBeenCalledWith('/notes?q=hook&tags=nextjs', { scroll: false });
    expect(document.activeElement).toBe(button);
  });

  it('필터 초기화는 태그만 지우고 검색어는 유지한다', async () => {
    const { user } = renderFilter(['react', 'nextjs'], 'hook');

    await user.click(screen.getByRole('button', { name: '필터 초기화' }));
    expect(replace).toHaveBeenCalledWith('/notes?q=hook', { scroll: false });
  });
});
