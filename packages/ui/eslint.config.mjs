// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import react from "@yoshinani/style-guide/eslint/react-internal"
import storybook from "eslint-plugin-storybook"

const eslintConfig = [
  ...react,
  {
    ignores: [
      "**/*.config.mjs",
      "vitest.config.mts",
      ".storybook/**",
      "storybook-static/**",
      "vitest.shims.d.ts",
    ],
  },
  {
    rules: {
      "import/order": "off",
      "sort-imports": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
]

export default eslintConfig
