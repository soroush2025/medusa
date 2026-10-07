import i18n from "i18next"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { formatCurrency } from "../format-currency"

describe("formatCurrency", () => {
  beforeAll(async () => {
    await i18n.init({ lng: "en", resources: {} })
  })

  afterAll(async () => {
    await i18n.changeLanguage("en")
  })

  it("keeps the browser default locale when the language has no intl_locale", async () => {
    await i18n.changeLanguage("en")

    expect(formatCurrency(1234.5, "usd")).toBe(
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "usd",
        signDisplay: "auto",
      }).format(1234.5)
    )
  })

  it("uses Persian digits and separators for fa", async () => {
    await i18n.changeLanguage("fa")

    expect(formatCurrency(1234567, "irr")).toBe("‎ریال ۱٬۲۳۴٬۵۶۷")
  })

  it("follows a language switch without a reload", async () => {
    await i18n.changeLanguage("fa")
    const persian = formatCurrency(10, "usd")
    await i18n.changeLanguage("en")
    const english = formatCurrency(10, "usd")

    expect(persian).toContain("۱۰")
    expect(english).not.toContain("۱۰")
  })
})
