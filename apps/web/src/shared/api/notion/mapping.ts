import { slugify } from '@/shared/lib/slugify';

import type { Label } from './types';

// 매핑 결과. 필수 속성이 빠지면 어떤 속성이 빠졌는지 돌려준다 (호출한 쪽이 경고 후 제외).
export type MapResult<T> = { ok: true; value: T } | { ok: false; missing: string[] };

export const toLabel = (name: string): Label => ({ name, slug: slugify(name) });
