# Sightlab

A monorepo workspace for software experiments and technical notes.

## Prerequisites

- Node.js 22 (see `.nvmrc`)
- Corepack with pnpm 9.15.9

## Getting started

```sh
corepack enable
pnpm install
pnpm dev
```

The repository currently contains workspace tooling only. Application and experiment packages will be introduced in separate pull requests. Until packages are added, the Turbo tasks have no application tasks to run.

## Workspace layout

- `apps/*`: host applications (planned)
- `packages/*`: reusable workspace packages (planned)
- `experiments/*`: independently configured experiments (planned)

Each workspace package owns its own scripts and may choose Vite or another build tool. Turborepo orchestrates tasks without imposing a bundler.

## Commands

- `pnpm dev`: run available development tasks
- `pnpm build`: build available packages
- `pnpm check`: run available checks
- `pnpm test`: run available tests

> The lockfile is not committed yet; it must be generated with `pnpm install` and committed after dependency resolution is verified. No build or test success is claimed by this bootstrap.
