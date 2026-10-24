import { format, formatDistance, sub } from "date-fns"
import { enUS } from "date-fns/locale"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"

import { languages } from "../i18n/languages"
import { useIntlLocale } from "../lib/format-locale"

const dateTimeFormatCache = new Map<string, Intl.DateTimeFormat>()
const relativeTimeFormatCache = new Map<string, Intl.RelativeTimeFormat>()

/**
 * Building an Intl formatter is expensive (about 0.3 ms for `fa`) and the date
 * helpers run once per table cell, so formatters are cached per locale and
 * options.
 */
const getDateTimeFormat = (
  intlLocale: string,
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat => {
  const key = `${intlLocale}|${JSON.stringify(options)}`
  let formatter = dateTimeFormatCache.get(key)

  if (!formatter) {
    formatter = new Intl.DateTimeFormat(intlLocale, options)
    dateTimeFormatCache.set(key, formatter)
  }

  return formatter
}

const getRelativeTimeFormat = (
  intlLocale: string,
  options: Intl.RelativeTimeFormatOptions
): Intl.RelativeTimeFormat => {
  const key = `${intlLocale}|${JSON.stringify(options)}`
  let formatter = relativeTimeFormatCache.get(key)

  if (!formatter) {
    formatter = new Intl.RelativeTimeFormat(intlLocale, options)
    relativeTimeFormatCache.set(key, formatter)
  }

  return formatter
}

export type DatePreset = "date" | "dateTime" | "dateTimeCompact"

const DATE_TIME_INTL_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
}

/**
 * The fixed date formats that were previously written inline as date-fns
 * patterns. `pattern` is used for languages without an `intl_locale`; `intl`
 * is the Intl equivalent used when one is set.
 */
export const DATE_PRESETS: Record<
  DatePreset,
  { pattern: string; intl: Intl.DateTimeFormatOptions }
> = {
  date: {
    pattern: "dd MMM, yyyy",
    intl: { day: "2-digit", month: "short", year: "numeric" },
  },
  dateTime: {
    pattern: "dd MMM, yyyy, HH:mm:ss",
    intl: DATE_TIME_INTL_OPTIONS,
  },
  dateTimeCompact: {
    pattern: "dd MMM yyyy HH:mm:ss",
    intl: DATE_TIME_INTL_OPTIONS,
  },
}

/**
 * Intl equivalent of the date-fns tokens `PP` (medium date) and `PP p`
 * (medium date plus short time).
 */
export const formatFullDateIntl = (
  date: Date,
  intlLocale: string,
  includeTime: boolean
): string => {
  const options: Intl.DateTimeFormatOptions = includeTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" }

  return getDateTimeFormat(intlLocale, options).format(date)
}

const SECONDS_IN_UNIT: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
]

/**
 * Relative time through `Intl.RelativeTimeFormat`. The wording is CLDR's
 * ("3 days ago"), not date-fns' fuzzy "about 3 hours ago".
 *
 * The unit is chosen after rounding, so 59.6 seconds reads "1 minute" rather
 * than "60 seconds", and 364 days reads "1 year" rather than "12 months".
 */
export const formatRelativeDateIntl = (
  date: Date,
  now: Date,
  intlLocale: string
): string => {
  const diffInSeconds = (date.getTime() - now.getTime()) / 1000
  const absolute = Math.abs(diffInSeconds)

  let index = SECONDS_IN_UNIT.findIndex(([, seconds]) => absolute >= seconds)
  if (index === -1) {
    index = SECONDS_IN_UNIT.length - 1
  }

  let value = Math.round(diffInSeconds / SECONDS_IN_UNIT[index][1])

  // Promote to the next larger unit once the rounded value fills it, for
  // example 60 seconds or 12 months.
  while (
    index > 0 &&
    Math.abs(value) >=
      Math.round(SECONDS_IN_UNIT[index - 1][1] / SECONDS_IN_UNIT[index][1])
  ) {
    index -= 1
    value = Math.round(diffInSeconds / SECONDS_IN_UNIT[index][1])
  }

  return getRelativeTimeFormat(intlLocale, { numeric: "auto" }).format(
    value,
    SECONDS_IN_UNIT[index][0]
  )
}

// TODO: We rely on the current language to determine the date locale. This is not ideal, as we use en-US for the english translation.
// We either need to also have an en-GB translation or we need to separate the date locale from the translation language.
export const useDate = () => {
  const { i18n } = useTranslation()
  const intlLocale = useIntlLocale()

  const locale =
    languages.find((l) => l.code === i18n.language)?.date_locale || enUS

  const getFullDate = useCallback(
    ({
      date,
      includeTime = false,
    }: {
      date: string | Date
      includeTime?: boolean
    }) => {
      const ensuredDate = new Date(date)

      if (isNaN(ensuredDate.getTime())) {
        return ""
      }

      if (intlLocale) {
        return formatFullDateIntl(ensuredDate, intlLocale, includeTime)
      }

      const timeFormat = includeTime ? "p" : ""

      return format(ensuredDate, `PP ${timeFormat}`, {
        locale,
      })
    },
    [intlLocale, locale]
  )

  const getPresetDate = useCallback(
    ({
      date,
      preset,
    }: {
      date: string | number | Date
      preset: DatePreset
    }) => {
      const ensuredDate = new Date(date)

      if (isNaN(ensuredDate.getTime())) {
        return ""
      }

      const { pattern, intl } = DATE_PRESETS[preset]

      if (intlLocale) {
        return getDateTimeFormat(intlLocale, intl).format(ensuredDate)
      }

      return format(ensuredDate, pattern, { locale })
    },
    [intlLocale, locale]
  )

  const getRelativeDate = useCallback(
    (date: string | Date): string => {
      const now = new Date()

      if (intlLocale) {
        const ensuredDate = new Date(date)

        if (isNaN(ensuredDate.getTime())) {
          return ""
        }

        return formatRelativeDateIntl(ensuredDate, now, intlLocale)
      }

      return formatDistance(sub(new Date(date), { minutes: 0 }), now, {
        addSuffix: true,
        locale,
      })
    },
    [intlLocale, locale]
  )

  return {
    getFullDate,
    getPresetDate,
    getRelativeDate,
  }
}
