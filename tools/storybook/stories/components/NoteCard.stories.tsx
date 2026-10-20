import type { Meta, StoryObj } from '@storybook/react-vite';
import { NoteCard } from '@sightlab/ui';

const meta = {
  title: 'Components/Note Card',
  component: NoteCard,
  args: {
    title: '노트 제목',
    summary: '노트 요약',
    tags: ['React', 'Architecture'],
    date: '2026-09-03',
    readingMinutes: 6,
  },
} satisfies Meta<typeof NoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  args: { 'data-story-state': 'hover' },
};

export const Overflow: Story = {
  args: {
    title: '태그가 많은 노트',
    summary: '대표 태그 두 개와 나머지 태그 개수를 표시합니다.',
    tags: ['React', 'Architecture', 'TypeScript', 'Design', 'Testing'],
    date: '2026-09-07',
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--sl-spacing-lg)' }}>
      <NoteCard {...args} />
      <NoteCard {...args} data-story-state="hover" />
      <NoteCard
        {...args}
        title="태그가 많은 노트"
        tags={['React', 'Architecture', 'TypeScript', 'Design', 'Testing']}
      />
    </div>
  ),
};
