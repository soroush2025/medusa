import { getIntlLocale } from "./format-locale"

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat(getIntlLocale(), {
    style: "currency",
    currency,
    signDisplay: "auto",
  }).format(amount)
}
