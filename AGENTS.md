# AGENTS.md

このドキュメントは、AIエージェントがこのプロジェクトを理解し、適切にコードを生成・修正するためのガイドラインです。

## プロジェクト概要

基本のモノレポプロジェクト。

## プロジェクト構成

### アプリケーション

- `apps/web`: メインのWebアプリケーション（Next.js）

### パッケージ

- `packages/ui`: 共通のUIコンポーネントライブラリ

## コーディング規約

- **TypeScript**: strict有効、`any`は避ける
- **React/Next.js**: Server Componentsがデフォルト。必要な場合のみ`"use client"`を使用
- **App Router**: Next.js App Routerの規約に従う
- **フォーマット/リント**: 変更後にBiomeとESLintを実行

### コマンド

- `pnpm dev`: 開発サーバー起動
- `pnpm build`: プロダクションビルド
- `pnpm format`: コードフォーマット（Biome）
- `pnpm check`: 型チェック、リント、フォーマットチェック
- `pnpm test`: テスト実行
- `pnpm e2e`: E2Eテスト実行

## Cursor Cloud specific instructions

- **ランタイム**: Node.js >= 22 と pnpm 10.12.4 が必要（VM環境にプリインストール済み）
- **開発サーバー**: `apps/web` ディレクトリで `pnpm dev` を実行するとポート3000でNext.js（Turbopack）が起動する
- **リント/チェック**: CIと同じ非対話的チェックには `pnpm check:ci` を使用（`pnpm check` は自動修正付き）
- **テスト**: `pnpm test:ci` でVitest単体テストをワンショット実行（`pnpm test` はwatchモード）
- **外部サービス不要**: データベース、Docker、外部APIへの依存なし。純粋なフロントエンドモノレポ
- **`pnpm-workspace.yaml`の`onlyBuiltDependencies`**: ネイティブモジュール（sharp, esbuild等）のビルド承認は設定済み。対話的な`pnpm approve-builds`は不要
