import type { Preview } from "@storybook/nextjs-vite"
import type { Viewport } from "storybook/viewport"

import "./preview.css"
import "../src/styles/globals.css"

const projectViewports: Record<string, Viewport> = {
  desktop: {
    name: "Desktop (1440)",
    styles: {
      width: "1440px",
      height: "100%",
    },
    type: "desktop",
  },
  mobile: {
    name: "Mobile (390)",
    styles: {
      width: "390px",
      height: "100%",
    },
    type: "mobile",
  },
}

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    viewport: {
      options: projectViewports,
    },
  },
}

export default preview
