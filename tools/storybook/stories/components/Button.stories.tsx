import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@sightlab/ui';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button', variant: 'primary' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Disabled: Story = { args: { disabled: true } };
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sl-spacing-md)' }}>
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
        <Button key={variant} variant={variant}>{variant}</Button>
      ))}
    </div>
  ),
};
