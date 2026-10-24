import { getActiveDisplayUnit } from "../providers/display-unit-provider/display-unit-store"
import { getIntlLocale } from "./format-locale"
import { formatInDisplayUnit } from "./money-amount-helpers"

export const formatCurrency = (amount: number, currency: string) => {
  const unit = getActiveDisplayUnit(currency)

  if (unit) {
    return formatInDisplayUnit(amount, unit)
  }

  return new Intl.NumberFormat(getIntlLocale(), {
    style: "currency",
    currency,
    signDisplay: "auto",
  }).format(amount)
}
