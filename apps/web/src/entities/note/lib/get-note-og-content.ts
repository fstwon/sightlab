import type { NoteSummary } from '@/shared/api/notion';
import { formatDate } from '@/shared/lib/format-date';
import type { OgImageContent } from '@/shared/ui/og-image';

// 노트 링크 미리보기 이미지에 넣을 글 (Figma OG-02 / Note).
// 아래 줄은 "연재 이름 #순서 · 발행일", 연재가 없으면 발행일만.
export function getNoteOgContent(note: NoteSummary): OgImageContent {
  const date = formatDate(note.publishedAt);
  const meta = note.series ? `${note.series.name} #${note.series.order} · ${date}` : date;

  return {
    eyebrow: `Note · ${note.category.name}`,
    title: note.title,
    ...(note.summary ? { summary: note.summary } : {}),
    meta,
  };
}
