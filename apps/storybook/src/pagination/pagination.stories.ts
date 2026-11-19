import arrowLeftIcon from '@sightlab/icons/arrow-left.svg?raw';
import arrowRightIcon from '@sightlab/icons/arrow-right.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type PaginationArgs = {
  total: number;
  current: number;
};

// 아이콘 SVG에 클래스와 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
function withIconClass(svg: string): string {
  return svg.replace('<svg ', '<svg class="sl-pagination__icon" aria-hidden="true" ');
}

const PREV_ICON = withIconClass(arrowLeftIcon);
const NEXT_ICON = withIconClass(arrowRightIcon);

// 번호 배치 예시 계산 (실제 계산은 앱 몫). 처음·끝 페이지와 현재 주변 3개를 보여 주고,
// 사이가 2페이지 이상 비면 말줄임, 1페이지만 비면 그 번호를 그대로 보여 준다.
function getPageSlots(total: number, current: number): (number | 'ellipsis')[] {
  const start = Math.max(1, Math.min(current - 1, total - 2));
  const end = Math.min(total, Math.max(current + 1, 3));
  const pages = new Set([1, total]);
  for (let page = start; page <= end; page += 1) pages.add(page);

  const sorted = [...pages].sort((a, b) => a - b);
  const slots: (number | 'ellipsis')[] = [];
  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];
    if (previous !== undefined && page - previous === 2) slots.push(page - 1);
    else if (previous !== undefined && page - previous > 2) slots.push('ellipsis');
    slots.push(page);
  });
  return slots;
}

function renderNav(page: number, enabled: boolean, label: string, icon: string): string {
  return enabled
    ? `<li><a class="sl-pagination__item" href="?page=${page}" aria-label="${label}">${icon}</a></li>`
    : `<li><a class="sl-pagination__item sl-pagination__item--disabled" role="link" aria-disabled="true" aria-label="${label}">${icon}</a></li>`;
}

// 규칙 문서(pagination.mdx)의 마크업과 같은 구조로 그린다.
function renderPagination({ total, current }: PaginationArgs): string {
  const lastPage = Math.max(1, Math.round(total));
  const page = Math.min(lastPage, Math.max(1, Math.round(current)));

  const numbers = getPageSlots(lastPage, page)
    .map((slot) => {
      if (slot === 'ellipsis') return '<li><span class="sl-pagination__ellipsis">…</span></li>';
      return slot === page
        ? `<li><a class="sl-pagination__item sl-pagination__item--current" href="?page=${slot}" aria-current="page">${slot}</a></li>`
        : `<li><a class="sl-pagination__item" href="?page=${slot}">${slot}</a></li>`;
    })
    .join('');

  return `
    <nav aria-label="페이지">
      <ol class="sl-pagination">
        ${renderNav(page - 1, page > 1, '이전 페이지', PREV_ICON)}
        ${numbers}
        ${renderNav(page + 1, page < lastPage, '다음 페이지', NEXT_ICON)}
      </ol>
    </nav>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Pagination',
  render: renderPagination,
  args: { total: 12, current: 1 },
  argTypes: {
    total: { control: { type: 'number', min: 1, step: 1 } },
    current: { control: { type: 'number', min: 1, step: 1 } },
  },
} satisfies Meta<PaginationArgs>;

export default meta;

type Story = StoryObj<PaginationArgs>;

export const Start: Story = {};

export const Middle: Story = { args: { current: 6 } };

export const End: Story = { args: { current: 12 } };
