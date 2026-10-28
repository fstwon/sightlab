import { readdir } from 'node:fs/promises';
import path from 'node:path';

export interface DiscoveredContentFiles {
  experiments: string[];
  projects: string[];
  notes: string[];
}

async function readDirectory(directory: string) {
  try {
    return await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

async function discoverMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readDirectory(directory);

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(directory, entry.name))
    .sort();
}

async function discoverExperiments(directory: string): Promise<string[]> {
  const entries = await readDirectory(directory);
  const experimentFiles: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const experimentDirectory = path.join(directory, entry.name);
    const files = await readDirectory(experimentDirectory);

    if (files.some((file) => file.isFile() && file.name === 'experiment.json')) {
      experimentFiles.push(path.join(experimentDirectory, 'experiment.json'));
    }
  }

  return experimentFiles.sort();
}

/** 저장소 루트를 기준으로 콘텐츠 원본 파일을 탐색합니다. */
export async function discoverFiles(rootDir: string): Promise<DiscoveredContentFiles> {
  const [experiments, projects, notes] = await Promise.all([
    discoverExperiments(path.join(rootDir, 'experiments')),
    discoverMarkdownFiles(path.join(rootDir, 'content', 'projects')),
    discoverMarkdownFiles(path.join(rootDir, 'content', 'notes')),
  ]);

  return { experiments, projects, notes };
}
