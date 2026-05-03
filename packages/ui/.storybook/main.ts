import path from "node:path"
import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/nextjs-vite"
import { mergeConfig } from "vite"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return path.dirname(
    fileURLToPath(import.meta.resolve(`${value}/package.json`)),
  )
}

const storybookDir = path.dirname(fileURLToPath(import.meta.url))
/** モノレポの Next アプリ設定を参照し、`next/image` 等の挙動を揃える */
const nextConfigPath = path.resolve(
  storybookDir,
  "../../../apps/web/next.config.mjs",
)

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-designs"),
    getAbsolutePath("@storybook/addon-mcp"),
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      nextConfigPath,
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@repo/ui": fileURLToPath(new URL("..", import.meta.url)),
        },
      },
    })
  },
}
export default config
