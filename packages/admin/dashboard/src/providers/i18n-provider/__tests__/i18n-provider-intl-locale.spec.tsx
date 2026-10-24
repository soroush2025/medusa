// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

const languageMock = vi.hoisted(() => ({ current: "en" }))
const providerProps = vi.hoisted(() => ({
  current: undefined as { locale?: string } | undefined,
}))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { language: languageMock.current } }),
}))

vi.mock("@medusajs/ui", () => ({
  I18nProvider: (props: { locale?: string; children?: ReactNode }) => {
    providerProps.current = { locale: props.locale }
    return props.children
  },
}))

import { setLatinDigitsEnabled } from "../../../lib/format-locale"
import { I18nProvider } from "../i18n-provider"

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  providerProps.current = undefined
  document.documentElement.removeAttribute("lang")
  document.documentElement.removeAttribute("dir")
})

describe("I18nProvider intl_locale", () => {
  it("passes the Jalali intl_locale to the ui provider for fa", () => {
    languageMock.current = "fa"

    render(<I18nProvider />)

    expect(providerProps.current?.locale).toBe("fa-IR-u-ca-persian")
  })

  it("keeps <html lang> and dir clean for fa", () => {
    languageMock.current = "fa"

    render(<I18nProvider />)

    expect(document.documentElement.getAttribute("lang")).toBe("fa")
    expect(document.documentElement.getAttribute("dir")).toBe("rtl")
  })

  it("passes the language code for languages without an intl_locale", () => {
    languageMock.current = "en"
    render(<I18nProvider />)
    expect(providerProps.current?.locale).toBe("en")

    cleanup()
    languageMock.current = "ptBR"
    render(<I18nProvider />)
    expect(providerProps.current?.locale).toBe("pt-BR")
  })
})

describe("I18nProvider with the Latin digits preference", () => {
  it("passes the -nu-latn tag so date pickers show Latin digits", () => {
    languageMock.current = "fa"
    setLatinDigitsEnabled(true)

    render(<I18nProvider />)

    expect(providerProps.current?.locale).toBe("fa-IR-u-ca-persian-nu-latn")
    expect(document.documentElement.getAttribute("lang")).toBe("fa")
  })
})
