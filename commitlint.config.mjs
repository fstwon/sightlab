// 커밋 메시지 규칙: Conventional Commits 타입 + 제목 (본문은 한국어 개조체, 브리프 D14)
// 형식: <type>(<scope>)?: <subject>. merge commit은 기본으로 검사에서 빠진다.
export default {
  extends: ['@commitlint/config-conventional'],
};
