import { describe, expect, it } from "vitest"

import { toVisualArrowKey } from "../direction"

describe("toVisualArrowKey", () => {
  it("returns the key unchanged for ltr", () => {
    expect(toVisualArrowKey("ArrowLeft", "ltr")).toBe("ArrowLeft")
    expect(toVisualArrowKey("ArrowRight", "ltr")).toBe("ArrowRight")
  })

  it("treats a missing direction as ltr", () => {
    expect(toVisualArrowKey("ArrowLeft", undefined)).toBe("ArrowLeft")
    expect(toVisualArrowKey("ArrowRight", undefined)).toBe("ArrowRight")
  })

  it("swaps ArrowLeft and ArrowRight for rtl", () => {
    expect(toVisualArrowKey("ArrowLeft", "rtl")).toBe("ArrowRight")
    expect(toVisualArrowKey("ArrowRight", "rtl")).toBe("ArrowLeft")
  })

  it("never changes vertical arrows", () => {
    expect(toVisualArrowKey("ArrowUp", "rtl")).toBe("ArrowUp")
    expect(toVisualArrowKey("ArrowDown", "rtl")).toBe("ArrowDown")
  })

  it("passes every other key through untouched", () => {
    for (const key of ["Tab", "Enter", "Escape", " ", "a", "Home"]) {
      expect(toVisualArrowKey(key, "rtl")).toBe(key)
      expect(toVisualArrowKey(key, "ltr")).toBe(key)
    }
  })

  it("is an involution for rtl", () => {
    for (const key of ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]) {
      expect(toVisualArrowKey(toVisualArrowKey(key, "rtl"), "rtl")).toBe(key)
    }
  })
})
