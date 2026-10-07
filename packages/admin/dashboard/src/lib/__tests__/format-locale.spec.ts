import i18n from "i18next"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { languages } from "../../i18n/languages"
import { getIntlLocale, resolveIntlLocale } from "../format-locale"

describe("resolveIntlLocale", () => {
  it("returns the configured intl_locale for fa", () => {
    expect(resolveIntlLocale("fa")).toBe("fa-IR-u-ca-persian")
  })

  it("returns undefined for languages without an intl_locale", () => {
    expect(resolveIntlLocale("en")).toBeUndefined()
    expect(resolveIntlLocale("ptBR")).toBeUndefined()
  })

  it("returns undefined for unknown, empty and missing codes", () => {
    expect(resolveIntlLocale("xx")).toBeUndefined()
    expect(resolveIntlLocale("")).toBeUndefined()
    expect(resolveIntlLocale(undefined)).toBeUndefined()
    expect(resolveIntlLocale(null)).toBeUndefined()
  })

  it("only fa sets an intl_locale in this release", () => {
    const withLocale = languages
      .filter((language) => language.intl_locale)
      .map((language) => language.code)

    expect(withLocale).toEqual(["fa"])
  })

  it("every configured intl_locale is a valid BCP 47 tag with the language of its code", () => {
    for (const language of languages) {
      if (!language.intl_locale) {
        continue
      }

      expect(() => Intl.getCanonicalLocales(language.intl_locale!)).not.toThrow()
      expect(new Intl.Locale(language.intl_locale).language).toBe(language.code)
    }
  })
})

describe("getIntlLocale", () => {
  beforeAll(async () => {
    await i18n.init({ lng: "en", resources: {} })
  })

  afterAll(async () => {
    await i18n.changeLanguage("en")
  })

  it("is undefined while the active language is en", async () => {
    await i18n.changeLanguage("en")

    expect(getIntlLocale()).toBeUndefined()
  })

  it("follows the active i18next language", async () => {
    await i18n.changeLanguage("fa")
    expect(getIntlLocale()).toBe("fa-IR-u-ca-persian")

    await i18n.changeLanguage("de")
    expect(getIntlLocale()).toBeUndefined()
  })
})
