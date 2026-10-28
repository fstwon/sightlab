import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, test } from 'node:test';

import { discoverFiles } from '../src/collector/discoverFiles.ts';

const root = await mkdtemp(path.join(os.tmpdir(), 'sightlab-discovery-'));
after(async () => rm(root, { recursive: true, force: true }));

test('없는 콘텐츠 디렉터리는 빈 목록으로 반환', async () => {
  assert.deepEqual(await discoverFiles(root), {
    experiments: [],
    projects: [],
    notes: [],
  });
});

test('실험 설정과 Markdown 파일만 수집하고 정렬', async () => {
  await mkdir(path.join(root, 'experiments', 'vue-demo'), { recursive: true });
  await mkdir(path.join(root, 'experiments', 'no-config'), { recursive: true });
  await mkdir(path.join(root, 'content', 'projects'), { recursive: true });
  await mkdir(path.join(root, 'content', 'notes'), { recursive: true });
  await writeFile(path.join(root, 'experiments', 'vue-demo', 'experiment.json'), '{}');
  await writeFile(path.join(root, 'content', 'projects', 'z.md'), '');
  await writeFile(path.join(root, 'content', 'projects', 'a.md'), '');
  await writeFile(path.join(root, 'content', 'notes', 'note.md'), '');
  await writeFile(path.join(root, 'content', 'notes', 'ignore.txt'), '');

  assert.deepEqual(await discoverFiles(root), {
    experiments: [path.join(root, 'experiments', 'vue-demo', 'experiment.json')],
    projects: [
      path.join(root, 'content', 'projects', 'a.md'),
      path.join(root, 'content', 'projects', 'z.md'),
    ],
    notes: [path.join(root, 'content', 'notes', 'note.md')],
  });
});
