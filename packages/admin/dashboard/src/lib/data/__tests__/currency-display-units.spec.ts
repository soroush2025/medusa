import { describe, expect, it } from "vitest"
import { currencies } from "../currencies"
import {
  CURRENCY_DISPLAY_UNITS,
  getCurrencyDisplayUnit,
  getDisplayUnitPlaces,
} from "../currency-display-units"

describe("CURRENCY_DISPLAY_UNITS", () => {
  it("maps IRR to Toman with a divisor of 10", () => {
    expect(CURRENCY_DISPLAY_UNITS.irr).toEqual({
      code: "IRT",
      divisor: 10,
      symbol_native: "تومان",
      decimal_digits: 0,
    })
  })

  it("uses lowercase keys, matching how the dashboard stores currency codes", () => {
    for (const key of Object.keys(CURRENCY_DISPLAY_UNITS)) {
      expect(key).toBe(key.toLowerCase())
    }
  })

  it("only uses powers of ten as divisors, because the extra fraction digit is log10(divisor)", () => {
    for (const unit of Object.values(CURRENCY_DISPLAY_UNITS)) {
      expect(unit.divisor).toBeGreaterThanOrEqual(10)
      expect(Number.isInteger(Math.log10(unit.divisor))).toBe(true)
    }
  })

  it("agrees with the generated currencies table for both sides of every pair", () => {
    for (const [key, unit] of Object.entries(CURRENCY_DISPLAY_UNITS)) {
      expect(currencies[key.toUpperCase()]).toBeDefined()
      expect(currencies[unit.code]).toMatchObject({
        symbol_native: unit.symbol_native,
        decimal_digits: unit.decimal_digits,
      })
    }
  })
})

describe("getCurrencyDisplayUnit", () => {
  it("finds a unit regardless of the case of the currency code", () => {
    expect(getCurrencyDisplayUnit("irr")?.code).toBe("IRT")
    expect(getCurrencyDisplayUnit("IRR")?.code).toBe("IRT")
    expect(getCurrencyDisplayUnit("Irr")?.code).toBe("IRT")
  })

  it("returns undefined for currencies without a display unit", () => {
    expect(getCurrencyDisplayUnit("usd")).toBeUndefined()
    expect(getCurrencyDisplayUnit("irt")).toBeUndefined()
    expect(getCurrencyDisplayUnit("")).toBeUndefined()
  })
})

describe("getDisplayUnitPlaces", () => {
  it("is the number of decimal places between the stored and the display unit", () => {
    expect(getDisplayUnitPlaces(CURRENCY_DISPLAY_UNITS.irr)).toBe(1)
    expect(
      getDisplayUnitPlaces({
        code: "X",
        divisor: 1000,
        symbol_native: "x",
        decimal_digits: 0,
      })
    ).toBe(3)
  })
})
