// @vitest-environment jsdom
import { renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

const languageMock = vi.hoisted(() => ({ current: "en" }))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { language: languageMock.current } }),
}))

import { useIntlLocale } from "../format-locale"

describe("useIntlLocale", () => {
  it("returns the intl_locale of the active language", () => {
    languageMock.current = "fa"

    const { result } = renderHook(() => useIntlLocale())

    expect(result.current).toBe("fa-IR-u-ca-persian")
  })

  it("returns undefined for a language without one", () => {
    languageMock.current = "en"

    const { result } = renderHook(() => useIntlLocale())

    expect(result.current).toBeUndefined()
  })

  it("updates when the language changes", () => {
    languageMock.current = "en"
    const { result, rerender } = renderHook(() => useIntlLocale())
    expect(result.current).toBeUndefined()

    languageMock.current = "fa"
    rerender()

    expect(result.current).toBe("fa-IR-u-ca-persian")
  })
})
