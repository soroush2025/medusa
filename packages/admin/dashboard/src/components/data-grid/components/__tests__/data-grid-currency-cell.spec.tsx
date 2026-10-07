// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { useForm } from "react-hook-form"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const cell = vi.hoisted(() => ({
  control: null as any,
  onChange: vi.fn(),
  onBlur: vi.fn(),
  onFocus: vi.fn(),
}))

vi.mock("../../hooks", () => ({
  useDataGridCell: () => ({
    field: "price",
    control: cell.control,
    renderProps: {
      container: {},
      input: {
        ref: undefined,
        onBlur: cell.onBlur,
        onFocus: cell.onFocus,
        onChange: cell.onChange,
      },
    },
  }),
  useDataGridCellError: () => ({}),
}))

vi.mock("../data-grid-cell-container", () => ({
  DataGridCellContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

import { setDisplayUnitsEnabled } from "../../../../providers/display-unit-provider/display-unit-store"
import { DataGridCurrencyCell } from "../data-grid-currency-cell"

const Harness = ({ code, value }: { code: string; value: string }) => {
  const form = useForm({ defaultValues: { price: value } })
  cell.control = form.control

  return <DataGridCurrencyCell context={{} as any} code={code} />
}

const getInput = () => screen.getByRole("textbox") as HTMLInputElement

beforeEach(() => {
  cell.onChange.mockClear()
  cell.onBlur.mockClear()
  cell.onFocus.mockClear()
  setDisplayUnitsEnabled(false)
})

afterEach(() => {
  cleanup()
  setDisplayUnitsEnabled(false)
})

describe("DataGridCurrencyCell", () => {
  it("shows and commits Rials unchanged while the display unit is off", () => {
    render(<Harness code="irr" value="1250000" />)

    // Unchanged behaviour: without explicit separators the library groups
    // digits with the browser locale's separator (en-US in jsdom).
    expect(getInput().value).toBe("1,250,000")

    fireEvent.change(getInput(), { target: { value: "1300000" } })
    fireEvent.blur(getInput())

    expect(cell.onChange).toHaveBeenCalledWith("1300000", "1250000")
  })

  it("shows Toman and commits the stored Rial string on blur when the unit is on", () => {
    setDisplayUnitsEnabled(true)
    render(<Harness code="irr" value="1250000" />)

    expect(getInput().value).toBe("125,000")
    expect(screen.getByText("تومان")).toBeTruthy()

    fireEvent.change(getInput(), { target: { value: "130000" } })
    expect(cell.onChange).not.toHaveBeenCalled()

    fireEvent.blur(getInput())

    expect(cell.onChange).toHaveBeenCalledWith("1300000", "1250000")
  })

  it("does not truncate 125.5 Toman (1255 Rials) when the cell is only focused and blurred", () => {
    setDisplayUnitsEnabled(true)
    render(<Harness code="irr" value="1255" />)

    expect(getInput().value).toBe("125.5")

    fireEvent.focus(getInput())
    fireEvent.blur(getInput())

    expect(cell.onChange).toHaveBeenCalledWith("1255", "1255")
  })

  it("does not touch other currencies while the unit is on", () => {
    setDisplayUnitsEnabled(true)
    render(<Harness code="usd" value="10" />)

    expect(screen.getByText("$")).toBeTruthy()
    expect(getInput().value).toBe("10.00")
  })
})
