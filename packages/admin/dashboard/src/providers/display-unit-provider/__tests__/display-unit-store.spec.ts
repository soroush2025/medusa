// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const STORAGE_KEY = "medusa_admin_currency_display_units"

// The store caches its value at module level, so every test gets a fresh copy.
const loadStore = async () => {
  vi.resetModules()
  return import("../display-unit-store")
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  window.localStorage.clear()
})

describe("display unit store", () => {
  it("is off by default", async () => {
    const store = await loadStore()
    expect(store.isDisplayUnitsEnabled()).toBe(false)
    expect(store.getActiveDisplayUnit("irr")).toBeUndefined()
  })

  it("reads a persisted preference", async () => {
    window.localStorage.setItem(STORAGE_KEY, "true")
    const store = await loadStore()
    expect(store.isDisplayUnitsEnabled()).toBe(true)
  })

  it("treats any other persisted value as off", async () => {
    window.localStorage.setItem(STORAGE_KEY, "yes")
    const store = await loadStore()
    expect(store.isDisplayUnitsEnabled()).toBe(false)
  })

  it("persists the preference under the documented key", async () => {
    const store = await loadStore()
    store.setDisplayUnitsEnabled(true)
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("true")
    store.setDisplayUnitsEnabled(false)
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("false")
  })

  it("returns the unit only when enabled and only for currencies that have one", async () => {
    const store = await loadStore()
    expect(store.getActiveDisplayUnit("irr")).toBeUndefined()

    store.setDisplayUnitsEnabled(true)
    expect(store.getActiveDisplayUnit("irr")?.code).toBe("IRT")
    expect(store.getActiveDisplayUnit("IRR")?.code).toBe("IRT")
    expect(store.getActiveDisplayUnit("usd")).toBeUndefined()
    expect(store.getActiveDisplayUnit("")).toBeUndefined()
  })

  it("notifies subscribers when the preference changes, not when it is set to the same value", async () => {
    const store = await loadStore()
    const listener = vi.fn()
    const unsubscribe = store.subscribeDisplayUnits(listener)

    store.setDisplayUnitsEnabled(true)
    expect(listener).toHaveBeenCalledTimes(1)

    store.setDisplayUnitsEnabled(true)
    expect(listener).toHaveBeenCalledTimes(1)

    store.setDisplayUnitsEnabled(false)
    expect(listener).toHaveBeenCalledTimes(2)

    unsubscribe()
    store.setDisplayUnitsEnabled(true)
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it("notifies every subscriber", async () => {
    const store = await loadStore()
    const a = vi.fn()
    const b = vi.fn()
    store.subscribeDisplayUnits(a)
    store.subscribeDisplayUnits(b)

    store.setDisplayUnitsEnabled(true)

    expect(a).toHaveBeenCalledTimes(1)
    expect(b).toHaveBeenCalledTimes(1)
  })

  it("does not react to storage events, so another tab never remounts this one", async () => {
    const store = await loadStore()
    const listener = vi.fn()
    store.subscribeDisplayUnits(listener)
    expect(store.isDisplayUnitsEnabled()).toBe(false)

    window.localStorage.setItem(STORAGE_KEY, "true")
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }))
    window.dispatchEvent(new StorageEvent("storage", { key: null }))

    expect(listener).not.toHaveBeenCalled()
    expect(store.isDisplayUnitsEnabled()).toBe(false)
  })

  describe("when localStorage is unavailable", () => {
    it("works in memory when localStorage is absent", async () => {
      vi.stubGlobal("localStorage", undefined)
      const store = await loadStore()
      const listener = vi.fn()
      store.subscribeDisplayUnits(listener)

      expect(store.isDisplayUnitsEnabled()).toBe(false)
      expect(() => store.setDisplayUnitsEnabled(true)).not.toThrow()
      expect(store.isDisplayUnitsEnabled()).toBe(true)
      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("falls back to off when reading throws", async () => {
      vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("denied")
      })
      const store = await loadStore()
      expect(store.isDisplayUnitsEnabled()).toBe(false)
    })

    it("keeps the preference in memory and still notifies when writing throws", async () => {
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("quota")
      })
      const store = await loadStore()
      const listener = vi.fn()
      store.subscribeDisplayUnits(listener)

      expect(() => store.setDisplayUnitsEnabled(true)).not.toThrow()
      expect(store.isDisplayUnitsEnabled()).toBe(true)
      expect(listener).toHaveBeenCalledTimes(1)
    })
  })
})
