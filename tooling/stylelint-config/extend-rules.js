/**
 * 설정에 규칙을 덧붙인다. 최상위(.css)와 SCSS overrides에 각각 적용한다.
 * overrides(standard-scss)가 extends로 가져온 규칙은 최상위 rules보다 우선하므로,
 * 우리가 조정한 규칙을 overrides 안에도 다시 적용해야 .scss 파일도 같은 기준으로 검사된다.
 * @param {import('stylelint').Config} config
 * @param {{
 *   rules?: import('stylelint').Config['rules'],
 *   scssRules?: import('stylelint').Config['rules'],
 *   scssExtends?: string[],
 * }} additions rules는 모든 파일, scssRules·scssExtends는 SCSS overrides에만 추가
 * @returns {import('stylelint').Config}
 */
export function extendRules(config, { rules = {}, scssRules = {}, scssExtends = [] }) {
  return {
    ...config,
    rules: { ...config.rules, ...rules },
    overrides: config.overrides?.map((override) => ({
      ...override,
      extends: [...[override.extends ?? []].flat(), ...scssExtends],
      rules: { ...override.rules, ...rules, ...scssRules },
    })),
  };
}
