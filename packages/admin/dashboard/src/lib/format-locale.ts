import i18n from "i18next"
import { useTranslation } from "react-i18next"

import { languages } from "../i18n/languages"

/**
 * Maps an i18next language code to the `intl_locale` of its entry in the
 * languages list. `undefined` means "keep the previous behavior": callers pass
 * it straight to `Intl` (browser default) or fall back to date-fns.
 */
export const resolveIntlLocale = (
  languageCode?: string | null
): string | undefined => {
  if (!languageCode) {
    return undefined
  }

  return languages.find((language) => language.code === languageCode)
    ?.intl_locale
}

/**
 * Non-reactive read of the active intl locale, for plain helper functions
 * (formatters, table renderers) that cannot call hooks.
 */
export const getIntlLocale = (): string | undefined => {
  return resolveIntlLocale(i18n.language)
}

/**
 * Reactive read of the active intl locale for components and hooks.
 */
export const useIntlLocale = (): string | undefined => {
  const { i18n: instance } = useTranslation()

  return resolveIntlLocale(instance.language)
}
