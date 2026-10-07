import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Switch } from "./switch"

describe("Switch", () => {
  it("should render successfully", () => {
    render(<Switch />)

    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("should mirror the thumb translation under rtl", () => {
    render(<Switch />)

    const thumb = screen.getByRole("switch").firstElementChild

    expect(thumb).toHaveClass("rtl:data-[state=checked]:-translate-x-4")
    expect(thumb).toHaveClass("rtl:data-[state=unchecked]:-translate-x-0.5")
  })
})
