import CurrencyInput, {
  CurrencyInputProps,
  formatValue,
} from "react-currency-input-field"
import { Controller, ControllerRenderProps } from "react-hook-form"

import { useCallback, useEffect, useState } from "react"
import { useCombinedRefs } from "../../../hooks/use-combined-refs"
import { useCurrencyInputInfo } from "../../../hooks/use-currency-input-info"
import { useDataGridCell, useDataGridCellError } from "../hooks"
import { DataGridCellProps, InputProps } from "../types"
import { DataGridCellContainer } from "./data-grid-cell-container"

export interface DataGridCurrencyCellProps<TData, TValue = any>
  extends DataGridCellProps<TData, TValue> {
  code: string
}

export const DataGridCurrencyCell = <TData, TValue = any>({
  context,
  code,
}: DataGridCurrencyCellProps<TData, TValue>) => {
  const { field, control, renderProps } = useDataGridCell({
    context,
  })
  const errorProps = useDataGridCellError({ context })

  const { container, input } = renderProps

  return (
    <Controller
      control={control}
      name={field}
      render={({ field }) => {
        return (
          <DataGridCellContainer {...container} {...errorProps}>
            <Inner field={field} inputProps={input} code={code} />
          </DataGridCellContainer>
        )
      }}
    />
  )
}

const Inner = ({
  field,
  inputProps,
  code,
}: {
  field: ControllerRenderProps<any, string>
  inputProps: InputProps
  code: string
}) => {
  const info = useCurrencyInputInfo(code)
  const { value, onChange: _, onBlur, ref, ...rest } = field
  const {
    ref: inputRef,
    onBlur: onInputBlur,
    onFocus,
    onChange,
    ...attributes
  } = inputProps

  const formatter = useCallback(
    (value?: string | number) => {
      const ensuredValue =
        typeof value === "number" ? value.toString() : value || ""

      return formatValue({
        value: ensuredValue,
        decimalScale: info.inputProps.decimalScale,
        disableGroupSeparators: true,
        decimalSeparator: ".",
      })
    },
    [info]
  )

  const [localValue, setLocalValue] = useState<string | number>(
    info.toDisplayValue(value) || ""
  )

  const handleValueChange: CurrencyInputProps["onValueChange"] = (
    value,
    _name,
    _values
  ) => {
    if (!value) {
      setLocalValue("")
      return
    }

    setLocalValue(value)
  }

  useEffect(() => {
    let update = value

    // The component we use is a bit fidly when the value is updated externally
    // so we need to ensure a format that will result in the cell being formatted correctly
    // according to the users locale on the next render. The stored value is
    // converted to the active display unit first (a no-op without one).
    if (!isNaN(Number(value))) {
      update = formatter(info.toDisplayValue(value))
    }

    setLocalValue(update)
  }, [value, formatter, info])

  const combinedRed = useCombinedRefs(inputRef, ref)

  return (
    <div className="relative flex size-full items-center">
      <span
        className="txt-compact-small text-ui-fg-muted pointer-events-none absolute start-0 w-fit min-w-4"
        aria-hidden
      >
        {info.symbol}
      </span>
      <CurrencyInput
        {...rest}
        {...attributes}
        ref={combinedRed}
        className="txt-compact-small w-full flex-1 cursor-default appearance-none bg-transparent ps-8 text-end outline-none"
        value={localValue || undefined}
        onValueChange={handleValueChange}
        formatValueOnBlur
        onBlur={() => {
          onBlur()
          onInputBlur()

          // Convert on blur: the grid and the form only ever hold stored units.
          onChange(info.toStoredText(localValue), value)
        }}
        onFocus={onFocus}
        {...info.inputProps}
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  )
}
