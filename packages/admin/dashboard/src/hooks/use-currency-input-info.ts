import { useMemo, useSyncExternalStore } from "react"
import { currencies } from "../lib/data/currencies"
import {
  getCurrencyDisplayUnit,
  getDisplayUnitPlaces,
} from "../lib/data/currency-display-units"
import { normalizeNumericInput, shiftDecimalPoint } from "../lib/decimal-shift"
import {
  isDisplayUnitsEnabled,
  subscribeDisplayUnits,
} from "../providers/display-unit-provider/display-unit-store"

type NumericLike = number | string | null | undefined

export type CurrencyInputInfo = {
  symbol: string
  /** Decimal digits of the unit that the user sees. */
  decimalScale: number
  /** Stored units per displayed unit (1 when no display unit is active). */
  divisor: number
  /** Stored amount to the text shown in the input. */
  toDisplayValue: (stored: NumericLike) => string
  /** Text typed in the input to the stored amount, or null when empty or invalid. */
  toStoredValue: (display: NumericLike) => number | null
  /** The currency code to show next to the input (IRT when Toman is active). */
  code: string
  /** Like toStoredValue but as a string, for forms that keep strings. */
  toStoredText: (display: NumericLike) => string
  /**
   * Props to spread on react-currency-input-field. When a display unit is
   * active there is deliberately no decimalScale: the library pads and trims to
   * it on blur, which would turn 125.5 Toman (1255 Rials) into 125.
   */
  inputProps: {
    decimalScale?: number
    decimalsLimit?: number
    decimalSeparator?: string
    groupSeparator?: string
  }
}

const isEmpty = (value: NumericLike): value is null | undefined | "" =>
  value === null || value === undefined || value === ""

export const buildCurrencyInputInfo = (
  currencyCode: string | undefined,
  enabled: boolean
): CurrencyInputInfo => {
  const upperCode = (currencyCode ?? "").toUpperCase()
  const currency = currencies[upperCode]
  const storedDigits = currency?.decimal_digits ?? 2

  const unit =
    enabled && currencyCode ? getCurrencyDisplayUnit(currencyCode) : undefined
  const places = unit ? getDisplayUnitPlaces(unit) : 0

  const toDisplayValue = (stored: NumericLike): string => {
    if (isEmpty(stored)) {
      return ""
    }

    if (!unit) {
      return String(stored)
    }

    const normalized = normalizeNumericInput(String(stored))

    return normalized === null ? "" : shiftDecimalPoint(normalized, places)
  }

  const toStoredValue = (display: NumericLike): number | null => {
    if (isEmpty(display)) {
      return null
    }

    const normalized = normalizeNumericInput(String(display))

    if (normalized === null) {
      return null
    }

    const shifted = unit ? shiftDecimalPoint(normalized, -places) : normalized
    const parsed = Number(shifted)

    if (!Number.isFinite(parsed)) {
      return null
    }

    const result = unit ? Number(parsed.toFixed(storedDigits)) : parsed

    return result === 0 ? 0 : result
  }

  const toStoredText = (display: NumericLike): string => {
    if (!unit) {
      return isEmpty(display) ? "" : String(display)
    }

    const stored = toStoredValue(display)

    return stored === null ? "" : String(stored)
  }

  return {
    symbol: unit ? unit.symbol_native : currency?.symbol_native ?? "",
    decimalScale: unit ? unit.decimal_digits : storedDigits,
    divisor: unit ? unit.divisor : 1,
    toDisplayValue,
    toStoredValue,
    code: unit ? unit.code : upperCode,
    toStoredText,
    inputProps: unit
      ? {
          decimalsLimit: storedDigits + places,
          decimalSeparator: ".",
          groupSeparator: ",",
        }
      : { decimalScale: storedDigits, decimalsLimit: storedDigits },
  }
}

/**
 * Everything a currency input needs to show and accept amounts in the active
 * display unit while form state and the API keep the stored unit.
 */
export const useCurrencyInputInfo = (
  currencyCode: string
): CurrencyInputInfo => {
  const enabled = useSyncExternalStore(
    subscribeDisplayUnits,
    isDisplayUnitsEnabled,
    () => false
  )

  return useMemo(
    () => buildCurrencyInputInfo(currencyCode, enabled),
    [currencyCode, enabled]
  )
}
