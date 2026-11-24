import chevronDownIcon from '@sightlab/icons/chevron-down.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

import { renderFilterOption } from '../filter-option/render-filter-option';

type FilterPanelArgs = {
  // 선택된 값 (쉼표로 구분)
  selected: string;
};

const OPTIONS = [
  { label: 'React', count: 8 },
  { label: 'Architecture', count: 7 },
  { label: 'TypeScript', count: 6 },
  { label: 'Next.js', count: 5 },
  { label: 'CSS', count: 4 },
  { label: 'Testing', count: 3 },
];

// 규칙 문서(filter-panel.mdx)의 마크업과 같은 구조로 그린다.
function renderFilterPanel({ selected }: FilterPanelArgs): string {
  const chosen = selected.split(',').map((value) => value.trim());
  return `
    <div class="sl-filter-panel" id="tag-filter-panel">
      <fieldset class="sl-filter-panel__group">
        <legend class="sl-filter-panel__legend">태그</legend>
        ${OPTIONS.map((option) => renderFilterOption({ ...option, checked: chosen.includes(option.label) })).join('')}
      </fieldset>
    </div>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Filter Panel',
  render: renderFilterPanel,
  args: { selected: 'React, TypeScript' },
  // 폭은 앱이 정한다. Figma 예시 폭(280px)으로 감싸 보여 준다.
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.width = '280px';
      const content = story();
      if (typeof content === 'string') wrapper.innerHTML = content;
      else wrapper.append(content);
      return wrapper;
    },
  ],
} satisfies Meta<FilterPanelArgs>;

export default meta;

type Story = StoryObj<FilterPanelArgs>;

export const Default: Story = {};

// Filter Select 아래에 펼친 모습 (위치는 앱이 정한다: 버튼 아래 8px)
export const WithSelect: Story = {
  name: 'With Filter Select',
  render: (args) => `
    <div style="display: grid; gap: 8px">
      <button type="button" class="sl-filter-select sl-filter-select--open" aria-expanded="true" aria-controls="tag-filter-panel">
        <span>태그 2개 선택</span>
        ${chevronDownIcon.replace('<svg ', '<svg class="sl-filter-select__icon" aria-hidden="true" ')}
      </button>
      ${renderFilterPanel(args)}
    </div>`,
};
