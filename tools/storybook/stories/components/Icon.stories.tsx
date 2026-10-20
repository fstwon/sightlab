import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '@sightlab/ui';
import type { IconName } from '@sightlab/ui';

const names: IconName[] = [
  'menu', 'close', 'search', 'filter',
  'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
  'arrow-up', 'arrow-left', 'arrow-right',
  'copy', 'check', 'external-link', 'refresh', 'more',
];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'search', size: 24 },
  argTypes: {
    name: { control: 'select', options: names },
    size: { control: 'number' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Library: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
      {names.map((name) => (
        <div key={name} style={{
          display: 'grid', placeItems: 'center', gap: 14,
          minHeight: 112, borderRadius: 12, background: '#f9f9fb',
          color: 'var(--sl-color-text-primary)', padding: 12,
        }}>
          <Icon name={name} />
          <span style={{ fontSize: 12 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const SizesAndColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Icon name="search" size={16} />
      <Icon name="search" size={24} />
      <Icon name="search" size={32} />
      <Icon name="search" size={24} style={{ color: 'var(--sl-color-text-brand)' }} />
    </div>
  ),
};
