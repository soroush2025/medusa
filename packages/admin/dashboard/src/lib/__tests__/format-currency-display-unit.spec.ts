import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("../format-locale", () => ({
  getIntlLocale: () => "en-US",
}))

import { setDisplayUnitsEnabled } from "../../providers/display-unit-provider/display-unit-store"
import { formatCurrency } from "../format-currency"

beforeEach(() => {
  setDisplayUnitsEnabled(false)
})

afterEach(() => {
  setDisplayUnitsEnabled(false)
})

describe("formatCurrency with display units", () => {
  it("is unchanged when the display unit is off", () => {
    expect(formatCurrency(1000, "usd")).toBe("$1,000.00")
    expect(formatCurrency(1250000, "irr")).toBe("IRR 1,250,000")
  })

  it("converts to the display unit when it is on, like the other helpers", () => {
    setDisplayUnitsEnabled(true)
    expect(formatCurrency(1250000, "irr")).toBe("125,000 تومان")
    expect(formatCurrency(1255, "irr")).toBe("125.5 تومان")
    expect(formatCurrency(1000, "usd")).toBe("$1,000.00")
  })
})
