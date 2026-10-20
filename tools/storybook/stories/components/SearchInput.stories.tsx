import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from '@sightlab/ui';

const meta = {
  title: 'Components/Search Input',
  component: SearchInput,
  args: { placeholder: '노트 검색' },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focus: Story = {
  render: (args) => <SearchInput {...args} data-story-state="focus" />,
};

export const Filled: Story = {
  args: { defaultValue: 'React' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sl-spacing-lg)' }}>
      <SearchInput placeholder="노트 검색" />
      <SearchInput placeholder="노트 검색" data-story-state="focus" />
      <SearchInput defaultValue="React" />
      <SearchInput placeholder="노트 검색" disabled />
    </div>
  ),
};
