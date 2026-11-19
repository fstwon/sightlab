import chevronDownIcon from '@sightlab/icons/chevron-down.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type FilterSelectArgs = {
  label: string;
  open: boolean;
  disabled: boolean;
};

// 아이콘 SVG에 클래스와 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
const ICON = chevronDownIcon.replace(
  '<svg ',
  '<svg class="sl-filter-select__icon" aria-hidden="true" ',
);

// 규칙 문서(filter-select.mdx)의 마크업과 같은 구조로 그린다.
function renderFilterSelect({ label, open, disabled }: FilterSelectArgs): string {
  const classes = ['sl-filter-select'];
  if (open) classes.push('sl-filter-select--open');

  return `
    <button type="button" class="${classes.join(' ')}" aria-expanded="${open}"${disabled ? ' disabled' : ''}>
      <span>${label}</span>
      ${ICON}
    </button>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Filter Select',
  render: renderFilterSelect,
  args: { label: '모든 태그', open: false, disabled: false },
  // 폭은 앱 레이아웃이 정한다. Figma 예시 폭(180px)으로 감싸 보여 준다.
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'grid';
      wrapper.style.width = '180px';
      const content = story();
      if (typeof content === 'string') wrapper.innerHTML = content;
      else wrapper.append(content);
      return wrapper;
    },
  ],
} satisfies Meta<FilterSelectArgs>;

export default meta;

type Story = StoryObj<FilterSelectArgs>;

export const Default: Story = {};

export const Open: Story = { args: { open: true } };

export const Disabled: Story = { args: { disabled: true } };
