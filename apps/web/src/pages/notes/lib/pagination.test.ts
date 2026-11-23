import { describe, expect, it } from 'vitest';

import { getPageItems } from './get-page-items';
import { getTotalPages, paginate } from './paginate';
import { parsePage } from './parse-page';

describe('getTotalPages', () => {
  it('9개씩 나눈 페이지 수, 항목이 없어도 1페이지다', () => {
    expect(getTotalPages(0)).toBe(1);
    expect(getTotalPages(9)).toBe(1);
    expect(getTotalPages(10)).toBe(2);
    expect(getTotalPages(100)).toBe(12);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  it('해당 페이지의 항목만 돌려준다', () => {
    expect(paginate(items, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(paginate(items, 3)).toEqual([19, 20]);
  });
});

describe('parsePage', () => {
  it('올바른 값은 그대로 쓴다', () => {
    expect(parsePage('6', 12)).toBe(6);
  });

  it('값이 없거나 숫자가 아니거나 1보다 작으면 1페이지다', () => {
    expect(parsePage(null, 12)).toBe(1);
    expect(parsePage('abc', 12)).toBe(1);
    expect(parsePage('0', 12)).toBe(1);
    expect(parsePage('-3', 12)).toBe(1);
    expect(parsePage('2.5', 12)).toBe(1);
  });

  it('마지막 페이지보다 크면 마지막 페이지다', () => {
    expect(parsePage('99', 12)).toBe(12);
  });
});

describe('getPageItems', () => {
  it('데스크톱(앞뒤 1개): 처음·끝과 현재 주변, 사이가 2 이상이면 말줄임', () => {
    expect(getPageItems(6, 12)).toEqual([1, 'ellipsis', 5, 6, 7, 'ellipsis', 12]);
    expect(getPageItems(1, 12)).toEqual([1, 2, 'ellipsis', 12]);
    expect(getPageItems(12, 12)).toEqual([1, 'ellipsis', 11, 12]);
  });

  it('모바일(앞뒤 0개): 처음·현재·끝만', () => {
    expect(getPageItems(6, 12, 0)).toEqual([1, 'ellipsis', 6, 'ellipsis', 12]);
  });

  it('한 페이지만 빌 때는 말줄임 대신 그 번호를 넣는다', () => {
    expect(getPageItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(getPageItems(3, 12, 0)).toEqual([1, 2, 3, 'ellipsis', 12]);
  });

  it('페이지가 1개면 1만 있다', () => {
    expect(getPageItems(1, 1)).toEqual([1]);
  });
});
