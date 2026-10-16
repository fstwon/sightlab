import type { Meta, StoryObj } from '@storybook/react-vite';

const swatches = [
  ['Neutral 0', '--sl-color-neutral-0'], ['Neutral 50', '--sl-color-neutral-50'],
  ['Neutral 100', '--sl-color-neutral-100'], ['Neutral 200', '--sl-color-neutral-200'],
  ['Neutral 500', '--sl-color-neutral-500'], ['Neutral 900', '--sl-color-neutral-900'],
  ['Purple 50', '--sl-color-purple-50'], ['Purple 600', '--sl-color-purple-600'],
  ['Orange 100', '--sl-color-orange-100'], ['Orange 500', '--sl-color-orange-500'],
  ['Green 600', '--sl-color-green-600'], ['Red 600', '--sl-color-red-600'],
  ['Code 900', '--sl-color-code-900'],
] as const;

const semantic = [
  ['Canvas', '--sl-color-bg-canvas'], ['Surface', '--sl-color-bg-surface'],
  ['Subtle', '--sl-color-bg-subtle'], ['Brand soft', '--sl-color-bg-brand-soft'],
  ['Accent soft', '--sl-color-bg-accent-soft'], ['Primary text', '--sl-color-text-primary'],
  ['Secondary text', '--sl-color-text-secondary'], ['Brand text', '--sl-color-text-brand'],
  ['Border', '--sl-color-border-default'], ['Primary action', '--sl-color-action-primary'],
  ['Accent', '--sl-color-accent-default'], ['Success', '--sl-color-status-success'],
  ['Danger', '--sl-color-status-danger'],
] as const;

function ColorPalette({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
    {items.map(([label, token]) => (
      <div key={token} style={{ fontFamily: 'var(--sl-font-sans)' }}>
        <div style={{ height: 88, background: `var(${token})`, border: '1px solid var(--sl-color-border-default)', borderRadius: 'var(--sl-radius-sm)' }} />
        <div style={{ marginTop: 8, fontWeight: 600 }}>{label}</div>
        <code style={{ fontSize: 12 }}>{token}</code>
      </div>
    ))}
  </div>;
}

const meta = { title: 'Foundations/Colors', component: ColorPalette } satisfies Meta<typeof ColorPalette>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primitives: Story = { args: { items: swatches } };
export const Semantic: Story = { args: { items: semantic } };
