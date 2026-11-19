import type { Meta, StoryObj } from '@storybook/html-vite';

type TagVariant = 'neutral' | 'brand' | 'accent';

type TagArgs = {
  label: string;
  variant: TagVariant;
  selected: boolean;
  as: 'span' | 'button';
};

// 규칙 문서(tag.mdx)의 마크업과 같은 구조로 그린다.
function renderTag({ label, variant, selected, as }: TagArgs): string {
  const classes = ['sl-tag'];
  if (variant !== 'neutral') classes.push(`sl-tag--${variant}`);
  if (selected) classes.push('sl-tag--selected');

  if (as === 'button') {
    // 필터 토글: 선택 상태를 aria-pressed로도 알린다 (스타일은 수정자로만)
    return `<button type="button" class="${classes.join(' ')}" aria-pressed="${selected}">${label}</button>`;
  }

  return `<span class="${classes.join(' ')}">${label}</span>`;
}

// CSF 형식상 meta는 default export (D10 named export 규칙의 예외)
const meta = {
  title: 'Components/Tag',
  render: renderTag,
  args: { label: 'React', variant: 'neutral', selected: false, as: 'span' },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'brand', 'accent'] },
    as: { control: 'inline-radio', options: ['span', 'button'] },
  },
} satisfies Meta<TagArgs>;

export default meta;

type Story = StoryObj<TagArgs>;

export const Neutral: Story = {};

export const Brand: Story = { args: { variant: 'brand' } };

export const Accent: Story = { args: { variant: 'accent' } };

export const NeutralSelected: Story = { name: 'Neutral (selected)', args: { selected: true } };

export const BrandSelected: Story = {
  name: 'Brand (selected)',
  args: { variant: 'brand', selected: true },
};

export const AccentSelected: Story = {
  name: 'Accent (selected)',
  args: { variant: 'accent', selected: true },
};

export const FilterButton: Story = {
  name: 'Filter button',
  args: { as: 'button', selected: true },
};
