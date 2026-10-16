import type { Meta, StoryObj } from '@storybook/react-vite';

const variants = [
  ['Display', 'sl-type-display'], ['Heading 1', 'sl-type-h1'],
  ['Heading 2', 'sl-type-h2'], ['Heading 3', 'sl-type-h3'],
  ['Body large', 'sl-type-body-lg'], ['Body', 'sl-type-body'],
  ['Body small', 'sl-type-body-sm'], ['Label', 'sl-type-label'],
  ['Code', 'sl-type-code'],
] as const;

function TypographySamples() {
  return <div style={{ display: 'grid', gap: 'var(--sl-spacing-xl)', color: 'var(--sl-color-text-primary)' }}>
    {variants.map(([label, className]) => (
      <section key={className}>
        <div style={{ font: 'var(--sl-font-label)/18px var(--sl-font-sans)', color: 'var(--sl-color-text-secondary)', marginBottom: 8 }}>{label} · {className}</div>
        <div className={className}>Sightlab — 백문이불여일견</div>
      </section>
    ))}
  </div>;
}

const meta = { title: 'Foundations/Typography', component: TypographySamples } satisfies Meta<typeof TypographySamples>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Scale: Story = {};
