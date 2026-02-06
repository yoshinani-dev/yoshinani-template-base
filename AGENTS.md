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
