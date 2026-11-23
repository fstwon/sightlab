import { withLinter } from '../../lint-staged.config.mjs';

// 이 폴더에서 실행되므로 eslint가 apps/storybook/eslint.config.mjs를 쓴다.
export default withLinter(['ts', 'mjs', 'js'], 'eslint --fix --no-warn-ignored');
