/**
 * Alternative display units for currencies whose everyday unit differs from the
 * ISO unit that prices are stored in. Stored amounts, API payloads and form
 * state never change; the unit is applied only where an amount is shown or typed.
 *
 * Hand-maintained: `currencies.ts` is generated, so this table is separate.
 * Keys are lowercase, like the currency codes the API returns. `divisor` must be
 * a power of ten (the number of stored units in one display unit).
 */
export type CurrencyDisplayUnit = {
  code: string
  divisor: number
  symbol_native: string
  decimal_digits: number
}

export const CURRENCY_DISPLAY_UNITS: Record<string, CurrencyDisplayUnit> = {
  irr: {
    code: "IRT",
    divisor: 10,
    symbol_native: "تومان",
    decimal_digits: 0,
  },
}

export const getCurrencyDisplayUnit = (
  currencyCode: string
): CurrencyDisplayUnit | undefined => {
  return CURRENCY_DISPLAY_UNITS[currencyCode.toLowerCase()]
}

/**
 * The number of decimal places between a stored amount and its display unit,
 * for example 1 for IRR to IRT (divisor 10).
 */
export const getDisplayUnitPlaces = (unit: CurrencyDisplayUnit): number => {
  return Math.round(Math.log10(unit.divisor))
}
