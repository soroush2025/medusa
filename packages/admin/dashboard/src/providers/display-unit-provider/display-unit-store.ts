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
 */
let cached: boolean | undefined
const listeners = new Set<() => void>()
let storageHandlerInstalled = false

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

// One handler for all subscribers: it must reset the cache once, then notify
// everybody, otherwise the second subscriber would see no change.
const onStorage = (event: StorageEvent) => {
  if (event.key !== null && event.key !== STORAGE_KEY) {
    return
  }

  const previous = cached
  cached = undefined

  if (isDisplayUnitsEnabled() !== previous) {
    notify()
  }
}

const installStorageHandler = () => {
  if (
    storageHandlerInstalled ||
    typeof window === "undefined" ||
    typeof window.addEventListener !== "function"
  ) {
    return
  }

  window.addEventListener("storage", onStorage)
  storageHandlerInstalled = true
}

const removeStorageHandler = () => {
  if (!storageHandlerInstalled) {
    return
  }

  window.removeEventListener("storage", onStorage)
  storageHandlerInstalled = false
}

export const subscribeDisplayUnits = (listener: () => void): (() => void) => {
  listeners.add(listener)
  installStorageHandler()

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      removeStorageHandler()
    }
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
