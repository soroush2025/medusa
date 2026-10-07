import {
  CurrencyDisplayUnit,
  getCurrencyDisplayUnit,
} from "../../lib/data/currency-display-units"

const STORAGE_KEY = "medusa_admin_currency_display_units"

/**
 * A tiny external store so plain helper functions (getLocaleAmount and friends)
 * can read the preference synchronously during render, and React can subscribe
 * to it with useSyncExternalStore. localStorage can be absent (SSR, tests) or
 * throw (blocked storage, quota), so every access is guarded and the value
 * always stays correct in memory for the current session.
 *
 * There is deliberately no cross-tab sync: a storage event would remount the
 * app subtree of every other open tab and destroy unsaved form state. Other
 * tabs pick the preference up on their next load.
 */
let cached: boolean | undefined
const listeners = new Set<() => void>()

const readPersisted = (): boolean => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

export const isDisplayUnitsEnabled = (): boolean => {
  if (cached === undefined) {
    cached = readPersisted()
  }

  return cached
}

const notify = () => {
  listeners.forEach((listener) => listener())
}

export const setDisplayUnitsEnabled = (enabled: boolean): void => {
  const changed = isDisplayUnitsEnabled() !== enabled
  cached = enabled

  try {
    window.localStorage.setItem(STORAGE_KEY, String(enabled))
  } catch {
    // The preference stays in memory for this session.
  }

  if (changed) {
    notify()
  }
}

export const subscribeDisplayUnits = (listener: () => void): (() => void) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

/**
 * The display unit to use for a currency right now, or undefined when the
 * preference is off or the currency has no alternative unit.
 */
export const getActiveDisplayUnit = (
  currencyCode: string
): CurrencyDisplayUnit | undefined => {
  if (!currencyCode || !isDisplayUnitsEnabled()) {
    return undefined
  }

  return getCurrencyDisplayUnit(currencyCode)
}
