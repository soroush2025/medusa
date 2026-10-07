import { render } from "@testing-library/react"
import * as React from "react"

import { I18nProvider } from "../i18n-provider"
import { Calendar } from "./calendar"

const renderCalendar = (locale: string) =>
  render(
    <I18nProvider locale={locale}>
      <Calendar />
    </I18nProvider>
  )

// The today marker is the only role="none" element rendered inside a cell.
const getTodayMarkers = (container: HTMLElement) =>
  container.querySelectorAll('td [role="none"]')

describe("CalendarCell today marker", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] })
    vi.setSystemTime(new Date(2026, 2, 21, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("marks today in the Gregorian calendar", () => {
    const { container } = renderCalendar("en-US")

    const markers = getTodayMarkers(container)

    expect(markers).toHaveLength(1)
    expect(markers[0].parentElement).toHaveTextContent("21")
  })

  it("marks today in the Persian calendar", () => {
    const { container } = renderCalendar("fa-IR-u-ca-persian")

    const markers = getTodayMarkers(container)

    // 21 March 2026 is 1 Farvardin 1405.
    expect(markers).toHaveLength(1)
    expect(markers[0].parentElement).toHaveTextContent("۱")
  })
})
