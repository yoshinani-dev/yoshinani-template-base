import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import Home from "./page"

describe("Home", () => {
  it("Hello Worldが表示される", () => {
    render(<Home />)
    expect(screen.getByText("Hello World")).toBeTruthy()
  })
})
