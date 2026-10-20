import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '@sightlab/ui';

const meta = {
  title: 'Components/Container',
  component: Container,
  args: { size: 'content' },
  argTypes: {
    size: { control: 'radio', options: ['content', 'prose'] },
    as: { control: 'select', options: ['div', 'main', 'section', 'article'] },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Content: Story = {
  render: (args) => (
    <Container {...args}>
      <div style={{ padding: 24, background: 'var(--sl-color-bg-subtle)' }}>Content container</div>
    </Container>
  ),
};
export const Prose: Story = {
  args: { size: 'prose', as: 'article' },
  render: (args) => (
    <Container {...args}>
      <div style={{ padding: 24, background: 'var(--sl-color-bg-subtle)' }}>Prose container</div>
    </Container>
  ),
};
