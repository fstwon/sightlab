import { withLinter } from '../../lint-staged.config.mjs';

// 이 폴더에서 실행되므로 eslint가 tooling/eslint-config/eslint.config.js를 쓴다.
export default withLinter(['js', 'mjs'], 'eslint --fix --no-warn-ignored');
