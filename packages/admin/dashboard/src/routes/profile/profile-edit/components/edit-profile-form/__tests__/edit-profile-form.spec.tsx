// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import React from "react"
import { FormProvider } from "react-hook-form"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const state = vi.hoisted(() => ({
  currencies: [] as string[] | undefined,
}))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: vi.fn() },
  }),
}))

vi.mock("../../../../../../hooks/api/store", () => ({
  useStore: () => ({
    store: state.currencies
      ? {
          supported_currencies: state.currencies.map((currency_code) => ({
            currency_code,
          })),
        }
      : undefined,
  }),
}))

vi.mock("../../../../../../hooks/api/users", () => ({
  useUpdateUser: () => ({ mutateAsync: vi.fn(), isPending: false }),
}))

vi.mock("../../../../../../hooks/use-document-direction", () => ({
  useDocumentDirection: () => "ltr",
}))

vi.mock("../../../../../../providers/display-unit-provider", () => ({
  useDisplayUnits: () => ({ enabled: false, setEnabled: vi.fn() }),
}))

vi.mock("../../../../../../components/modals", () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  )

  return {
    useRouteModal: () => ({ handleSuccess: vi.fn() }),
    RouteDrawer: {
      Form: ({ form, children }: any) => (
        <FormProvider {...form}>{children}</FormProvider>
      ),
      Body: Passthrough,
      Footer: Passthrough,
      Close: Passthrough,
    },
  }
})

import { EditProfileForm } from "../edit-profile-form"

const user = { id: "user_1", first_name: "A", last_name: "B" } as any

beforeEach(() => {
  state.currencies = []

  // Radix primitives measure their elements with ResizeObserver.
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("EditProfileForm currency display unit switch", () => {
  it("shows the switch when the store supports a currency with a display unit", () => {
    state.currencies = ["usd", "irr"]
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).not.toBeNull()
  })

  it("matches the currency code case-insensitively", () => {
    state.currencies = ["IRR"]
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).not.toBeNull()
  })

  it("hides the switch when no supported currency has a display unit", () => {
    state.currencies = ["usd", "eur"]
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).toBeNull()
    expect(screen.queryByRole("switch")).toBeNull()
  })

  it("hides the switch while the store has not loaded", () => {
    state.currencies = undefined
    render(<EditProfileForm user={user} />)

    expect(
      screen.queryByText("profile.fields.currencyDisplayUnitLabel")
    ).toBeNull()
  })
})
