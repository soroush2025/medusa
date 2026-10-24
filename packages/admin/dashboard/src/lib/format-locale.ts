import i18n from "i18next"
import { useSyncExternalStore } from "react"
import { useTranslation } from "react-i18next"

import { languages } from "../i18n/languages"

export const LATIN_DIGITS_STORAGE_KEY = "medusa_admin_latin_digits"

const latinDigitsListeners = new Set<() => void>()

/**
 * Per-browser preference, off by default. Reads never throw: private windows
 * and blocked storage read as "off".
 */
export const isLatinDigitsEnabled = (): boolean => {
  try {
    return window.localStorage.getItem(LATIN_DIGITS_STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

export const setLatinDigitsEnabled = (enabled: boolean): void => {
  try {
    window.localStorage.setItem(LATIN_DIGITS_STORAGE_KEY, String(enabled))
  } catch {
    // Storage is unavailable; the preference only lasts until reload.
  }

  latinDigitsListeners.forEach((listener) => listener())
}

export const subscribeLatinDigits = (listener: () => void): (() => void) => {
  latinDigitsListeners.add(listener)

  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === LATIN_DIGITS_STORAGE_KEY) {
      listener()
    }
  }

  window.addEventListener("storage", handleStorage)

  return () => {
    latinDigitsListeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

const NUMBERING_SYSTEM_RE = /-nu-[a-z0-9]{3,8}/i

/**
 * Forces Latin digits (0-9) on a BCP 47 tag, keeping the calendar and the
 * language: `fa-IR-u-ca-persian` becomes `fa-IR-u-ca-persian-nu-latn`.
 */
export const withLatinDigits = (locale: string): string => {
  if (NUMBERING_SYSTEM_RE.test(locale)) {
    return locale.replace(NUMBERING_SYSTEM_RE, "-nu-latn")
  }

  return locale.includes("-u-") ? `${locale}-nu-latn` : `${locale}-u-nu-latn`
}

/**
 * Maps an i18next language code to the `intl_locale` of its entry in the
 * languages list. `undefined` means "keep the previous behavior": callers pass
 * it straight to `Intl` (browser default) or fall back to date-fns. The Latin
 * digits preference only applies to languages that set an `intl_locale`.
 */
export const resolveIntlLocale = (
  languageCode?: string | null,
  latinDigits = false
): string | undefined => {
  if (!languageCode) {
    return undefined
  }

  const intlLocale = languages.find(
    (language) => language.code === languageCode
  )?.intl_locale

  if (!intlLocale) {
    return undefined
  }

  return latinDigits ? withLatinDigits(intlLocale) : intlLocale
}

/**
 * Non-reactive read of the active intl locale, for plain helper functions
 * (formatters, table renderers) that cannot call hooks.
 */
export const getIntlLocale = (): string | undefined => {
  return resolveIntlLocale(i18n.language, isLatinDigitsEnabled())
}

/**
 * Reactive read of the active intl locale for components and hooks. Re-renders
 * on language changes and when the Latin digits preference is toggled.
 */
export const useIntlLocale = (): string | undefined => {
  const { i18n: instance } = useTranslation()
  const latinDigits = useSyncExternalStore(
    subscribeLatinDigits,
    isLatinDigitsEnabled,
    () => false
  )

  return resolveIntlLocale(instance.language, latinDigits)
}
