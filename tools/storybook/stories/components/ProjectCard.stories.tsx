import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from '@sightlab/ui';

const meta = {
  title: 'Components/Project Card',
  component: ProjectCard,
  args: {
    href: '/projects/sightlab',
    index: '01',
    category: 'LEARNING SYSTEM',
    title: 'Sightlab',
    description: '학습 기록과 복습 경험을 하나의 흐름으로 연결합니다.',
    tags: ['React'],
    connectedNotes: 12,
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  render: (args) => <ProjectCard {...args} data-story-state="hover" />,
};

export const TagOverflow: Story = {
  args: {
    tags: ['React', 'TypeScript', 'Architecture', 'Testing'],
  },
};

export const LongTags: Story = {
  args: {
    tags: ['VeryLongTechnologyTagWithoutSpaces', 'AnotherVeryLongTechnologyTag', 'Testing'],
  },
};

export const Mobile: Story = {
  args: { size: 'mobile' },
  render: (args) => (
    <div style={{ width: 342, maxWidth: '100%' }}>
      <ProjectCard {...args} />
    </div>
  ),
};

export const MobilePressed: Story = {
  args: { size: 'mobile' },
  render: (args) => (
    <div style={{ width: 342, maxWidth: '100%' }}>
      <ProjectCard {...args} data-story-state="pressed" />
    </div>
  ),
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--sl-spacing-lg)' }}>
      <ProjectCard {...args} />
      <ProjectCard {...args} data-story-state="hover" />
      <ProjectCard {...args} tags={['React', 'TypeScript', 'Architecture']} />
    </div>
  ),
};
