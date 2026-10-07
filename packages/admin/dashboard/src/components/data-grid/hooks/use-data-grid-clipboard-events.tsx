import { RefObject, useCallback } from "react"
import { FieldValues, Path, PathValue } from "react-hook-form"

import { buildCurrencyInputInfo } from "../../../hooks/use-currency-input-info"
import { getCurrencyDisplayUnit } from "../../../lib/data/currency-display-units"
import { isDisplayUnitsEnabled } from "../../../providers/display-unit-provider/display-unit-store"
import { DataGridBulkUpdateCommand, DataGridMatrix } from "../models"
import { DataGridCoordinates } from "../types"

/**
 * True when the cell holds an amount that is currently shown in a display unit
 * (for example Toman for IRR), so its stored value differs from what it shows.
 */
const hasActiveDisplayUnit = (currencyCode: string | undefined) =>
  !!currencyCode &&
  isDisplayUnitsEnabled() &&
  !!getCurrencyDisplayUnit(currencyCode)

type UseDataGridClipboardEventsOptions<
  TData,
  TFieldValues extends FieldValues
> = {
  containerRef: RefObject<HTMLDivElement>
  matrix: DataGridMatrix<TData, TFieldValues>
  isEditing: boolean
  anchor: DataGridCoordinates | null
  rangeEnd: DataGridCoordinates | null
  getSelectionValues: (
    fields: string[]
  ) => PathValue<TFieldValues, Path<TFieldValues>>[]
  setSelectionValues: (
    fields: string[],
    values: PathValue<TFieldValues, Path<TFieldValues>>[]
  ) => void
  execute: (command: DataGridBulkUpdateCommand) => void
}

export const useDataGridClipboardEvents = <
  TData,
  TFieldValues extends FieldValues
>({
  containerRef,
  matrix,
  anchor,
  rangeEnd,
  isEditing,
  getSelectionValues,
  setSelectionValues,
  execute,
}: UseDataGridClipboardEventsOptions<TData, TFieldValues>) => {
  const handleCopyEvent = useCallback(
    (e: ClipboardEvent) => {
      if (isEditing || !anchor || !rangeEnd) {
        return
      }

      const container = containerRef.current
      if (e.defaultPrevented || !container) {
        return
      }

      const activeElement = document.activeElement
      if (activeElement && !container.contains(activeElement)) {
        return
      }

      const selection = window.getSelection()
      if (selection && !selection.isCollapsed) {
        const selectionInsideGrid =
          !!selection.anchorNode &&
          !!selection.focusNode &&
          container.contains(selection.anchorNode) &&
          container.contains(selection.focusNode)

        if (!selectionInsideGrid) {
          return
        }
      }

      e.preventDefault()

      const fields = matrix.getFieldsInSelection(anchor, rangeEnd)
      const values = getSelectionValues(fields)
      const currencyCodes = matrix.getCurrencyCodesInSelection(anchor, rangeEnd)

      const text = values
        .map((value, index) => {
          if (typeof value === "object" && value !== null) {
            return JSON.stringify(value)
          }

          // Copy what the cell shows: an amount in an active display unit is
          // stored in the base unit (Rials) but shown in Toman.
          const currencyCode = currencyCodes[index]
          if (value != null && hasActiveDisplayUnit(currencyCode)) {
            return buildCurrencyInputInfo(currencyCode, true).toDisplayValue(
              value as string | number
            )
          }

          return value == null ? "" : `${value}`
        })
        .join("\t")

      e.clipboardData?.setData("text/plain", text)
    },
    [isEditing, anchor, rangeEnd, containerRef, matrix, getSelectionValues]
  )

  const handlePasteEvent = useCallback(
    (e: ClipboardEvent) => {
      if (isEditing || !anchor || !rangeEnd) {
        return
      }

      e.preventDefault()

      const text = e.clipboardData?.getData("text/plain")

      if (!text) {
        return
      }

      let next = text.split("\t")

      const fields = matrix.getFieldsInSelection(anchor, rangeEnd)
      const prev = getSelectionValues(fields)
      const currencyCodes = matrix.getCurrencyCodesInSelection(anchor, rangeEnd)

      // Pasted amounts are in the displayed unit (Toman), the grid stores the
      // base unit (Rials). The setter repeats `next` over the selection, so it
      // is expanded to one entry per cell before converting each one.
      if (currencyCodes.some(hasActiveDisplayUnit)) {
        next = fields.map((_, index) => {
          const pasted = next[index % next.length]
          const currencyCode = currencyCodes[index]

          if (!hasActiveDisplayUnit(currencyCode)) {
            return pasted
          }

          const info = buildCurrencyInputInfo(currencyCode, true)
          const stored = info.toStoredValue(pasted)

          // Leave text that is not a number untouched so the grid's existing
          // validation handles it the same way as before.
          return stored === null ? pasted : String(stored)
        })
      }

      const command = new DataGridBulkUpdateCommand({
        fields,
        next,
        prev,
        setter: setSelectionValues,
      })

      execute(command)
    },
    [
      isEditing,
      anchor,
      rangeEnd,
      matrix,
      getSelectionValues,
      setSelectionValues,
      execute,
    ]
  )

  return {
    handleCopyEvent,
    handlePasteEvent,
  }
}
