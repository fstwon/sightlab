import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '@sightlab/ui';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  args: { direction: 'column', gap: 'md', children: 'Stack items' },
  argTypes: {
    direction: { control: 'radio', options: ['row', 'column'] },
    gap: { control: 'select', options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = ['First', 'Second', 'Third'].map((label) => (
  <div
    key={label}
    style={{
      padding: 16,
      background: 'var(--sl-color-bg-subtle)',
      border: '1px solid var(--sl-color-border-default)',
    }}
  >
    {label}
  </div>
));

export const Column: Story = { render: (args) => <Stack {...args}>{items}</Stack> };
export const Row: Story = {
  args: { direction: 'row', gap: 'lg' },
  render: (args) => <Stack {...args}>{items}</Stack>,
};
