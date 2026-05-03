import path from "node:path"
import { fileURLToPath } from "node:url"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import type { UserConfig } from "vite"
import { defineProject } from "vitest/config"

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** Vite `UserConfig` の `test`（Vitest が拡張）に合わせた browser ブロック */
type BrowserTestConfig = NonNullable<NonNullable<UserConfig["test"]>["browser"]>

export default defineProject({
  plugins: [
    storybookTest({
      configDir: path.join(dirname, ".storybook"),
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      // pnpm が同一バージョンの vitest を複数インスタンス化すると、`playwright()` と
      // `defineProject` が別モジュールパスの型を参照して不一致になる。実行時は同一。
      provider: playwright({}) as unknown as NonNullable<
        BrowserTestConfig["provider"]
      >,
      instances: [{ browser: "chromium" }],
    },
  },
})
