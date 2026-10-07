// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.hoisted(() => {
  const g = global as any
  g.__BACKEND_URL__ = "http://localhost:9000"
  g.__AUTH_TYPE__ = "session"
  g.__JWT_TOKEN_STORAGE_KEY__ = ""
})

const { useProductCategories } = vi.hoisted(() => ({
  useProductCategories: vi.fn(),
}))

vi.mock("../../../../../../hooks/api/categories", () => ({
  useProductCategories,
}))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <span>{i18nKey}</span>,
}))

class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
})

import { CategoryCombobox } from "../category-combobox"

const categories = [
  {
    id: "pcat_shoes",
    name: "Shoes",
    category_children: [{ id: "pcat_sneakers" }],
  },
]

const requestedParents = () =>
  useProductCategories.mock.calls.map(([params]) => params.parent_category_id)

const openAndFocusFirstOption = async () => {
  render(<CategoryCombobox value={[]} onChange={vi.fn()} />)

  fireEvent.click(screen.getByRole("textbox"))
  await screen.findByText("Shoes")
  fireEvent.keyDown(window, { key: "ArrowDown" })
}

beforeEach(() => {
  useProductCategories.mockReturnValue({
    product_categories: categories,
    isPending: false,
    isError: false,
    error: null,
  })
})

afterEach(() => {
  cleanup()
  useProductCategories.mockReset()
  document.documentElement.removeAttribute("dir")
})

describe("CategoryCombobox expand key", () => {
  it("expands a category with children on ArrowRight in ltr", async () => {
    document.documentElement.setAttribute("dir", "ltr")
    await openAndFocusFirstOption()

    fireEvent.keyDown(window, { key: "ArrowRight" })

    expect(requestedParents()).toContain("pcat_shoes")
  })

  it("does not expand on ArrowLeft in ltr", async () => {
    document.documentElement.setAttribute("dir", "ltr")
    await openAndFocusFirstOption()

    fireEvent.keyDown(window, { key: "ArrowLeft" })

    expect(requestedParents()).not.toContain("pcat_shoes")
  })

  it("expands on ArrowRight when <html> has no dir attribute", async () => {
    await openAndFocusFirstOption()

    fireEvent.keyDown(window, { key: "ArrowRight" })

    expect(requestedParents()).toContain("pcat_shoes")
  })

  it("expands on ArrowLeft in rtl", async () => {
    document.documentElement.setAttribute("dir", "rtl")
    await openAndFocusFirstOption()

    fireEvent.keyDown(window, { key: "ArrowLeft" })

    expect(requestedParents()).toContain("pcat_shoes")
  })

  it("does not expand on ArrowRight in rtl", async () => {
    document.documentElement.setAttribute("dir", "rtl")
    await openAndFocusFirstOption()

    fireEvent.keyDown(window, { key: "ArrowRight" })

    expect(requestedParents()).not.toContain("pcat_shoes")
  })
})
