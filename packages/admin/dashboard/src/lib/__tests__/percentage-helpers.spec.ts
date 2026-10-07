import i18n from "i18next"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { formatPercentage } from "../percentage-helpers"

describe("formatPercentage", () => {
  beforeAll(async () => {
    await i18n.init({ lng: "en", resources: {} })
  })

  afterAll(async () => {
    await i18n.changeLanguage("en")
  })

  it("keeps the previous behavior for en", async () => {
    await i18n.changeLanguage("en")

    expect(formatPercentage(50)).toBe(
      new Intl.NumberFormat([], {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }).format(0.5)
    )
    expect(formatPercentage(0.5, true)).toBe(formatPercentage(50))
  })

  it("renders Persian digits, decimal separator and percent sign for fa", async () => {
    await i18n.changeLanguage("fa")

    expect(formatPercentage(50)).toBe("۵۰٫۰۰٪")
    expect(formatPercentage(0.5, true)).toBe("۵۰٫۰۰٪")
  })

  it("treats null and undefined as zero", async () => {
    await i18n.changeLanguage("fa")

    expect(formatPercentage(null)).toBe("۰٫۰۰٪")
    expect(formatPercentage(undefined)).toBe("۰٫۰۰٪")
  })
})
