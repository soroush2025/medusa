import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Switch } from "./switch"

describe("Switch", () => {
  it("should render successfully", () => {
    render(<Switch />)

    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("should mirror the thumb translation from the element's own direction", () => {
    render(<Switch />)

    const thumb = screen.getByRole("switch").firstElementChild

    expect(thumb).toHaveClass(
      "[&:dir(rtl)]:data-[state=checked]:-translate-x-4"
    )
    expect(thumb).toHaveClass(
      "[&:dir(rtl)]:data-[state=unchecked]:-translate-x-0.5"
    )
  })

  it("should mirror the small thumb from the element's own direction", () => {
    render(<Switch size="small" />)

    const thumb = screen.getByRole("switch").firstElementChild

    expect(thumb).toHaveClass(
      "[&:dir(rtl)]:data-[state=checked]:-translate-x-3.5"
    )
    expect(thumb).toHaveClass(
      "[&:dir(rtl)]:data-[state=unchecked]:-translate-x-0.5"
    )
  })

  it("should not use the ancestor-matching rtl: variant for the thumb", () => {
    render(<Switch />)

    const thumb = screen.getByRole("switch").firstElementChild

    expect(thumb?.className).not.toMatch(/(^|\s)rtl:/)
  })
})
