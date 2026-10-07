// @vitest-environment jsdom
import { CurrencyInput } from "@medusajs/ui"
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
  constrainDecimals,
}: {
  currencyCode: string
  initial: string
  spy: (next: StoredAmount) => void
  constrainDecimals?: "scale" | "scale-and-limit"
}) => {
  const [stored, setStored] = useState(initial)

  return (
    <StoredCurrencyInput
      currencyCode={currencyCode}
      constrainDecimals={constrainDecimals}
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

// Types "1.234" then blurs, and records what the input shows after each step.
const typeAndBlur = (typed: string) => {
  fireEvent.focus(getInput())
  fireEvent.change(getInput(), { target: { value: typed } })
  const afterTyping = getInput().value
  fireEvent.blur(getInput())
  return { afterTyping, afterBlur: getInput().value }
}

describe("StoredCurrencyInput keeps the decimal handling of each site with the unit off", () => {
  it("scale passes only decimalScale: a third KWD decimal is limited like the plain input", () => {
    // Baseline: what the site rendered before the wrapper existed.
    const baseline = render(
      <CurrencyInput
        symbol="KD"
        code="KWD"
        decimalScale={3}
        defaultValue=""
        onValueChange={() => {}}
      />
    )
    const expected = typeAndBlur("1.234")
    baseline.unmount()

    render(
      <Harness
        currencyCode="kwd"
        initial=""
        spy={vi.fn()}
        constrainDecimals="scale"
      />
    )
    const actual = typeAndBlur("1.234")

    expect(actual).toEqual(expected)
    // decimalsLimit stays at the library default of 2: the third decimal is not typeable.
    expect(actual.afterTyping).not.toBe("1.234")
  })

  it("scale pads to three decimals on blur", () => {
    render(
      <Harness
        currencyCode="kwd"
        initial=""
        spy={vi.fn()}
        constrainDecimals="scale"
      />
    )

    expect(typeAndBlur("1.5").afterBlur).toBe("1.500")
  })

  it("scale-and-limit passes both: a third KWD decimal is typeable", () => {
    const spy = vi.fn()
    render(
      <Harness
        currencyCode="kwd"
        initial=""
        spy={spy}
        constrainDecimals="scale-and-limit"
      />
    )

    expect(typeAndBlur("1.234").afterTyping).toBe("1.234")
    expect(spy).toHaveBeenLastCalledWith({ value: "1.234", float: 1.234 })
  })

  it("passes neither prop when the site passed neither", () => {
    render(<Harness currencyCode="kwd" initial="" spy={vi.fn()} />)

    expect(typeAndBlur("1.5").afterBlur).toBe("1.5")
  })

  it("keeps decimalsLimit when the Toman unit is active, whichever option the site uses", () => {
    setDisplayUnitsEnabled(true)
    const spy = vi.fn()
    render(
      <Harness
        currencyCode="irr"
        initial=""
        spy={spy}
        constrainDecimals="scale"
      />
    )

    fireEvent.change(getInput(), { target: { value: "125.55" } })
    expect(getInput().value).not.toBe("125.55")
  })
})

describe("StoredCurrencyInput with an undefined or nullish value", () => {
  // The edit campaign budget form feeds the input from a field that starts
  // undefined and writes numbers back.
  const BudgetHarness = ({
    spy,
    toProp,
  }: {
    spy: (value: number | null) => void
    toProp: (value: number | undefined) => number | undefined
  }) => {
    const [value, setValue] = useState<number | undefined>(undefined)

    return (
      <StoredCurrencyInput
        currencyCode="usd"
        min={0}
        value={toProp(value)}
        onStoredValueChange={({ value: stored }) => {
          const next = stored ? parseInt(stored) : null
          spy(next)
          setValue(next ?? undefined)
        }}
      />
    )
  }

  // "||" is the expression the site used before; "??" is the one it uses now.
  it.each([
    ["value || undefined", (value: number | undefined) => value || undefined],
    ["value ?? undefined", (value: number | undefined) => value ?? undefined],
  ])(
    "keeps a typed 0 displayed and reports 0 with the unit off (%s)",
    (_name, toProp) => {
      const spy = vi.fn()
      render(<BudgetHarness spy={spy} toProp={toProp} />)

      fireEvent.change(getInput(), { target: { value: "0" } })

      expect(spy).toHaveBeenLastCalledWith(0)
      expect(getInput().value).toBe("0")
    }
  )

  it("keeps a typed 0 displayed and reports 0 with the Toman unit on", () => {
    setDisplayUnitsEnabled(true)
    const spy = vi.fn()
    const Toman = () => {
      const [value, setValue] = useState<number | undefined>(100)

      return (
        <StoredCurrencyInput
          currencyCode="irr"
          min={0}
          value={value ?? undefined}
          onStoredValueChange={({ value: stored }) => {
            const next = stored ? parseInt(stored) : null
            spy(next)
            setValue(next ?? undefined)
          }}
        />
      )
    }
    render(<Toman />)

    // 100 Rials is 10 Toman. Typing 0 stores 0 Rials and must not be blanked.
    fireEvent.change(getInput(), { target: { value: "0" } })

    expect(spy).toHaveBeenLastCalledWith(0)
    expect(getInput().value).toBe("0")
  })

  it("does not reset the text when a nullish value comes back for an empty field", () => {
    setDisplayUnitsEnabled(true)
    const { rerender } = render(
      <StoredCurrencyInput
        currencyCode="irr"
        value={undefined}
        onStoredValueChange={vi.fn()}
      />
    )
    rerender(
      <StoredCurrencyInput
        currencyCode="irr"
        value={null}
        onStoredValueChange={vi.fn()}
      />
    )

    expect(getInput().value).toBe("")
  })
})
