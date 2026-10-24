// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  language: "fa",
  currencies: [] as string[] | undefined,
  changeLanguage: vi.fn(),
  mutateAsync: vi.fn(),
  handleSuccess: vi.fn(),
}))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: mocks.language,
      changeLanguage: mocks.changeLanguage,
    },
  }),
}))

vi.mock("../../../../../../hooks/api/store", () => ({
  useStore: () => ({
    store: mocks.currencies
      ? {
          supported_currencies: mocks.currencies.map((currency_code) => ({
            currency_code,
          })),
        }
      : undefined,
  }),
}))

vi.mock("../../../../../../hooks/api/users", () => ({
  useUpdateUser: () => ({
    mutateAsync: mocks.mutateAsync,
    isPending: false,
  }),
}))

vi.mock("../../../../../../providers/display-unit-provider", () => ({
  useDisplayUnits: () => ({ enabled: false, setEnabled: vi.fn() }),
}))

vi.mock("../../../../../../components/modals", async () => {
  const { createElement } = await import("react")
  const { FormProvider } = await import("react-hook-form")
  const passthrough = ({ children }: { children?: unknown }) =>
    createElement("div", null, children as never)

  return {
    useRouteModal: () => ({ handleSuccess: mocks.handleSuccess }),
    RouteDrawer: {
      Form: ({ form, children }: { form: object; children?: unknown }) =>
        createElement(FormProvider, form as never, children as never),
      Body: passthrough,
      Footer: passthrough,
      Close: ({ children }: { children?: unknown }) => children as never,
    },
  }
})

import {
  isLatinDigitsEnabled,
  LATIN_DIGITS_STORAGE_KEY,
} from "../../../../../../lib/format-locale"
import { EditProfileForm } from "../edit-profile-form"

// jsdom has no ResizeObserver, which the Radix Switch needs.
vi.stubGlobal(
  "ResizeObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
)

const user = { id: "usr_1", first_name: "Ali", last_name: "Rezaei" } as never

beforeEach(() => {
  mocks.language = "fa"
  mocks.currencies = []
  mocks.mutateAsync.mockResolvedValue({})
  mocks.changeLanguage.mockResolvedValue(undefined)
})

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  vi.clearAllMocks()
})

describe("EditProfileForm currency display unit switch", () => {
  // English has no digits of its own, so the Latin digits switch stays
  // hidden and the only switch on the form is the display unit one.
  beforeEach(() => {
    mocks.language = "en"
  })

  it("shows the switch when the store supports a currency with a display unit", () => {
    mocks.currencies = ["usd", "irr"]
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).not.toBeNull()
  })

  it("matches the currency code case-insensitively", () => {
    mocks.currencies = ["IRR"]
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).not.toBeNull()
  })

  it("hides the switch when no supported currency has a display unit", () => {
    mocks.currencies = ["usd", "eur"]
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).toBeNull()
    expect(screen.queryByRole("switch")).toBeNull()
  })

  it("hides the switch while the store has not loaded", () => {
    mocks.currencies = undefined
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).toBeNull()
  })
})

// The store has no display unit currency here, so the only switch on the
// form is the Latin digits one.
describe("EditProfileForm Latin digits toggle", () => {
  it("shows the toggle for a language with its own digits", () => {
    render(<EditProfileForm user={user} />)

    expect(screen.getByText("profile.fields.latinDigitsLabel")).toBeTruthy()
    expect(screen.getByRole("switch")).toBeTruthy()
  })

  it("hides the toggle for English", () => {
    mocks.language = "en"

    render(<EditProfileForm user={user} />)

    expect(screen.queryByText("profile.fields.latinDigitsLabel")).toBeNull()
    expect(screen.queryByRole("switch")).toBeNull()
  })

  it("starts from the stored preference", () => {
    window.localStorage.setItem(LATIN_DIGITS_STORAGE_KEY, "true")

    render(<EditProfileForm user={user} />)

    expect(screen.getByRole("switch").getAttribute("aria-checked")).toBe("true")
  })

  it("saves the preference on submit", async () => {
    render(<EditProfileForm user={user} />)
    fireEvent.click(screen.getByRole("switch"))
    fireEvent.click(screen.getByText("actions.save"))

    await waitFor(() => expect(isLatinDigitsEnabled()).toBe(true))
    expect(mocks.changeLanguage).toHaveBeenCalledWith("fa")
    expect(mocks.handleSuccess).toHaveBeenCalled()
  })

  it("does not change the preference when the toggle is left alone", async () => {
    render(<EditProfileForm user={user} />)
    fireEvent.click(screen.getByText("actions.save"))

    await waitFor(() => expect(mocks.handleSuccess).toHaveBeenCalled())
    expect(isLatinDigitsEnabled()).toBe(false)
  })
})
