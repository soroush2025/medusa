// @vitest-environment jsdom
import { renderHook } from "@testing-library/react"
import { Row } from "@tanstack/react-table"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { setDisplayUnitsEnabled } from "../../../../providers/display-unit-provider/display-unit-store"
import { DataGridBulkUpdateCommand, DataGridMatrix } from "../../models"
import { useDataGridClipboardEvents } from "../use-data-grid-clipboard-events"

type Row_ = { id: string }

const rows = [{ id: "r1" }, { id: "r2" }].map((original) => ({
  id: original.id,
  original,
})) as unknown as Row<Row_>[]

const column = (
  id: string,
  type: "number" | "text",
  currencyCode?: string
): any => ({
  id,
  meta: {
    name: id,
    type,
    currencyCode,
    field: ({ row }: any) => `${row.id}.${id}`,
  },
})

const container = document.createElement("div")
const focusable = document.createElement("button")
container.appendChild(focusable)

const STORED: Record<string, string | number> = {
  "r1.irr": 1250000,
  "r2.irr": 1255,
  "r1.usd": 12.5,
  "r1.note": "hello",
}

const setup = (columns: any[], span: { row: number; col: number }[]) => {
  const matrix = new DataGridMatrix<Row_, any>(rows, columns, true)
  const setSelectionValues = vi.fn()
  const execute = vi.fn()
  const getSelectionValues = vi.fn((fields: string[]) =>
    fields.map((field) => STORED[field])
  )

  const { result } = renderHook(() =>
    useDataGridClipboardEvents<Row_, any>({
      containerRef: { current: container },
      matrix,
      isEditing: false,
      anchor: span[0],
      rangeEnd: span[1],
      getSelectionValues: getSelectionValues as any,
      setSelectionValues: setSelectionValues as any,
      execute,
    })
  )

  return { result, setSelectionValues, execute, getSelectionValues }
}

const copyEvent = () => {
  const setData = vi.fn()
  const event = {
    defaultPrevented: false,
    preventDefault: vi.fn(),
    clipboardData: { setData },
  } as unknown as ClipboardEvent

  return { event, setData }
}

const pasteEvent = (text: string) =>
  ({
    defaultPrevented: false,
    preventDefault: vi.fn(),
    clipboardData: { getData: () => text },
  } as unknown as ClipboardEvent)

beforeEach(() => {
  document.body.appendChild(container)
  focusable.focus()
  setDisplayUnitsEnabled(false)
})

afterEach(() => {
  container.remove()
  setDisplayUnitsEnabled(false)
})

describe("useDataGridClipboardEvents with the Toman display unit off", () => {
  it("copies the stored values", () => {
    const { result } = setup(
      [column("irr", "number", "irr")],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ]
    )
    const { event, setData } = copyEvent()

    result.current.handleCopyEvent(event)

    expect(setData).toHaveBeenCalledWith("text/plain", "1250000\t1255")
  })

  it("pastes the text as it is", () => {
    const { result, execute, setSelectionValues } = setup(
      [column("irr", "number", "irr")],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ]
    )

    result.current.handlePasteEvent(pasteEvent("1300000\t1305"))

    const command = execute.mock.calls[0][0] as DataGridBulkUpdateCommand
    command.execute()

    expect(setSelectionValues).toHaveBeenCalledWith(
      ["r1.irr", "r2.irr"],
      ["1300000", "1305"],
      false
    )
  })
})

describe("useDataGridClipboardEvents with the Toman display unit on", () => {
  beforeEach(() => {
    setDisplayUnitsEnabled(true)
  })

  it("copies what the cells show (Toman) instead of the stored Rials", () => {
    const { result } = setup(
      [column("irr", "number", "irr")],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ]
    )
    const { event, setData } = copyEvent()

    result.current.handleCopyEvent(event)

    expect(setData).toHaveBeenCalledWith("text/plain", "125000\t125.5")
  })

  it("converts pasted Toman text back to stored Rials", () => {
    const { result, execute, setSelectionValues } = setup(
      [column("irr", "number", "irr")],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ]
    )

    result.current.handlePasteEvent(pasteEvent("130000\t130.5"))

    const command = execute.mock.calls[0][0] as DataGridBulkUpdateCommand
    command.execute()

    expect(setSelectionValues).toHaveBeenCalledWith(
      ["r1.irr", "r2.irr"],
      ["1300000", "1305"],
      false
    )
  })

  it("accepts grouped and Persian digit text, and keeps the stored values for undo", () => {
    const { result, execute, setSelectionValues } = setup(
      [column("irr", "number", "irr")],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ]
    )

    result.current.handlePasteEvent(pasteEvent("۱۳۰٬۰۰۰\t130,000"))

    const command = execute.mock.calls[0][0] as DataGridBulkUpdateCommand
    command.execute()
    expect(setSelectionValues).toHaveBeenLastCalledWith(
      ["r1.irr", "r2.irr"],
      ["1300000", "1300000"],
      false
    )

    command.undo()
    expect(setSelectionValues).toHaveBeenLastCalledWith(
      ["r1.irr", "r2.irr"],
      [1250000, 1255],
      true
    )
  })

  it("repeats a single pasted value over the selection, converted once per cell", () => {
    const { result, execute, setSelectionValues } = setup(
      [column("irr", "number", "irr")],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ]
    )

    result.current.handlePasteEvent(pasteEvent("100"))

    const command = execute.mock.calls[0][0] as DataGridBulkUpdateCommand
    command.execute()

    expect(setSelectionValues).toHaveBeenCalledWith(
      ["r1.irr", "r2.irr"],
      ["1000", "1000"],
      false
    )
  })

  it("leaves pasted text that is not a number as it is so the existing validation applies", () => {
    const { result, execute, setSelectionValues } = setup(
      [column("irr", "number", "irr")],
      [
        { row: 0, col: 0 },
        { row: 0, col: 0 },
      ]
    )

    result.current.handlePasteEvent(pasteEvent("abc"))

    const command = execute.mock.calls[0][0] as DataGridBulkUpdateCommand
    command.execute()

    expect(setSelectionValues).toHaveBeenCalledWith(["r1.irr"], ["abc"], false)
  })

  it("only converts cells whose currency has a display unit", () => {
    const { result, execute, setSelectionValues } = setup(
      [
        column("irr", "number", "irr"),
        column("usd", "number", "usd"),
        column("note", "text"),
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: 2 },
      ]
    )
    const { event, setData } = copyEvent()

    result.current.handleCopyEvent(event)
    expect(setData).toHaveBeenCalledWith("text/plain", "125000\t12.5\thello")

    result.current.handlePasteEvent(pasteEvent("130000\t20.5\tbye"))
    const command = execute.mock.calls[0][0] as DataGridBulkUpdateCommand
    command.execute()

    expect(setSelectionValues).toHaveBeenCalledWith(
      ["r1.irr", "r1.usd", "r1.note"],
      ["1300000", "20.5", "bye"],
      false
    )
  })
})
