// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { setDisplayUnitsEnabled } from "../../providers/display-unit-provider/display-unit-store"
import {
  buildCurrencyInputInfo,
  useCurrencyInputInfo,
} from "../use-currency-input-info"

beforeEach(() => {
  setDisplayUnitsEnabled(false)
})

afterEach(() => {
  cleanup()
  setDisplayUnitsEnabled(false)
})

describe("buildCurrencyInputInfo without a display unit", () => {
  it("describes a normal currency and passes values through untouched", () => {
    const info = buildCurrencyInputInfo("usd", false)

    expect(info.code).toBe("USD")
    expect(info.symbol).toBe("$")
    expect(info.decimalScale).toBe(2)
    expect(info.divisor).toBe(1)
    expect(info.inputProps).toEqual({ decimalScale: 2, decimalsLimit: 2 })

    expect(info.toDisplayValue(12.5)).toBe("12.5")
    expect(info.toDisplayValue("12.50")).toBe("12.50")
    expect(info.toStoredValue("12.5")).toBe(12.5)
    expect(info.toStoredText("12.50")).toBe("12.50")
  })

  it("keeps IRR in Rials when the preference is off", () => {
    const info = buildCurrencyInputInfo("irr", false)

    expect(info.code).toBe("IRR")
    expect(info.symbol).toBe("﷼")
    expect(info.divisor).toBe(1)
    expect(info.toDisplayValue(1250000)).toBe("1250000")
    expect(info.toStoredValue("1250000")).toBe(1250000)
  })

  it("does not enable the unit for currencies that have none, even when the preference is on", () => {
    const info = buildCurrencyInputInfo("usd", true)
    expect(info.divisor).toBe(1)
    expect(info.code).toBe("USD")
  })

  it("handles empty and unknown currency codes the way the old call sites did", () => {
    const empty = buildCurrencyInputInfo("", true)
    expect(empty.symbol).toBe("")
    expect(empty.code).toBe("")
    expect(empty.divisor).toBe(1)
    expect(empty.decimalScale).toBe(2)

    expect(buildCurrencyInputInfo(undefined, true).divisor).toBe(1)
  })
})

describe("buildCurrencyInputInfo with the Toman unit", () => {
  const info = buildCurrencyInputInfo("irr", true)

  it("describes the unit", () => {
    expect(info.code).toBe("IRT")
    expect(info.symbol).toBe("تومان")
    expect(info.decimalScale).toBe(0)
    expect(info.divisor).toBe(10)
  })

  it("never asks the input to pad or trim, because that would truncate 125.5 to 125", () => {
    expect(info.inputProps).toEqual({
      decimalsLimit: 1,
      decimalSeparator: ".",
      groupSeparator: ",",
    })
    expect("decimalScale" in info.inputProps).toBe(false)
  })

  it("matches the currency code regardless of case", () => {
    expect(buildCurrencyInputInfo("IRR", true).divisor).toBe(10)
  })

  it("converts stored Rials to display Toman", () => {
    expect(info.toDisplayValue(1250000)).toBe("125000")
    expect(info.toDisplayValue("1250000")).toBe("125000")
    expect(info.toDisplayValue(1255)).toBe("125.5")
    expect(info.toDisplayValue(0)).toBe("0")
  })

  it("converts display Toman to stored Rials without float error", () => {
    expect(info.toStoredValue("125000")).toBe(1250000)
    expect(info.toStoredValue("125.5")).toBe(1255)
    expect(info.toStoredValue("1.1")).toBe(11)
    expect(info.toStoredValue("0.7")).toBe(7)
    expect(info.toStoredValue(125)).toBe(1250)
    expect(info.toStoredValue("12.")).toBe(120)
  })

  it("rounds to the stored currency's digits instead of storing a fraction of a Rial", () => {
    expect(info.toStoredValue("125.55")).toBe(1256)
  })

  it("round-trips every amount, including odd ones", () => {
    for (const stored of [0, 5, 10, 1255, 1250000, 9999999999]) {
      expect(info.toStoredValue(info.toDisplayValue(stored))).toBe(stored)
    }
  })

  it("normalises Persian and Arabic-Indic digits and separators instead of rejecting them", () => {
    expect(info.toStoredValue("۱۲۵٬۰۰۰")).toBe(1250000)
    expect(info.toStoredValue("۱۲۵٫۵")).toBe(1255)
    expect(info.toStoredValue("١٢٥")).toBe(1250)
    expect(info.toDisplayValue("۱۲۵۰۰۰۰")).toBe("125000")
  })

  it("returns null for empty and invalid input, never NaN", () => {
    for (const value of [null, undefined, "", "-", "abc", "1.2.3"]) {
      expect(info.toStoredValue(value)).toBeNull()
    }
  })

  it("returns an empty string for empty and invalid stored values", () => {
    for (const value of [null, undefined, "", "abc"]) {
      expect(info.toDisplayValue(value)).toBe("")
    }
  })

  it("never returns negative zero", () => {
    expect(Object.is(info.toStoredValue("-0"), 0)).toBe(true)
  })

  it("commits strings for the data grid", () => {
    expect(info.toStoredText("125.5")).toBe("1255")
    expect(info.toStoredText("")).toBe("")
    expect(info.toStoredText("abc")).toBe("")
  })
})

describe("useCurrencyInputInfo", () => {
  it("returns the stored-unit info when the preference is off", () => {
    const { result } = renderHook(() => useCurrencyInputInfo("irr"))
    expect(result.current.divisor).toBe(1)
  })

  it("re-renders with the display unit when the preference changes", () => {
    const { result } = renderHook(() => useCurrencyInputInfo("irr"))

    act(() => {
      setDisplayUnitsEnabled(true)
    })

    expect(result.current.divisor).toBe(10)
    expect(result.current.code).toBe("IRT")
  })

  it("returns a stable object while nothing changes", () => {
    const { result, rerender } = renderHook(() => useCurrencyInputInfo("irr"))
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })
})
