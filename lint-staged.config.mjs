// lint-staged 루트 설정. 스테이징한 파일마다 가장 가까운 설정 하나만 쓰고(합쳐지지 않음),
// 명령은 그 설정 파일이 있는 폴더에서 실행된다. 린터가 있는 패키지는 자기 설정에서 withLinter를 쓴다.
// 타입 검사는 파일 단위로 할 수 없어 넣지 않는다 (CI 몫).

export const PRETTIER = 'prettier --write --ignore-unknown';

// 다른 glob은 동시에 실행되므로 한 파일이 두 glob에 걸리지 않게 나눈다:
// 린트 대상 확장자는 린터 → prettier 순서로, 나머지는 prettier만.
export function withLinter(extensions, linter) {
  const list = extensions.join(',');
  return {
    [`*.{${list}}`]: [linter, PRETTIER],
    [`!(*.{${list}})`]: PRETTIER,
  };
}

// 자기 설정이 없는 곳(루트 파일, icons, tooling 일부)은 prettier만
export default {
  '*': PRETTIER,
};
