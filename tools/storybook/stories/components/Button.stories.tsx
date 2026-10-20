import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@sightlab/ui';
import type { ButtonVariant } from '@sightlab/ui';

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const states = ['default', 'hover', 'focus', 'disabled'] as const;

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button', variant: 'primary' },
  argTypes: {
    variant: { control: 'select', options: variants },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

function StateExamples({ variant }: { variant: ButtonVariant }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sl-spacing-lg)' }}>
      {states.map((state) => (
        <div key={state} style={{ display: 'grid', gap: 'var(--sl-spacing-xs)' }}>
          <span
            style={{ fontSize: 'var(--sl-font-label)', color: 'var(--sl-color-text-secondary)' }}
          >
            {state}
          </span>
          <Button variant={variant} disabled={state === 'disabled'} data-story-state={state}>
            Button
          </Button>
        </div>
      ))}
    </div>
  );
}

export const Primary: Story = { render: () => <StateExamples variant="primary" /> };
export const Secondary: Story = { render: () => <StateExamples variant="secondary" /> };
export const Ghost: Story = { render: () => <StateExamples variant="ghost" /> };
export const Danger: Story = { render: () => <StateExamples variant="danger" /> };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sl-spacing-xl)' }}>
      {variants.map((variant) => (
        <section key={variant} style={{ display: 'grid', gap: 'var(--sl-spacing-sm)' }}>
          <h3 style={{ textTransform: 'capitalize', fontSize: 'var(--sl-font-h3)' }}>{variant}</h3>
          <StateExamples variant={variant} />
        </section>
      ))}
    </div>
  ),
};
