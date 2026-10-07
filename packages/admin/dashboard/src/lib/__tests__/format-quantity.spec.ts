import i18n from "i18next"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { formatQuantity } from "../format-quantity"

describe("formatQuantity", () => {
  it("renders whole quantities without decimals", () => {
    expect(formatQuantity(100)).toBe("100")
  })

  it("renders fractional quantities", () => {
    expect(formatQuantity(98.25)).toBe("98.25")
  })

  it("appends the unit of measure when set", () => {
    expect(formatQuantity(98.25, "lb")).toBe("98.25 lb")
    expect(formatQuantity(0.25, "lb")).toBe("0.25 lb")
  })

  it("hides float artifacts from quantity arithmetic", () => {
    // stocked_quantity - reserved_quantity
    expect(formatQuantity(0.3 - 0.1, "lb")).toBe("0.2 lb")
  })

  it("falls back to a placeholder for missing quantities", () => {
    expect(formatQuantity(undefined)).toBe("-")
    expect(formatQuantity(null, "lb")).toBe("-")
    expect(formatQuantity(NaN)).toBe("-")
  })

  it("renders zero rather than the placeholder", () => {
    expect(formatQuantity(0, "lb")).toBe("0 lb")
  })
})

describe("formatQuantity with an intl_locale", () => {
  beforeAll(async () => {
    await i18n.init({ lng: "en", resources: {} })
  })

  afterAll(async () => {
    await i18n.changeLanguage("en")
  })

  it("renders Persian digits and the Persian decimal separator for fa", async () => {
    await i18n.changeLanguage("fa")

    expect(formatQuantity(98.25)).toBe("۹۸٫۲۵")
    expect(formatQuantity(98.25, "kg")).toBe("۹۸٫۲۵ kg")
    expect(formatQuantity(1234567)).toBe("۱٬۲۳۴٬۵۶۷")
  })

  it("still hides float artifacts at four decimals", async () => {
    await i18n.changeLanguage("fa")

    expect(formatQuantity(0.3 - 0.1, "lb")).toBe("۰٫۲ lb")
  })

  it("keeps the placeholder for missing quantities", async () => {
    await i18n.changeLanguage("fa")

    expect(formatQuantity(undefined)).toBe("-")
  })
})
