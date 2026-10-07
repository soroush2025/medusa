// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { setDisplayUnitsEnabled } from "../../../../providers/display-unit-provider/display-unit-store"
import { StoredAmount, StoredCurrencyInput } from "../stored-currency-input"

const getInput = () => screen.getByRole("textbox") as HTMLInputElement

const Harness = ({
  currencyCode,
  initial,
  spy,
}: {
  currencyCode: string
  initial: string
  spy: (next: StoredAmount) => void
}) => {
  const [stored, setStored] = useState(initial)

  return (
    <StoredCurrencyInput
      currencyCode={currencyCode}
      value={stored}
      onStoredValueChange={(next) => {
        spy(next)
        setStored(next.value)
      }}
    />
  )
}

beforeEach(() => {
  setDisplayUnitsEnabled(false)
})

afterEach(() => {
  cleanup()
  setDisplayUnitsEnabled(false)
})

describe("StoredCurrencyInput with the display unit off", () => {
  it("behaves like the plain currency input: library value and float pass straight through", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="usd" initial="12.5" spy={spy} />)

    expect(getInput().value).toBe("12.5")
    expect(screen.getByText("USD")).toBeTruthy()
    expect(screen.getByText("$")).toBeTruthy()

    fireEvent.change(getInput(), { target: { value: "15.25" } })

    expect(spy).toHaveBeenLastCalledWith({ value: "15.25", float: 15.25 })
  })

  it("emits an empty amount when the field is cleared", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="usd" initial="12.5" spy={spy} />)

    fireEvent.change(getInput(), { target: { value: "" } })

    expect(spy).toHaveBeenLastCalledWith({ value: "", float: null })
  })

  it("shows IRR in Rials and labels it IRR", () => {
    render(<Harness currencyCode="irr" initial="1250000" spy={vi.fn()} />)

    // Unchanged behaviour: the plain ui CurrencyInput groups digits with the
    // browser locale's separator (en-US in jsdom).
    expect(getInput().value).toBe("1,250,000")
    expect(screen.getByText("IRR")).toBeTruthy()
  })
})

describe("StoredCurrencyInput with the Toman unit on", () => {
  beforeEach(() => {
    setDisplayUnitsEnabled(true)
  })

  it("shows the stored Rial amount in Toman and labels the unit", () => {
    render(<Harness currencyCode="irr" initial="1250000" spy={vi.fn()} />)

    expect(getInput().value).toBe("125,000")
    expect(screen.getByText("IRT")).toBeTruthy()
    expect(screen.getByText("تومان")).toBeTruthy()
  })

  it("emits the STORED amount (Rials) when the user types Toman", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="irr" initial="1250000" spy={spy} />)

    fireEvent.change(getInput(), { target: { value: "130000" } })

    expect(spy).toHaveBeenLastCalledWith({ value: "1300000", float: 1300000 })
    expect(getInput().value).toBe("130,000")
  })

  it("keeps a half Toman exact and does not truncate it on focus and blur", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="irr" initial="1255" spy={spy} />)

    expect(getInput().value).toBe("125.5")

    fireEvent.focus(getInput())
    fireEvent.blur(getInput())

    expect(getInput().value).toBe("125.5")
    // The library re-emits on blur; the stored amount must still be 1255.
    for (const call of spy.mock.calls) {
      expect(call[0]).toEqual({ value: "1255", float: 1255 })
    }
  })

  it("accepts a typed half Toman as the exact Rial amount", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="irr" initial="" spy={spy} />)

    fireEvent.change(getInput(), { target: { value: "125.5" } })

    expect(spy).toHaveBeenLastCalledWith({ value: "1255", float: 1255 })
  })

  it("emits an empty amount when cleared", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="irr" initial="1250000" spy={spy} />)

    fireEvent.change(getInput(), { target: { value: "" } })

    expect(spy).toHaveBeenLastCalledWith({ value: "", float: null })
  })

  it("ignores Persian digits typed into the field (library limitation, documented)", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="irr" initial="1250000" spy={spy} />)

    fireEvent.change(getInput(), { target: { value: "۱۲۵" } })

    expect(spy).toHaveBeenLastCalledWith({ value: "", float: null })
  })

  it("re-syncs the text when the stored value is changed from outside", () => {
    const { rerender } = render(
      <StoredCurrencyInput
        currencyCode="irr"
        value="1250000"
        onStoredValueChange={vi.fn()}
      />
    )
    expect(getInput().value).toBe("125,000")

    rerender(
      <StoredCurrencyInput
        currencyCode="irr"
        value="2000000"
        onStoredValueChange={vi.fn()}
      />
    )

    expect(getInput().value).toBe("200,000")
  })

  it("does not overwrite what the user is typing when the parent echoes the stored value back", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="irr" initial="" spy={spy} />)

    fireEvent.change(getInput(), { target: { value: "125.5" } })
    expect(getInput().value).toBe("125.5")
  })

  it("leaves other currencies alone while the preference is on", () => {
    const spy = vi.fn()
    render(<Harness currencyCode="usd" initial="12.5" spy={spy} />)

    expect(screen.getByText("USD")).toBeTruthy()
    fireEvent.change(getInput(), { target: { value: "15" } })
    expect(spy).toHaveBeenLastCalledWith({ value: "15", float: 15 })
  })
})
