import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, test } from 'node:test';

import { parseExperiment } from '../src/parsers/parseExperiment.ts';
import { parseMarkdown } from '../src/parsers/parseMarkdown.ts';

const root = await mkdtemp(path.join(os.tmpdir(), 'sightlab-parser-'));
after(async () => rm(root, { recursive: true, force: true }));

test('실험 JSON 파싱', async () => {
  const file = path.join(root, 'experiment.json');
  await writeFile(file, '{"title":"Test","status":"draft"}');

  assert.deepEqual(await parseExperiment(file), { title: 'Test', status: 'draft' });
});

test('잘못된 실험 JSON은 경로를 포함한 오류 발생', async () => {
  const file = path.join(root, 'invalid.json');
  await writeFile(file, '{');

  await assert.rejects(parseExperiment(file), (error) => {
    assert.match(error.message, /실험 JSON 파싱 실패/);
    assert.match(error.message, /invalid.json/);
    return true;
  });
});

test('Markdown Frontmatter와 본문 분리', async () => {
  const file = path.join(root, 'note.md');
  await writeFile(file, '---\ntitle: Example\ntags:\n  - react\n---\n# 본문\n');

  assert.deepEqual(await parseMarkdown(file), {
    metadata: { title: 'Example', tags: ['react'] },
    body: '# 본문\n',
  });
});

test('잘못된 Frontmatter는 경로를 포함한 오류 발생', async () => {
  const file = path.join(root, 'invalid.md');
  await writeFile(file, '---\ntags: [unclosed\n---\n본문');

  await assert.rejects(parseMarkdown(file), (error) => {
    assert.match(error.message, /Markdown Frontmatter 파싱 실패/);
    assert.match(error.message, /invalid.md/);
    return true;
  });
});
