import { withLinter } from '../../../lint-staged.config.mjs';

// 이 폴더의 stylelint.config.mjs로 SCSS 속성 순서·토큰 사용 규칙을 고친다.
export default withLinter(['scss'], 'stylelint --fix');
