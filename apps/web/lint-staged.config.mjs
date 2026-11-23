import { PRETTIER } from '../../lint-staged.config.mjs';

// 이 폴더에서 실행되므로 eslint·stylelint가 apps/web의 설정을 쓴다.
// 다른 glob은 동시에 실행되므로 한 파일이 두 glob에 걸리지 않게 나눈다.
export default {
  '*.{ts,tsx,mjs}': ['eslint --fix --no-warn-ignored', PRETTIER],
  '*.{css,scss}': ['stylelint --fix', PRETTIER],
  '!(*.{ts,tsx,mjs,css,scss})': PRETTIER,
};
