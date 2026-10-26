export type ContentStatus = 'draft' | 'published';
export type ExperimentRuntime = 'react' | 'vue' | 'vanilla' | 'node' | 'other';
export type ExperimentViewer = 'iframe' | 'output' | 'static' | 'external';

export interface BaseContentMetadata {
  schemaVersion: 1;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: ContentStatus;
}

export interface ExperimentMetadata extends BaseContentMetadata {
  runtime: ExperimentRuntime;
  viewer: ExperimentViewer;
}

export interface ProjectMetadata extends BaseContentMetadata {
  publishedAt?: string;
  updatedAt?: string;
  experiments: string[];
}

export interface NoteMetadata extends BaseContentMetadata {
  publishedAt?: string;
  updatedAt?: string;
  projects: string[];
  experiments: string[];
}

export interface MarkdownContent<T extends BaseContentMetadata> {
  metadata: T;
  body: string;
}

export interface ContentManifest {
  projects: ProjectMetadata[];
  notes: NoteMetadata[];
  experiments: ExperimentMetadata[];
}
