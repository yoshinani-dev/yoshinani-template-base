# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Turborepo + pnpm workspaces monorepo:

- `apps/web` — Next.js 16 application (App Router, Turbopack dev server)
- `packages/ui` — shared shadcn/ui component library, published as `@repo/ui` (workspace protocol)
- `apps/web/next.config.mjs` enables `cacheComponents`, `reactCompiler`, and `typedRoutes`, and `transpilePackages: ["@repo/ui"]`. Don't disable these without reason — they're load-bearing for the template.

Lint/format/TS configs come from the external `@yoshinani/style-guide` package — don't duplicate or override its rules locally; extend the appropriate preset (`eslint/next` or `eslint/react-internal`, `typescript/nextjs` or `typescript/react-library`, `biome`).

## Commands

Workspace-wide (run from repo root):

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start all dev servers (`apps/web` on :3000) |
| `pnpm build` | Build all packages |
| `pnpm check` | typecheck + Biome + ESLint **with autofix** (local use) |
| `pnpm check:ci` | Same checks **without autofix** (CI / verification) |
| `pnpm test` | Vitest in **watch mode** |
| `pnpm test:ci` | Vitest one-shot run (with coverage in `apps/web`) |
| `pnpm format` / `pnpm format:ci` | Biome format with/without write |

Per-package: `pnpm --filter web <script>` or `pnpm --filter @repo/ui <script>`.

Single test file: `pnpm --filter web exec vitest run path/to/file.spec.tsx` (or drop `run` for watch).

UI package extras:
- `pnpm --filter @repo/ui ui add <component>` — add a shadcn/ui component into `packages/ui/src/components/` (shadcn config: style `new-york`, base color `neutral`, alias root `@repo/ui/src/...`)
- `pnpm --filter @repo/ui generate:component` — Turbo gen scaffold for a new React component
- `pnpm --filter @repo/ui storybook` — Storybook on :6006

Note: `apps/web` `check` runs `next typegen` first (needed because `typedRoutes` is on). If you see route-typing errors after adding a route, re-run `pnpm --filter web check`.

## Runtime / setup

- Node ≥ 22, pnpm 10.12.4 (pinned via `packageManager`); `mise.toml` is the source of truth.
- `pnpm-workspace.yaml` pre-approves `onlyBuiltDependencies` (sharp, esbuild, etc.) — do **not** run `pnpm approve-builds` interactively.
- No databases, Docker, or external services — pure frontend monorepo.

## Environment variables

`apps/web/env.ts` uses `@t3-oss/env-nextjs` + `valibot`. When adding a variable you **must** update three places in that file: the `server` or `client` schema, *and* the `runtimeEnv` map. Client vars require the `NEXT_PUBLIC_` prefix (enforced at the type level). Local values go in `apps/web/.env.local`.

## Agent skills (Microsoft APM)

Agent-side dependencies (skills, etc.) are managed by [Microsoft APM](https://github.com/microsoft/apm), not pnpm.

- Manifest: `apm.yml` (root); lockfile: `apm.lock.yaml` (commit it)
- After editing `apm.yml` or pulling changes that touch it, run `apm install` from the repo root to materialize skills into `.agents/skills/`.
- Currently installed skills include `submit-pr`, `next-best-practices`, `next-cache-components`, `react-best-practices` — prefer following their guidance for Next.js / React work.

## Conventions

- TypeScript strict, avoid `any`.
- React Server Components are the default in `apps/web`; only add `"use client"` when actually needed (state, effects, browser APIs, event handlers).
- Follow Next.js App Router conventions in `apps/web/app/`.
- Run `pnpm check` (or at minimum the relevant package's `check`) after edits — both ESLint (`--max-warnings 0`) and `tsc --noEmit` must pass.

## CI

`.github/workflows/check.yml` runs `pnpm check:ci` (typecheck + Biome + ESLint). `.github/workflows/test.yml` runs Vitest. Both should be required status checks on PRs to `main` (see `.github/BRANCH_PROTECTION.md`).
