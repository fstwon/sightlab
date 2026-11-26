import { revalidateTag } from 'next/cache';

import { readNotionWebhook } from '@/shared/api/notion';
import { getNotionWebhookSecret } from '@/shared/config/env';

// Notion 웹훅을 받아 글·프로젝트 캐시를 비우는 주소 (POST /api/revalidate).
// 서명이 맞는 이벤트면 이벤트 종류와 관계없이 notes·projects 태그를 모두 비운다.
// 본문에 id만 있고 태그가 두 개뿐이라 나누지 않는다. 실제 다시 조회는 다음 방문 때 일어난다.
// 밖에서 부르는 무효화라 { expire: 0 }: 예전 내용을 보여 주지 않고 다음 요청이 새로 만든다.
export async function POST(request: Request): Promise<Response> {
  const result = await readNotionWebhook({
    body: await request.text(),
    signature: request.headers.get('x-notion-signature'),
    secret: getNotionWebhookSecret(),
  });

  if (result.kind === 'verification') {
    // 구독 등록 때 한 번만: Vercel 로그에서 이 값을 찾아 Notion 화면에 붙여 넣고,
    // NOTION_WEBHOOK_SECRET에 저장한 뒤 다시 배포한다. 저장한 뒤에는 이 로그가 남지 않는다.
    console.info(`Notion 웹훅 verification_token: ${result.verificationToken}`);
    return Response.json({ received: true });
  }

  if (result.kind === 'rejected') {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  revalidateTag('notes', { expire: 0 });
  revalidateTag('projects', { expire: 0 });
  return Response.json({ revalidated: true });
}
