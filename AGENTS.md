# AGENTS.md

このドキュメントは、AIエージェントがこのプロジェクトを理解し、適切にコードを生成・修正するためのガイドラインです。

## プロジェクト概要

基本のモノレポプロジェクト。

## プロジェクト構成

### アプリケーション

- `apps/web`: メインのWebアプリケーション（Next.js）

### パッケージ

- `packages/ui`: 共通のUIコンポーネントライブラリ

## エージェント依存関係（Microsoft APM）

スキルなどのエージェント向け依存は [Microsoft APM](https://github.com/microsoft/apm) で管理しています。

- **マニフェスト**: ルートの `apm.yml`
- **ロック**: `apm.lock.yaml`（コミットする）
- **初回・依存更新後**: リポジトリルートで `apm install` を実行すると、ロックに従い `.agents/skills/` などへ展開されます

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

## Cursor Cloud specific instructions

- **ランタイム**: Node.js >= 22 と pnpm 10.12.4 が必要（VM環境にプリインストール済み）
- **開発サーバー**: `pnpm dev` を実行すると [portless](https://portless.sh/) 経由で Next.js（Turbopack）が `https://web.localhost` に起動する（初回のみローカル CA インストールと sudo プロンプトが必要）
- **リント/チェック**: CIと同じ非対話的チェックには `pnpm check:ci` を使用（`pnpm check` は自動修正付き）
- **テスト**: `pnpm test:ci` でVitest単体テストをワンショット実行（`pnpm test` はwatchモード）
- **カバレッジ**: CIでは Cobertura を GitHub Code Coverage API に送信。PR の表示は GitHub の Files changed などネイティブ UI で確認。**前提**: リポジトリで [Code Quality を有効化](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality)（Settings → Security → Code quality → Enable）。未有効だと upload が HTTP 403 になる
- **外部サービス不要**: データベース、Docker、外部APIへの依存なし。純粋なフロントエンドモノレポ
- **`pnpm-workspace.yaml`の`onlyBuiltDependencies`**: ネイティブモジュール（sharp, esbuild等）のビルド承認は設定済み。対話的な`pnpm approve-builds`は不要
