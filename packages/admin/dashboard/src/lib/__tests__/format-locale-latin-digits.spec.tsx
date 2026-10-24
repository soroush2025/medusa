// @vitest-environment jsdom
import i18n from "i18next"
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import { formatCurrency } from "../format-currency"
import {
  getIntlLocale,
  isLatinDigitsEnabled,
  LATIN_DIGITS_STORAGE_KEY,
  resolveIntlLocale,
  setLatinDigitsEnabled,
  subscribeLatinDigits,
  withLatinDigits,
} from "../format-locale"
import { formatPercentage } from "../percentage-helpers"
import { formatQuantity } from "../format-quantity"

describe("Latin digits preference", () => {
  beforeAll(async () => {
    await i18n.init({ lng: "en", resources: {} })
  })

  afterEach(async () => {
    window.localStorage.clear()
    vi.restoreAllMocks()
    await i18n.changeLanguage("en")
  })

  afterAll(async () => {
    await i18n.changeLanguage("en")
  })

  it("uses the documented localStorage key", () => {
    expect(LATIN_DIGITS_STORAGE_KEY).toBe("medusa_admin_latin_digits")
  })

  it("is off by default", () => {
    expect(isLatinDigitsEnabled()).toBe(false)
  })

  it("persists the preference under the key", () => {
    setLatinDigitsEnabled(true)
    expect(window.localStorage.getItem("medusa_admin_latin_digits")).toBe(
      "true"
    )
    expect(isLatinDigitsEnabled()).toBe(true)

    setLatinDigitsEnabled(false)
    expect(window.localStorage.getItem("medusa_admin_latin_digits")).toBe(
      "false"
    )
    expect(isLatinDigitsEnabled()).toBe(false)
  })

  it("treats any stored value other than true as off", () => {
    window.localStorage.setItem("medusa_admin_latin_digits", "1")

    expect(isLatinDigitsEnabled()).toBe(false)
  })

  it("does not throw and reads as off when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked")
    })
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked")
    })

    expect(isLatinDigitsEnabled()).toBe(false)
    expect(() => setLatinDigitsEnabled(true)).not.toThrow()
  })

  it("notifies subscribers when the preference changes and stops after unsubscribe", () => {
    const listener = vi.fn()
    const unsubscribe = subscribeLatinDigits(listener)

    setLatinDigitsEnabled(true)
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    setLatinDigitsEnabled(false)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it("notifies subscribers on a storage event for the key from another tab", () => {
    const listener = vi.fn()
    const unsubscribe = subscribeLatinDigits(listener)

    window.dispatchEvent(
      new StorageEvent("storage", { key: "medusa_admin_latin_digits" })
    )
    window.dispatchEvent(new StorageEvent("storage", { key: "unrelated" }))

    expect(listener).toHaveBeenCalledTimes(1)
    unsubscribe()
  })
})

describe("withLatinDigits", () => {
  it("appends nu-latn to an existing Unicode extension", () => {
    expect(withLatinDigits("fa-IR-u-ca-persian")).toBe(
      "fa-IR-u-ca-persian-nu-latn"
    )
  })

  it("opens a Unicode extension when there is none", () => {
    expect(withLatinDigits("fa-IR")).toBe("fa-IR-u-nu-latn")
  })

  it("replaces an existing numbering system instead of duplicating it", () => {
    expect(withLatinDigits("fa-IR-u-ca-persian-nu-arab")).toBe(
      "fa-IR-u-ca-persian-nu-latn"
    )
  })

  it("is idempotent", () => {
    expect(withLatinDigits(withLatinDigits("fa-IR-u-ca-persian"))).toBe(
      "fa-IR-u-ca-persian-nu-latn"
    )
  })

  it("always yields a valid canonical locale", () => {
    for (const input of [
      "fa-IR-u-ca-persian",
      "fa-IR",
      "fa-IR-u-ca-persian-nu-arab",
    ]) {
      expect(() =>
        Intl.getCanonicalLocales(withLatinDigits(input))
      ).not.toThrow()
    }
  })
})

describe("getIntlLocale with Latin digits", () => {
  beforeAll(async () => {
    await i18n.init({ lng: "en", resources: {} })
  })

  afterEach(async () => {
    window.localStorage.clear()
    await i18n.changeLanguage("en")
  })

  it("keeps the Persian digits while the preference is off", async () => {
    await i18n.changeLanguage("fa")

    expect(getIntlLocale()).toBe("fa-IR-u-ca-persian")
  })

  it("appends -nu-latn for fa when the preference is on", async () => {
    await i18n.changeLanguage("fa")
    setLatinDigitsEnabled(true)

    expect(getIntlLocale()).toBe("fa-IR-u-ca-persian-nu-latn")
  })

  it("returns to the Persian digits when the preference is turned off again", async () => {
    await i18n.changeLanguage("fa")
    setLatinDigitsEnabled(true)
    setLatinDigitsEnabled(false)

    expect(getIntlLocale()).toBe("fa-IR-u-ca-persian")
  })

  it("does not touch languages without an intl_locale", async () => {
    setLatinDigitsEnabled(true)

    await i18n.changeLanguage("en")
    expect(getIntlLocale()).toBeUndefined()

    await i18n.changeLanguage("de")
    expect(getIntlLocale()).toBeUndefined()
  })

  it("resolveIntlLocale honors an explicit flag over storage", () => {
    expect(resolveIntlLocale("fa", true)).toBe("fa-IR-u-ca-persian-nu-latn")
    expect(resolveIntlLocale("fa", false)).toBe("fa-IR-u-ca-persian")
    expect(resolveIntlLocale("en", true)).toBeUndefined()
  })

  it("keeps the Persian calendar and month names but prints Latin digits", async () => {
    await i18n.changeLanguage("fa")
    setLatinDigitsEnabled(true)

    const formatted = new Intl.DateTimeFormat(getIntlLocale(), {
      dateStyle: "medium",
    }).format(new Date(2026, 2, 21, 12, 0, 0))

    expect(formatted).toBe("1 فروردین 1405")
  })

  it("makes the number helpers print Latin digits", async () => {
    await i18n.changeLanguage("fa")
    setLatinDigitsEnabled(true)

    expect(formatPercentage(50)).toBe("50.00%")
    expect(formatQuantity(98.25)).toBe("98.25")
    expect(formatCurrency(1234567, "irr")).toBe(
      "\u200e\u0631\u06cc\u0627\u0644\u00a01,234,567"
    )
  })
})
