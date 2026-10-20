import type { Meta, StoryObj } from '@storybook/react-vite';

const spacings = [
  ['2xs', 4],
  ['xs', 8],
  ['sm', 12],
  ['md', 16],
  ['lg', 24],
  ['xl', 32],
  ['2xl', 48],
  ['3xl', 64],
] as const;

function SpacingScale() {
  return (
    <div
      style={{ display: 'grid', gap: 'var(--sl-spacing-lg)', fontFamily: 'var(--sl-font-sans)' }}
    >
      {spacings.map(([name, pixels]) => (
        <div
          key={name}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px minmax(0, 1fr)',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <code>
            {name} · {pixels}px
          </code>
          <div
            style={{
              width: `var(--sl-spacing-${name})`,
              height: 24,
              background: 'var(--sl-color-action-primary)',
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  );
}

const meta = { title: 'Foundations/Spacing', component: SpacingScale } satisfies Meta<
  typeof SpacingScale
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Scale: Story = {};
