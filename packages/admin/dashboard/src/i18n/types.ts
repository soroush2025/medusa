import type { Locale } from "date-fns"
import enUS from "./translations/en.json"

const resources = {
  translation: enUS,
} as const

export type Resources = typeof resources

export type Language = {
  code: string
  display_name: string
  ltr: boolean
  date_locale: Locale
  /**
   * Optional BCP 47 tag handed to `Intl` and to the ui `I18nProvider` instead
   * of the language code. Use it to select a calendar or numbering system, for
   * example `fa-IR-u-ca-persian`. When unset the language renders exactly as
   * before (date-fns `date_locale`, browser default number formatting).
   * `<html lang>` always uses the clean language code, never this value.
   */
  intl_locale?: string
}
