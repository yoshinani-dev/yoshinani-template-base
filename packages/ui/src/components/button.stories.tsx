import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { figmaDesignDataUrl } from "@repo/ui/src/storybook/figma-design-data-file"

import { Button } from "./button"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: figmaDesignDataUrl("1-2"),
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
}
