import '@sightlab/tokens';
import '@sightlab/ui';

import type { Preview } from '@storybook/html-vite';

// 공용 CSS는 앱 진입점과 같은 규칙으로 여기서 한 번만 불러온다 (tokens → ui).
const preview: Preview = {
  parameters: {
    layout: 'padded',
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Components'] },
    },
    a11y: {
      // 위반을 패널에 오류로 표시 (CI 실패 처리는 테스트 단계에서 결정)
      test: 'error',
    },
  },
};

export default preview;
