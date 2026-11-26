import { signWebhookPayload } from '@notionhq/client';
import { describe, expect, it } from 'vitest';

import { readNotionWebhook } from './webhook';

const SECRET = 'secret_test_token';
const EVENT_BODY = JSON.stringify({ type: 'page.content_updated', entity: { id: 'page-id' } });

describe('readNotionWebhook', () => {
  it('비밀값이 없으면 확인 요청의 verification_token을 돌려준다', async () => {
    const result = await readNotionWebhook({
      body: JSON.stringify({ verification_token: SECRET }),
      signature: null,
      secret: undefined,
    });

    expect(result).toEqual({ kind: 'verification', verificationToken: SECRET });
  });

  it('비밀값이 없을 때 확인 요청이 아니면 거절한다', async () => {
    const result = await readNotionWebhook({
      body: EVENT_BODY,
      signature: null,
      secret: undefined,
    });

    expect(result).toEqual({ kind: 'rejected' });
  });

  it('비밀값이 없을 때 JSON이 아닌 본문은 거절한다', async () => {
    const result = await readNotionWebhook({
      body: 'not json',
      signature: null,
      secret: undefined,
    });

    expect(result).toEqual({ kind: 'rejected' });
  });

  it('서명이 맞으면 이벤트로 받는다', async () => {
    const signature = await signWebhookPayload({ body: EVENT_BODY, verificationToken: SECRET });

    const result = await readNotionWebhook({ body: EVENT_BODY, signature, secret: SECRET });

    expect(result).toEqual({ kind: 'event' });
  });

  it('다른 비밀값으로 만든 서명은 거절한다', async () => {
    const signature = await signWebhookPayload({ body: EVENT_BODY, verificationToken: 'other' });

    const result = await readNotionWebhook({ body: EVENT_BODY, signature, secret: SECRET });

    expect(result).toEqual({ kind: 'rejected' });
  });

  it('서명 뒤에 본문이 바뀌면 거절한다', async () => {
    const signature = await signWebhookPayload({ body: EVENT_BODY, verificationToken: SECRET });

    const result = await readNotionWebhook({ body: `${EVENT_BODY} `, signature, secret: SECRET });

    expect(result).toEqual({ kind: 'rejected' });
  });

  it('서명 헤더가 없으면 거절한다', async () => {
    const result = await readNotionWebhook({ body: EVENT_BODY, signature: null, secret: SECRET });

    expect(result).toEqual({ kind: 'rejected' });
  });

  it('비밀값이 있으면 확인 요청 형식도 서명 없이는 거절한다', async () => {
    const result = await readNotionWebhook({
      body: JSON.stringify({ verification_token: 'attacker' }),
      signature: null,
      secret: SECRET,
    });

    expect(result).toEqual({ kind: 'rejected' });
  });
});
