import { readFile } from 'node:fs/promises';

/** 런타임 스키마 검증 전 단계: JSON을 파싱하여 unknown으로 반환합니다. */
export async function parseExperiment(filePath: string): Promise<unknown> {
  const source = await readFile(filePath, 'utf8');

  try {
    return JSON.parse(source) as unknown;
  } catch (error) {
    throw new Error(`실험 JSON 파싱 실패: ${filePath}`, { cause: error });
  }
}
