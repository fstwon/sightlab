import { verifyWebhookSignature } from '@notionhq/client';

// Notion 웹훅 요청을 읽은 결과
// - verification: 구독을 처음 등록할 때 한 번 오는 확인 요청. 값을 Notion 화면에 붙여 넣고 비밀값으로 저장한다.
// - event: 서명이 맞는 이벤트 (글 수정·생성·삭제 등). 본문에는 id만 있어 내용은 읽지 않는다.
// - rejected: 서명이 없거나 틀린 요청, 형식이 잘못된 요청
export type NotionWebhookRequest =
  { kind: 'verification'; verificationToken: string } | { kind: 'event' } | { kind: 'rejected' };

type ReadNotionWebhookArgs = {
  // 받은 그대로의 본문. JSON으로 바꿨다가 다시 문자열로 만들면 서명이 맞지 않는다.
  body: string;
  // X-Notion-Signature 헤더 (sha256=<본문 HMAC>)
  signature: string | null;
  // 구독의 verification_token. 아직 등록 전이면 undefined
  secret: string | undefined;
};

function readVerificationToken(body: string): string | null {
  try {
    const payload: unknown = JSON.parse(body);
    if (typeof payload !== 'object' || payload === null) return null;
    const token = (payload as { verification_token?: unknown }).verification_token;
    return typeof token === 'string' && token ? token : null;
  } catch {
    return null;
  }
}

// 비밀값이 없을 때는 확인 요청만 받고, 비밀값이 생긴 뒤에는 서명이 맞는 요청만 받는다.
// 그래서 등록이 끝난 뒤에는 누가 확인 요청 형식을 보내도 받아 주지 않는다.
export async function readNotionWebhook({
  body,
  signature,
  secret,
}: ReadNotionWebhookArgs): Promise<NotionWebhookRequest> {
  if (!secret) {
    const verificationToken = readVerificationToken(body);
    return verificationToken ? { kind: 'verification', verificationToken } : { kind: 'rejected' };
  }

  const verified = await verifyWebhookSignature({ body, signature, verificationToken: secret });
  return verified ? { kind: 'event' } : { kind: 'rejected' };
}
