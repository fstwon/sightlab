import 'server-only';

import { Client } from '@notionhq/client';

import { getServerEnv } from '@/shared/config/env';

// API 버전을 고정해 Notion 쪽 기본 버전이 바뀌어도 응답 형식이 달라지지 않게 한다.
const NOTION_VERSION = '2026-03-11';

let client: Client | undefined;

// SDK 클라이언트 하나를 재사용한다. 429·529 응답은 SDK가 Retry-After에 맞춰 다시 시도한다.
export function getNotionClient(): Client {
  client ??= new Client({ auth: getServerEnv().notionToken, notionVersion: NOTION_VERSION });
  return client;
}
