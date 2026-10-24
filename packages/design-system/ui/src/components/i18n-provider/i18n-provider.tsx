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

/**
 * Provides the locale to react-aria and the locale direction to Radix.
 *
 * Radix's `Direction.Provider` only sets a React context value. It does not
 * set a `dir` attribute on the DOM. Tailwind's `rtl:` variant matches any
 * element that has a `[dir="rtl"]` ancestor, so it also matches inside a
 * `dir="ltr"` island nested in an RTL page. For that reason, a `dir="ltr"`
 * island must not contain components that rely on plain `rtl:` classes, and
 * the ui components that mirror themselves use the `[&:dir(rtl)]:` variant
 * instead, which follows the element's own direction.
 */
const I18nProvider = ({ children, ...props }: I18nProviderProps) => {
  return (
    <Primitive {...props}>
      <DirectionBridge>{children}</DirectionBridge>
    </Primitive>
  )
}

export { I18nProvider }
