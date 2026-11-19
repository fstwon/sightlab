// typography.css의 --sl-text-<역할>-<속성> 변수를 역할별로 묶는다.
import type { CssVariable } from './read-css-variables';

const PROPS = ['size', 'line-height', 'weight', 'letter-spacing'] as const;

type TextProp = (typeof PROPS)[number];

export type TextRole = { role: string } & Record<TextProp, string>;

export function groupTextRoles(variables: CssVariable[]): TextRole[] {
  const roles = new Map<string, TextRole>();

  for (const { key, value } of variables) {
    const prop = PROPS.find((p) => key.endsWith(`-${p}`));
    if (!prop) continue;

    const role = key.slice(0, -(prop.length + 1));
    const entry = roles.get(role) ?? {
      role,
      size: '',
      'line-height': '',
      weight: '',
      'letter-spacing': '',
    };
    entry[prop] = value;
    roles.set(role, entry);
  }

  return [...roles.values()];
}
