"use client"

import {
  CalendarDate,
  getLocalTimeZone,
  isToday,
} from "@internationalized/date"
import * as React from "react"
import { useCalendarCell } from "react-aria"
import { CalendarState } from "react-stately"

import { clx } from "@/utils/clx"

interface CalendarCellProps {
  date: CalendarDate
  state: CalendarState
}

const CalendarCell = ({ state, date }: CalendarCellProps) => {
  const ref = React.useRef(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref)

  const isToday = getIsToday(date)

  return (
    <td {...cellProps} className="p-1">
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={clx(
          "bg-ui-bg-base txt-compact-small relative flex size-8 items-center justify-center rounded-md outline-none transition-fg border border-transparent",
          "hover:bg-ui-bg-base-hover",
          "focus-visible:shadow-borders-focus focus-visible:border-ui-border-interactive",
          {
            "!bg-ui-bg-interactive !text-ui-fg-on-color": isSelected,
            "hidden": isOutsideVisibleRange,
            "text-ui-fg-muted hover:!bg-ui-bg-base cursor-default": isDisabled || isUnavailable,
          }
        )}
      >
        {formattedDate}
        {isToday && (
          <div
            role="none"
            className={clx(
              "bg-ui-bg-interactive absolute bottom-[3px] left-1/2 size-[3px] -translate-x-1/2 rounded-full transition-fg",
              {
                "bg-ui-fg-on-color": isSelected,
              }
            )}
          />
        )}
      </div>
    </td>
  )
}

/**
 * Check if the date is today. The date may belong to any calendar (for example
 * the Persian calendar), so it is compared as a calendar-aware date instead of
 * by its year, month and day numbers.
 * @returns Whether the CalendarDate is today.
 */
function getIsToday(date: CalendarDate) {
  return isToday(date, getLocalTimeZone())
}

export { CalendarCell }
