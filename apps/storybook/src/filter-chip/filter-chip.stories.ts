import closeIcon from '@sightlab/icons/close.svg?raw';
import type { Meta, StoryObj } from '@storybook/html-vite';

type FilterChipArgs = {
  label: string;
};

// 아이콘 SVG에 클래스와 aria-hidden을 붙인다 (@sightlab/icons는 SVG 파일만 제공).
const ICON = closeIcon.replace('<svg ', '<svg class="sl-filter-chip__icon" aria-hidden="true" ');

// 규칙 문서(filter-chip.mdx)의 마크업과 같은 구조로 그린다.
function renderFilterChip({ label }: FilterChipArgs): string {
  return `
    <button type="button" class="sl-filter-chip" aria-label="${label} 필터 해제">
      <span>${label}</span>
      ${ICON}
    </button>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Filter Chip',
  render: renderFilterChip,
  args: { label: 'React' },
} satisfies Meta<FilterChipArgs>;

export default meta;

type Story = StoryObj<FilterChipArgs>;

export const Default: Story = {};

export const LongLabel: Story = { name: 'Long label', args: { label: 'Architecture' } };

// 선택한 필터 여러 개를 줄지어 보여 줄 때 (간격·줄바꿈은 앱 레이아웃)
export const Row: Story = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      ${['React', 'TypeScript', 'Next.js'].map((label) => renderFilterChip({ label })).join('')}
    </div>`,
};
