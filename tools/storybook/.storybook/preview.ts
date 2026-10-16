import type { Preview } from '@storybook/react-vite';
import '@sightlab/design-tokens/tokens.css';
import '@sightlab/design-tokens/reset.css';
import '@sightlab/design-tokens/typography.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
  },
};

export default preview;
