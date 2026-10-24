// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import { Direction } from "radix-ui"
import { afterEach, describe, expect, it, vi } from "vitest"

const languageMock = vi.hoisted(() => ({ current: "en" }))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { language: languageMock.current } }),
}))

import { I18nProvider } from "../i18n-provider"

const Probe = () => {
  const direction = Direction.useDirection()

  return <span data-testid="direction">{direction}</span>
}

afterEach(() => {
  cleanup()
  document.documentElement.removeAttribute("lang")
  document.documentElement.removeAttribute("dir")
})

describe("I18nProvider Radix direction", () => {
  it("gives Radix primitives rtl for fa", () => {
    languageMock.current = "fa"

    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>
    )

    expect(screen.getByTestId("direction").textContent).toBe("rtl")
  })

  it("gives Radix primitives rtl for ar", () => {
    languageMock.current = "ar"

    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>
    )

    expect(screen.getByTestId("direction").textContent).toBe("rtl")
  })

  it("gives Radix primitives ltr for en", () => {
    languageMock.current = "en"

    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>
    )

    expect(screen.getByTestId("direction").textContent).toBe("ltr")
  })
})
