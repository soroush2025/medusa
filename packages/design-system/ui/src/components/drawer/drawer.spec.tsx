import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Drawer } from "./drawer"

describe("Drawer", () => {
  it("should slide from the side of the element's own direction", () => {
    render(
      <Drawer open>
        <Drawer.Content dir="ltr">
          <Drawer.Title>Title</Drawer.Title>
          <Drawer.Description>Description</Drawer.Description>
        </Drawer.Content>
      </Drawer>
    )

    const content = screen.getByRole("dialog")

    expect(content).toHaveClass(
      "[&:dir(rtl)]:data-[state=open]:slide-in-from-left-1/2"
    )
    expect(content).toHaveClass(
      "[&:dir(rtl)]:data-[state=closed]:slide-out-to-left-1/2"
    )
  })

  it("should not use the ancestor-matching rtl: variant", () => {
    render(
      <Drawer open>
        <Drawer.Content>
          <Drawer.Title>Title</Drawer.Title>
          <Drawer.Description>Description</Drawer.Description>
        </Drawer.Content>
      </Drawer>
    )

    expect(screen.getByRole("dialog").className).not.toMatch(/(^|\s)rtl:/)
  })
})
