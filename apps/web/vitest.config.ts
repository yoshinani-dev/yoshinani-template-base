import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"
import { defineProject } from "vitest/config"

export default defineProject({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      "@repo": fileURLToPath(new URL("../../packages", import.meta.url)),
    },
  },

  test: {
    environment: "jsdom",
  },
})
