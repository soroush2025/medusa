import { CurrencyInput } from "@medusajs/ui"
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react"
import { useCurrencyInputInfo } from "../../../hooks/use-currency-input-info"

type CurrencyInputProps = ComponentPropsWithoutRef<typeof CurrencyInput>

export type StoredAmount = { value: string; float: number | null }

export type StoredCurrencyInputProps = Omit<
  CurrencyInputProps,
  | "symbol"
  | "code"
  | "value"
  | "onValueChange"
  | "decimalScale"
  | "decimalsLimit"
> & {
  /** The currency of the amount (any case). */
  currencyCode: string
  /** The amount in STORED units (what the API and the form state hold). */
  value: string | number | null | undefined
  /** Called with the amount in STORED units on every change. */
  onStoredValueChange: (stored: StoredAmount) => void
  /**
   * While no display unit is active, pass the currency's decimal digits to the
   * input exactly as the site did before: "scale" passes only decimalScale,
   * "scale-and-limit" passes decimalScale and decimalsLimit. Omit it for sites
   * that passed neither. With a display unit active the derived props are
   * always used.
   */
  constrainDecimals?: "scale" | "scale-and-limit"
}

const toNumber = (value: StoredCurrencyInputProps["value"]) => {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const parsed = Number(value)

  return Number.isNaN(parsed) ? null : parsed
}

/**
 * The ui CurrencyInput for form fields that hold amounts in stored units.
 *
 * While a display unit is active (IRR shown as Toman) the input shows and
 * accepts display units, but emits the stored amount, so form state, validation
 * and the API never see a converted number. Without an active unit it is the ui
 * CurrencyInput: the library's value and float are passed straight through.
 */
export const StoredCurrencyInput = forwardRef<
  HTMLInputElement,
  StoredCurrencyInputProps
>(
  (
    { currencyCode, value, onStoredValueChange, constrainDecimals, ...props },
    ref
  ) => {
    const info = useCurrencyInputInfo(currencyCode)
    const active = info.divisor !== 1

    // The text the user sees and types, in display units.
    const [display, setDisplay] = useState(() => info.toDisplayValue(value))
    const displayRef = useRef(display)
    displayRef.current = display

    // Re-sync only when the stored value was changed from outside, that is when
    // the stored value of the current text no longer equals the incoming value.
    // This keeps "125." or "125.5" intact while the parent echoes values back.
    useEffect(() => {
      if (!active) {
        return
      }

      if (info.toStoredValue(displayRef.current) !== toNumber(value)) {
        setDisplay(info.toDisplayValue(value))
      }
    }, [value, info, active])

    const derivedProps = active
      ? info.inputProps
      : constrainDecimals === "scale-and-limit"
      ? info.inputProps
      : constrainDecimals === "scale"
      ? { decimalScale: info.inputProps.decimalScale }
      : {}

    return (
      <CurrencyInput
        {...derivedProps}
        {...props}
        ref={ref}
        symbol={info.symbol}
        code={info.code}
        value={
          active
            ? display
            : // Unit off: undefined stays undefined (the library's own
            // uncontrolled state), so a typed "0" is not blanked.
            value === null || value === undefined
            ? undefined
            : String(value)
        }
        onValueChange={(next, _name, values) => {
          if (!active) {
            onStoredValueChange({
              value: values?.value ?? "",
              float: values?.float ?? null,
            })
            return
          }

          const text = next ?? ""
          setDisplay(text)

          const stored = info.toStoredValue(text)
          onStoredValueChange({
            value: stored === null ? "" : String(stored),
            float: stored,
          })
        }}
      />
    )
  }
)
StoredCurrencyInput.displayName = "StoredCurrencyInput"
