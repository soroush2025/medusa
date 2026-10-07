import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const localeMock = vi.hoisted(() => ({
  current: "en-US" as string | undefined,
}))

vi.mock("../format-locale", () => ({
  getIntlLocale: () => localeMock.current,
}))

import { setDisplayUnitsEnabled } from "../../providers/display-unit-provider/display-unit-store"
import {
  getDecimalDigits,
  getDisplayDecimalDigits,
  getLocaleAmount,
  getNativeSymbol,
  getStylizedAmount,
  isAmountLessThenRoundingError,
} from "../money-amount-helpers"

beforeEach(() => {
  localeMock.current = "en-US"
  setDisplayUnitsEnabled(false)
})

afterEach(() => {
  setDisplayUnitsEnabled(false)
})

describe("with the display unit disabled (default)", () => {
  it("getLocaleAmount is unchanged", () => {
    expect(getLocaleAmount(1000, "usd")).toBe("$1,000.00")
    expect(getLocaleAmount(1250000, "irr")).toBe("IRR 1,250,000")
  })

  it("getStylizedAmount is unchanged", () => {
    expect(getStylizedAmount(1000, "usd")).toBe("$ 1,000.00 USD")
    expect(getStylizedAmount(1250000, "irr")).toBe("IRR 1,250,000 IRR")
  })

  it("getDisplayDecimalDigits falls back to the stored digits", () => {
    expect(getDisplayDecimalDigits("usd")).toBe(2)
    expect(getDisplayDecimalDigits("jpy")).toBe(0)
    expect(getDisplayDecimalDigits("irr")).toBe(0)
    expect(getDisplayDecimalDigits("irr", 1255)).toBe(0)
  })
})

describe("with the display unit enabled", () => {
  beforeEach(() => {
    setDisplayUnitsEnabled(true)
  })

  it("getLocaleAmount converts IRR to Toman and labels the unit", () => {
    expect(getLocaleAmount(1250000, "irr")).toBe("125,000 تومان")
    expect(getLocaleAmount(1250000, "IRR")).toBe("125,000 تومان")
    expect(getLocaleAmount(0, "irr")).toBe("0 تومان")
  })

  it("shows one fraction digit for Rial amounts that are not a multiple of 10, never a rounded value", () => {
    expect(getLocaleAmount(1255, "irr")).toBe("125.5 تومان")
    expect(getLocaleAmount(5, "irr")).toBe("0.5 تومان")
    expect(getLocaleAmount(1250, "irr")).toBe("125 تومان")
  })

  it("keeps the sign", () => {
    expect(getLocaleAmount(-1250000, "irr")).toBe("-125,000 تومان")
    expect(getLocaleAmount(-1255, "irr")).toBe("-125.5 تومان")
  })

  it("uses the active locale for the digits", () => {
    localeMock.current = "fa-IR"
    expect(getLocaleAmount(1250000, "irr")).toBe("۱۲۵٬۰۰۰ تومان")
    expect(getLocaleAmount(1255, "irr")).toBe("۱۲۵٫۵ تومان")
  })

  it("leaves currencies without a display unit alone", () => {
    expect(getLocaleAmount(1000, "usd")).toBe("$1,000.00")
    expect(getStylizedAmount(1000, "usd")).toBe("$ 1,000.00 USD")
  })

  it("getStylizedAmount keeps its symbol amount CODE shape with the display unit", () => {
    expect(getStylizedAmount(1250000, "irr")).toBe("تومان 125,000 IRT")
    expect(getStylizedAmount(1255, "irr")).toBe("تومان 125.5 IRT")
    expect(getStylizedAmount(-1250000, "irr")).toBe("تومان -125,000 IRT")
  })

  it("getDisplayDecimalDigits reports the display digits and the extra digit for odd amounts", () => {
    expect(getDisplayDecimalDigits("irr")).toBe(0)
    expect(getDisplayDecimalDigits("irr", 1250)).toBe(0)
    expect(getDisplayDecimalDigits("irr", 1255)).toBe(1)
    expect(getDisplayDecimalDigits("usd", 1255)).toBe(2)
  })

  it("getNativeSymbol returns the unit symbol for IRR and the normal symbol otherwise", () => {
    expect(getNativeSymbol("irr")).toBe("تومان")
    expect(getNativeSymbol("usd")).toBe("$")
  })

  it("does not change the stored-unit helpers", () => {
    expect(getDecimalDigits("irr")).toBe(0)
    expect(isAmountLessThenRoundingError(0.001, "usd")).toBe(true)
    expect(isAmountLessThenRoundingError(1, "irr")).toBe(false)
  })
})

describe("getNativeSymbol", () => {
  it("returns plain symbols in English", () => {
    expect(getNativeSymbol("usd")).toBe("$")
    expect(getNativeSymbol("EUR")).toBe("€")
    expect(getNativeSymbol("irr")).toBe("IRR")
  })

  it("never returns digits or separators under a Persian locale (the formatToParts fix)", () => {
    localeMock.current = "fa-IR"

    // The old implementation formatted 0 and removed ASCII digits, so Persian
    // digits and the Arabic decimal separator leaked into the symbol: "‎$۰٫۰۰".
    for (const code of ["usd", "eur", "irr", "jpy"]) {
      expect(getNativeSymbol(code)).not.toMatch(/[\d۰-۹٠-٩٫٬.,]/)
    }

    expect(getNativeSymbol("usd")).toBe("$")
    expect(getNativeSymbol("irr")).toBe("ریال")
  })

  it("also works with Latin digits forced on a Persian locale", () => {
    localeMock.current = "fa-IR-u-ca-persian-nu-latn"
    expect(getNativeSymbol("usd")).toBe("$")
  })

  it("keeps the stylized total free of stray digits in the symbol under fa-IR", () => {
    localeMock.current = "fa-IR"
    expect(getStylizedAmount(1000, "usd")).toBe("$ ۱٬۰۰۰٫۰۰ USD")
  })
})
