import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterSelect } from '@sightlab/ui';

const options = [
  { value: 'all', label: '모든 태그' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
] as const;

const meta = {
  title: 'Components/Filter Select',
  component: FilterSelect,
  args: { options, defaultValue: 'all' },
} satisfies Meta<typeof FilterSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  render: (args) => <FilterSelect {...args} data-story-state="hover" />,
};

export const Active: Story = {
  render: (args) => <FilterSelect {...args} data-story-state="active" />,
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sl-spacing-lg)' }}>
      <FilterSelect options={options} defaultValue="all" />
      <FilterSelect options={options} defaultValue="all" data-story-state="hover" />
      <FilterSelect options={options} defaultValue="all" data-story-state="active" />
      <FilterSelect options={options} defaultValue="all" disabled />
    </div>
  ),
};
