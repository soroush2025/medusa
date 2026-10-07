import { getIntlLocale } from "./format-locale"
import { isEmpty } from "./is-empty"

/**
 * Inventory quantities can be fractional when stock is held in a unit of
 * measure that is sold in fractions of itself, e.g. a pound sold as quarter
 * pounds. Rounding at four decimals keeps quarters, eighths and sixteenths
 * intact while hiding float artifacts from subtractions such as
 * `stocked_quantity - reserved_quantity`.
 */
const MAX_FRACTION_DIGITS = 4

const quantityFormatters = new Map<string, Intl.NumberFormat>()

const getQuantityFormatter = () => {
  const locale = getIntlLocale()
  const key = locale ?? ""
  let formatter = quantityFormatters.get(key)

  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: MAX_FRACTION_DIGITS,
    })
    quantityFormatters.set(key, formatter)
  }

  return formatter
}

/**
 * Formats an inventory quantity for display, appending the inventory item's
 * unit of measure when one is set. For example, a shared pound pool reads as
 * "98.25 lb" rather than just "98.25" when the unit of measure is "lb".
 */
export const formatQuantity = (
  rawQuantity?: unknown,
  unitOfMeasure?: string | null
) => {
  if (isEmpty(rawQuantity)) {
    return "-"
  }

  if (typeof rawQuantity !== "number" && typeof rawQuantity !== "string") {
    return "-"
  }

  const quantity = (
    typeof rawQuantity === "string" ? parseFloat(rawQuantity) : rawQuantity
  )!

  if (isNaN(quantity)) {
    return "-"
  }

  const formatted = getQuantityFormatter().format(quantity!)

  return unitOfMeasure ? `${formatted} ${unitOfMeasure}` : formatted
}
