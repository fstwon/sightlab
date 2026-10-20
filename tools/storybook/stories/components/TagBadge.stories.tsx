import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagBadge } from '@sightlab/ui';
import type { TagBadgeVariant } from '@sightlab/ui';

const variants: TagBadgeVariant[] = ['neutral', 'brand', 'accent'];

const meta = {
  title: 'Components/Tag Badge',
  component: TagBadge,
  args: { children: 'React', variant: 'neutral', selected: false },
  argTypes: {
    variant: { control: 'select', options: variants },
    selected: { control: 'boolean' },
  },
} satisfies Meta<typeof TagBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sl-spacing-lg)' }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--sl-spacing-lg)' }}
        >
          <TagBadge variant={variant}>React</TagBadge>
          <TagBadge variant={variant} selected>
            React
          </TagBadge>
        </div>
      ))}
    </div>
  ),
};
