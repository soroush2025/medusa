// @vitest-environment jsdom
import { renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

const languageMock = vi.hoisted(() => ({ current: "en" }))

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { language: languageMock.current } }),
}))

import {
  DATE_PRESETS,
  formatFullDateIntl,
  formatRelativeDateIntl,
  useDate,
} from "../use-date"

// Local time on purpose: date-fns and Intl both format in the local zone, so
// these expectations hold in any time zone.
const LOCAL_NOON = new Date(2026, 2, 21, 12, 0, 0)

afterEach(() => {
  vi.useRealTimers()
})

describe("useDate with a language that has no intl_locale (unchanged)", () => {
  it("formats the date with date-fns PP (note the trailing space)", () => {
    languageMock.current = "en"
    const { result } = renderHook(() => useDate())

    expect(result.current.getFullDate({ date: LOCAL_NOON })).toBe(
      "Mar 21, 2026 "
    )
  })

  it("formats date and time with date-fns PP p", () => {
    languageMock.current = "en"
    const { result } = renderHook(() => useDate())

    expect(
      result.current.getFullDate({ date: LOCAL_NOON, includeTime: true })
    ).toBe("Mar 21, 2026 12:00 PM")
  })

  it("returns an empty string for an invalid date", () => {
    languageMock.current = "en"
    const { result } = renderHook(() => useDate())

    expect(result.current.getFullDate({ date: "not a date" })).toBe("")
  })

  it("formats relative dates with date-fns", () => {
    languageMock.current = "en"
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 24, 12, 0, 0))
    const { result } = renderHook(() => useDate())

    expect(result.current.getRelativeDate(LOCAL_NOON)).toBe("3 days ago")
  })

  it("applies the preset patterns with date-fns", () => {
    languageMock.current = "en"
    const { result } = renderHook(() => useDate())

    expect(
      result.current.getPresetDate({ date: LOCAL_NOON, preset: "dateTime" })
    ).toBe("21 Mar, 2026, 12:00:00")
    expect(
      result.current.getPresetDate({ date: LOCAL_NOON, preset: "date" })
    ).toBe("21 Mar, 2026")
    expect(
      result.current.getPresetDate({
        date: LOCAL_NOON,
        preset: "dateTimeCompact",
      })
    ).toBe("21 Mar 2026 12:00:00")
  })

  it("localizes the presets with the language date_locale (they were locale-less before)", () => {
    languageMock.current = "de"
    const { result } = renderHook(() => useDate())

    expect(
      result.current.getPresetDate({ date: LOCAL_NOON, preset: "date" })
    ).toBe("21 März, 2026")
  })
})

describe("useDate with fa (Jalali through Intl)", () => {
  it("formats the date in the Persian calendar with Persian digits", () => {
    languageMock.current = "fa"
    const { result } = renderHook(() => useDate())

    const formatted = result.current.getFullDate({ date: LOCAL_NOON })

    expect(formatted).toBe("۱ فروردین ۱۴۰۵")
    expect(formatted).toContain("فروردین")
    expect(formatted).toContain("۱۴۰۵")
  })

  it("adds the time with includeTime", () => {
    languageMock.current = "fa"
    const { result } = renderHook(() => useDate())

    expect(
      result.current.getFullDate({ date: LOCAL_NOON, includeTime: true })
    ).toBe("۱ فروردین ۱۴۰۵، ۱۲:۰۰")
  })

  it("accepts ISO strings", () => {
    languageMock.current = "fa"
    const { result } = renderHook(() => useDate())

    expect(result.current.getFullDate({ date: LOCAL_NOON.toISOString() })).toBe(
      "۱ فروردین ۱۴۰۵"
    )
  })

  it("returns an empty string for an invalid date", () => {
    languageMock.current = "fa"
    const { result } = renderHook(() => useDate())

    expect(result.current.getFullDate({ date: "not a date" })).toBe("")
  })

  it("formats relative dates with Intl.RelativeTimeFormat", () => {
    languageMock.current = "fa"
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 24, 12, 0, 0))
    const { result } = renderHook(() => useDate())

    expect(result.current.getRelativeDate(LOCAL_NOON)).toBe("۳ روز پیش")
  })

  it("applies the presets through Intl", () => {
    languageMock.current = "fa"
    const { result } = renderHook(() => useDate())

    expect(
      result.current.getPresetDate({ date: LOCAL_NOON, preset: "dateTime" })
    ).toBe("۰۱ فروردین ۱۴۰۵، ۱۲:۰۰:۰۰")
    expect(
      result.current.getPresetDate({ date: LOCAL_NOON, preset: "date" })
    ).toBe("۰۱ فروردین ۱۴۰۵")
    expect(
      result.current.getPresetDate({
        date: LOCAL_NOON,
        preset: "dateTimeCompact",
      })
    ).toBe("۰۱ فروردین ۱۴۰۵، ۱۲:۰۰:۰۰")
  })

  it("accepts a numeric timestamp in a preset", () => {
    languageMock.current = "fa"
    const { result } = renderHook(() => useDate())

    expect(
      result.current.getPresetDate({
        date: LOCAL_NOON.getTime(),
        preset: "date",
      })
    ).toBe("۰۱ فروردین ۱۴۰۵")
  })
})

describe("formatFullDateIntl", () => {
  it("uses the medium date and short time styles", () => {
    expect(formatFullDateIntl(LOCAL_NOON, "fa-IR-u-ca-persian", false)).toBe(
      "۱ فروردین ۱۴۰۵"
    )
    expect(formatFullDateIntl(LOCAL_NOON, "fa-IR-u-ca-persian", true)).toBe(
      "۱ فروردین ۱۴۰۵، ۱۲:۰۰"
    )
  })

  it("reports the Persian calendar and a 14xx year", () => {
    const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
    }).resolvedOptions()

    expect(parts.calendar).toBe("persian")
    expect(formatFullDateIntl(LOCAL_NOON, "fa-IR-u-ca-persian", false)).toMatch(
      /۱۴[۰-۹]{2}/
    )
  })
})

describe("formatRelativeDateIntl", () => {
  const NOW = new Date(2026, 2, 24, 12, 0, 0)
  const L = "fa-IR-u-ca-persian"
  const minus = (ms: number) => new Date(NOW.getTime() - ms)
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  it("is 'now' for the same instant", () => {
    expect(formatRelativeDateIntl(NOW, NOW, L)).toBe("اکنون")
  })

  it("picks seconds, minutes, hours, days, months and years", () => {
    expect(formatRelativeDateIntl(minus(30 * SECOND), NOW, L)).toBe(
      "۳۰ ثانیه پیش"
    )
    expect(formatRelativeDateIntl(minus(5 * MINUTE), NOW, L)).toBe(
      "۵ دقیقه پیش"
    )
    expect(formatRelativeDateIntl(minus(2 * HOUR), NOW, L)).toBe("۲ ساعت پیش")
    expect(formatRelativeDateIntl(minus(3 * DAY), NOW, L)).toBe("۳ روز پیش")
    expect(formatRelativeDateIntl(minus(60 * DAY), NOW, L)).toBe("۲ ماه پیش")
    expect(formatRelativeDateIntl(minus(800 * DAY), NOW, L)).toBe("۲ سال پیش")
  })

  it("uses 'yesterday' wording for -1 day and future times", () => {
    expect(formatRelativeDateIntl(minus(DAY), NOW, L)).toBe("دیروز")
    expect(
      formatRelativeDateIntl(new Date(NOW.getTime() + 2 * HOUR), NOW, L)
    ).toBe("۲ ساعت بعد")
  })
})

describe("useDate stability", () => {
  it("returns the same functions across renders while the language is unchanged", () => {
    languageMock.current = "fa"
    const { result, rerender } = renderHook(() => useDate())
    const first = result.current

    rerender()

    expect(result.current.getPresetDate).toBe(first.getPresetDate)
    expect(result.current.getFullDate).toBe(first.getFullDate)
    expect(result.current.getRelativeDate).toBe(first.getRelativeDate)
  })
})

describe("DATE_PRESETS", () => {
  it("keeps the date-fns patterns the stray call sites used", () => {
    expect(DATE_PRESETS.date.pattern).toBe("dd MMM, yyyy")
    expect(DATE_PRESETS.dateTime.pattern).toBe("dd MMM, yyyy, HH:mm:ss")
    expect(DATE_PRESETS.dateTimeCompact.pattern).toBe("dd MMM yyyy HH:mm:ss")
  })
})
