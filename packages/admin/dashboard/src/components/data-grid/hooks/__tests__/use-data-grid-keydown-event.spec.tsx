// @vitest-environment jsdom
import { renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { useDataGridKeydownEvent } from "../use-data-grid-keydown-event"

const setup = (overrides: Record<string, unknown> = {}) => {
  const matrix = {
    getCellType: vi.fn(() => "text"),
    getValidMovement: vi.fn(
      (row: number, col: number, _key: string, _jump: boolean) => ({
        row,
        col,
      })
    ),
  }

  const options = {
    containerRef: { current: null },
    matrix,
    anchor: { row: 1, col: 1 },
    rangeEnd: { row: 1, col: 1 },
    isEditing: false,
    scrollToCoordinates: vi.fn(),
    setTrapActive: vi.fn(),
    setSingleRange: vi.fn(),
    setRangeEnd: vi.fn(),
    onEditingChangeHandler: vi.fn(),
    getValues: vi.fn(),
    setValue: vi.fn(),
    execute: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    queryTool: null,
    getSelectionValues: vi.fn(),
    setSelectionValues: vi.fn(),
    restoreSnapshot: vi.fn(),
    createSnapshot: vi.fn(),
    ...overrides,
  }

  const { result } = renderHook(() => useDataGridKeydownEvent(options as any))

  const press = (key: string, init: KeyboardEventInit = {}) => {
    const event = new KeyboardEvent("keydown", {
      key,
      cancelable: true,
      ...init,
    })
    result.current.handleKeyDownEvent(event)
    return event
  }

  return { matrix, press, options }
}

afterEach(() => {
  document.documentElement.removeAttribute("dir")
})

describe("useDataGridKeydownEvent arrow navigation", () => {
  it("passes ArrowLeft and ArrowRight through unchanged in ltr", () => {
    document.documentElement.setAttribute("dir", "ltr")
    const { matrix, press } = setup()

    press("ArrowLeft")
    press("ArrowRight")

    expect(matrix.getValidMovement.mock.calls.map((c) => c[2])).toEqual([
      "ArrowLeft",
      "ArrowRight",
    ])
  })

  it("behaves as ltr when <html> has no dir attribute", () => {
    const { matrix, press } = setup()

    press("ArrowRight")

    expect(matrix.getValidMovement).toHaveBeenCalledWith(
      1,
      1,
      "ArrowRight",
      false
    )
  })

  it("swaps ArrowLeft and ArrowRight in rtl", () => {
    document.documentElement.setAttribute("dir", "rtl")
    const { matrix, press } = setup()

    press("ArrowLeft")
    press("ArrowRight")

    expect(matrix.getValidMovement.mock.calls.map((c) => c[2])).toEqual([
      "ArrowRight",
      "ArrowLeft",
    ])
  })

  it("does not swap vertical arrows in rtl", () => {
    document.documentElement.setAttribute("dir", "rtl")
    const { matrix, press } = setup()

    press("ArrowUp")
    press("ArrowDown")

    expect(matrix.getValidMovement.mock.calls.map((c) => c[2])).toEqual([
      "ArrowUp",
      "ArrowDown",
    ])
  })

  it("keeps the ctrl/meta jump flag when swapping in rtl", () => {
    document.documentElement.setAttribute("dir", "rtl")
    const { matrix, press } = setup()

    press("ArrowLeft", { ctrlKey: true })

    expect(matrix.getValidMovement).toHaveBeenCalledWith(
      1,
      1,
      "ArrowRight",
      true
    )
  })

  it("moves focus to the coordinates the matrix returns", () => {
    document.documentElement.setAttribute("dir", "rtl")
    const next = { row: 1, col: 2 }
    const { matrix, press, options } = setup()
    matrix.getValidMovement.mockReturnValue(next)

    const event = press("ArrowLeft")

    expect(options.setSingleRange).toHaveBeenCalledWith(next)
    expect(options.scrollToCoordinates).toHaveBeenCalledWith(next, "horizontal")
    expect(event.defaultPrevented).toBe(true)
  })
})

describe("useDataGridKeydownEvent tab navigation", () => {
  it.each(["ltr", "rtl"])(
    "maps Tab to the next cell and Shift+Tab to the previous cell in %s (reading order, never swapped)",
    (dir) => {
      document.documentElement.setAttribute("dir", dir)
      const { matrix, press } = setup()

      press("Tab")
      press("Tab", { shiftKey: true })

      expect(matrix.getValidMovement.mock.calls.map((c) => c[2])).toEqual([
        "ArrowRight",
        "ArrowLeft",
      ])
    }
  )
})
