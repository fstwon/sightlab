import { baseConfig } from '@sightlab/stylelint-config/base';
import { extendRules } from '@sightlab/stylelint-config/extend-rules';

/** @type {import('stylelint').Config} */
export default extendRules(baseConfig, {
  rules: {
    // 토큰 원본은 실제 값을 정의하는 곳이므로 var() 강제를 끈다.
    'scale-unlimited/declaration-strict-value': null,
    // 변수 이름을 #{} 보간으로 만들어 정적 검사가 불가능하다.
    // 역할 색의 원색 참조는 semantic-colors.scss의 @error가 빌드 시 검사한다.
    'csstools/value-no-unknown-custom-properties': null,
  },
});
