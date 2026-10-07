"use client"

import { Direction } from "radix-ui"
import * as React from "react"
import {
  I18nProvider as Primitive,
  I18nProviderProps as Props,
  useLocale,
} from "react-aria"

interface I18nProviderProps extends Props {}

/**
 * Reads the direction react-aria derived from the locale and hands it to
 * Radix, so Select, DropdownMenu, Tooltip, Popover, Tabs, RadioGroup and the
 * other Radix primitives inherit it. It must render inside react-aria's
 * provider, otherwise `useLocale` would see the browser locale.
 */
const DirectionBridge = ({ children }: { children?: React.ReactNode }) => {
  const { direction } = useLocale()

  return <Direction.Provider dir={direction}>{children}</Direction.Provider>
}

const I18nProvider = ({ children, ...props }: I18nProviderProps) => {
  return (
    <Primitive {...props}>
      <DirectionBridge>{children}</DirectionBridge>
    </Primitive>
  )
}

export { I18nProvider }
