import { currencies } from "./data/currencies"
import {
  CurrencyDisplayUnit,
  getDisplayUnitPlaces,
} from "./data/currency-display-units"
import { getIntlLocale } from "./format-locale"
import { getActiveDisplayUnit } from "../providers/display-unit-provider/display-unit-store"

export const getDecimalDigits = (currency: string) => {
  return currencies[currency.toUpperCase()]?.decimal_digits ?? 0
}

/**
 * True when the stored amount is a whole number of display units, for example
 * 1250 Rials is exactly 125 Toman while 1255 Rials is 125.5 Toman.
 */
const isWholeInUnit = (amount: number, unit: CurrencyDisplayUnit) => {
  return amount % unit.divisor === 0
}

/**
 * The number of fraction digits to show for an amount of this currency.
 *
 * Without an active display unit this is the currency's own decimal digits.
 * With one it is the unit's digits, plus (when `amount` is given and is not a
 * whole number of display units) the digits needed to show it exactly, so that
 * 1255 Rials displays as 125.5 Toman instead of being rounded.
 */
export const getDisplayDecimalDigits = (
  currencyCode: string,
  amount?: number
) => {
  const unit = getActiveDisplayUnit(currencyCode)

  if (!unit) {
    return getDecimalDigits(currencyCode)
  }

  if (amount !== undefined && !isWholeInUnit(amount, unit)) {
    return unit.decimal_digits + getDisplayUnitPlaces(unit)
  }

  return unit.decimal_digits
}

const formatUnitNumber = (
  amount: number,
  unit: CurrencyDisplayUnit,
  signDisplay: "auto" | "exceptZero" = "auto"
) => {
  const digits =
    unit.decimal_digits +
    (isWholeInUnit(amount, unit) ? 0 : getDisplayUnitPlaces(unit))

  return (amount / unit.divisor).toLocaleString(getIntlLocale(), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    signDisplay,
  })
}

/**
 * Formats a stored amount in a display unit, labelled with the unit's symbol,
 * for example "125,000 تومان" for 1250000 Rials.
 */
export const formatInDisplayUnit = (
  amount: number,
  unit: CurrencyDisplayUnit
) => {
  return `${formatUnitNumber(amount, unit)} ${unit.symbol_native}`
}

/**
 * Returns a formatted amount based on the currency code using the browser's locale
 * @param amount - The amount to format
 * @param currencyCode - The currency code to format the amount in
 * @returns - The formatted amount
 *
 * When a display unit is active for the currency (for example Toman for IRR)
 * the amount is converted and labelled with the unit.
 *
 * @example
 * getFormattedAmount(10, "usd") // '$10.00' if the browser's locale is en-US
 * getFormattedAmount(10, "usd") // '10,00 $' if the browser's locale is fr-FR
 * getFormattedAmount(1250000, "irr") // '125,000 تومان' with the Toman unit on
 */
export const getLocaleAmount = (amount: number, currencyCode: string) => {
  const unit = getActiveDisplayUnit(currencyCode)

  if (unit) {
    return formatInDisplayUnit(amount, unit)
  }

  const formatter = new Intl.NumberFormat(getIntlLocale(), {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: currencyCode,
  })

  return formatter.format(amount)
}

/**
 * The symbol of a currency. The symbol is read from the "currency" part of
 * formatToParts. The previous implementation formatted 0 and stripped ASCII
 * digits and separators, which leaves Persian digits and the Arabic decimal
 * separator in the result under a Persian or Arabic locale.
 */
export const getNativeSymbol = (currencyCode: string) => {
  const unit = getActiveDisplayUnit(currencyCode)

  if (unit) {
    return unit.symbol_native
  }

  const parts = new Intl.NumberFormat(getIntlLocale(), {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).formatToParts(0)

  return (
    parts.find((part) => part.type === "currency")?.value ??
    currencyCode.toUpperCase()
  )
}

/**
 * In some cases we want to display the amount with the currency code and symbol,
 * in the format of "symbol amount currencyCode". This breaks from the
 * user's locale and is only used in cases where we want to display the
 * currency code and symbol explicitly, e.g. for totals.
 */
export const getStylizedAmount = (amount: number, currencyCode: string) => {
  const unit = getActiveDisplayUnit(currencyCode)

  const lessThanRoundingPrecission = isAmountLessThenRoundingError(
    amount,
    currencyCode
  )
  const signDisplay = lessThanRoundingPrecission ? "exceptZero" : "auto"

  if (unit) {
    return `${unit.symbol_native} ${formatUnitNumber(
      amount,
      unit,
      signDisplay
    )} ${unit.code}`
  }

  const symbol = getNativeSymbol(currencyCode)
  const decimalDigits = getDecimalDigits(currencyCode)

  const total = amount.toLocaleString(getIntlLocale(), {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
    signDisplay,
  })

  return `${symbol} ${total} ${currencyCode.toUpperCase()}`
}

/**
 * Returns true if the amount is less than the rounding error for the currency
 * @param amount - The amount to check
 * @param currencyCode - The currency code to check the amount in
 * @returns - True if the amount is less than the rounding error, false otherwise
 *
 * For example returns true if amount is < 0.005 for a USD | EUR etc.
 */
export const isAmountLessThenRoundingError = (
  amount: number,
  currencyCode: string
) => {
  const decimalDigits = getDecimalDigits(currencyCode)
  return Math.abs(amount) < 1 / 10 ** decimalDigits / 2
}
