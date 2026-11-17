import { fileURLToPath } from 'node:url';

/**
 * Stylelint는 extends·plugins 문자열을 소비 패키지 위치에서 찾는다.
 * pnpm에서는 이 패키지의 의존성이 소비 패키지에 보이지 않으므로 여기서 절대 경로로 바꿔 넘긴다.
 * @param {string} id
 */
export function resolveModule(id) {
  return fileURLToPath(import.meta.resolve(id));
}
