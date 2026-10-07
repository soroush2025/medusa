import { useCallback, useEffect, useState } from "react"
import {
  Control,
  Controller,
  ControllerRenderProps,
  useWatch,
} from "react-hook-form"
import CurrencyInput, {
  CurrencyInputProps,
  formatValue,
} from "react-currency-input-field"
import { currencies, CurrencyInfo } from "../../../../../lib/data/currencies"
import { TieredPriceControls } from "./tiered-price-controls"
import { DataGridCellContainer } from "../../../../../components/data-grid/components/data-grid-cell-container"
import {
  useDataGridCell,
  useDataGridCellError,
} from "../../../../../components/data-grid/hooks"
import {
  DataGridCellProps,
  InputProps,
} from "../../../../../components/data-grid/types"
import { useCombinedRefs } from "../../../../../hooks/use-combined-refs"
import { useCurrencyInputInfo } from "../../../../../hooks/use-currency-input-info"

export interface TieredPriceCellProps<TData, TValue = any>
  extends DataGridCellProps<TData, TValue> {
  code: string
  onOpenModal: (field: string, currency: CurrencyInfo) => void
  getTieredFieldName: (field: string) => string
}

export const TieredPriceCell = <TData, TValue = any>({
  context,
  code,
  onOpenModal,
  getTieredFieldName,
}: TieredPriceCellProps<TData, TValue>) => {
  const [symbolWidth, setSymbolWidth] = useState(0)

  const measuredRef = useCallback((node: HTMLSpanElement) => {
    if (node) {
      const width = node.offsetWidth
      setSymbolWidth(width)
    }
  }, [])

  const { field, control, renderProps } = useDataGridCell({
    context,
  })
  const errorProps = useDataGridCellError({ context })

  const { container, input } = renderProps
  const { isAnchor } = container
  const currency = currencies[code.toUpperCase()]

  return (
    <Controller
      control={control}
      name={field}
      render={({ field: props }) => {
        return (
          <DataGridCellContainer
            {...container}
            {...errorProps}
            outerComponent={
              <OuterComponent
                isAnchor={isAnchor}
                field={field}
                control={control}
                symbolWidth={symbolWidth}
                currency={currency}
                onOpenModal={onOpenModal}
                getTieredFieldName={getTieredFieldName}
              />
            }
          >
            <Inner
              field={props}
              inputProps={input}
              code={code}
              onMeasureSymbol={measuredRef}
            />
          </DataGridCellContainer>
        )
      }}
    />
  )
}

const OuterComponent = ({
  isAnchor,
  field,
  control,
  symbolWidth,
  currency,
  onOpenModal,
  getTieredFieldName,
}: {
  isAnchor: boolean
  field: string
  control: Control<any>
  symbolWidth: number
  currency: CurrencyInfo
  onOpenModal: (field: string, currency: CurrencyInfo) => void
  getTieredFieldName: (field: string) => string
}) => {
  const tieredFieldName = getTieredFieldName(field)
  const tiers = useWatch({ control, name: tieredFieldName })

  return (
    <TieredPriceControls
      isTiered={Array.isArray(tiers) && tiers.length > 0}
      isAnchor={isAnchor}
      symbolWidth={symbolWidth}
      onOpenModal={() => onOpenModal(field, currency)}
    />
  )
}

const Inner = ({
  field,
  onMeasureSymbol,
  inputProps,
  code,
}: {
  field: ControllerRenderProps<any, string>
  onMeasureSymbol: (node: HTMLSpanElement) => void
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

    // The stored value is converted to the active display unit first (a no-op
    // without one).
    if (!isNaN(Number(value))) {
      update = formatter(info.toDisplayValue(value))
    }

    setLocalValue(update)
  }, [value, formatter, info])

  const combinedRef = useCombinedRefs(inputRef, ref)

  return (
    <div className="relative flex size-full items-center">
      <span
        className="txt-compact-small text-ui-fg-muted pointer-events-none absolute start-0 w-fit min-w-4"
        aria-hidden
        ref={onMeasureSymbol}
      >
        {info.symbol}
      </span>
      <CurrencyInput
        {...rest}
        {...attributes}
        ref={combinedRef}
        className="txt-compact-small w-full flex-1 cursor-default appearance-none bg-transparent ps-[60px] text-end outline-none"
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
