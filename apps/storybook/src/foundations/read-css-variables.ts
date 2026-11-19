// 빌드된 토큰 CSS(문자열)에서 --sl-* 변수 목록을 뽑는다.
// Foundations 문서가 값을 다시 적지 않고 토큰 패키지의 실제 출력을 그대로 보여 주기 위해 사용한다.

export type CssVariable = {
  /** 변수 이름 (예: --sl-spacing-md) */
  name: string;
  /** 접두사를 뺀 짧은 이름 (예: md) */
  key: string;
  /** 선언된 값 (예: 16px, var(--sl-color-neutral-50)) */
  value: string;
};

const DECLARATION = /(--sl-[\w-]+)\s*:\s*([^;]+);/g;

export function readCssVariables(css: string, prefix: string): CssVariable[] {
  return [...css.matchAll(DECLARATION)]
    .map(([, name = '', value = '']) => ({
      name,
      key: name.slice(prefix.length),
      value: value.trim(),
    }))
    .filter(({ name }) => name.startsWith(prefix));
}
