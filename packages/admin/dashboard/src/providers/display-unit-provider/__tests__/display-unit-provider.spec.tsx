// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useEffect } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { DisplayUnitProvider, useDisplayUnits } from ".."
import {
  isDisplayUnitsEnabled,
  setDisplayUnitsEnabled,
} from "../display-unit-store"

const mounted = vi.fn()

const Probe = () => {
  const { enabled, setEnabled } = useDisplayUnits()

  useEffect(() => {
    mounted()
  }, [])

  return (
    <button onClick={() => setEnabled(!enabled)}>{enabled ? "on" : "off"}</button>
  )
}

beforeEach(() => {
  window.localStorage.clear()
  setDisplayUnitsEnabled(false)
  mounted.mockClear()
})

afterEach(() => {
  cleanup()
})

describe("DisplayUnitProvider", () => {
  it("exposes the stored preference and lets a consumer change it", () => {
    render(
      <DisplayUnitProvider>
        <Probe />
      </DisplayUnitProvider>
    )

    expect(screen.getByRole("button").textContent).toBe("off")

    fireEvent.click(screen.getByRole("button"))

    expect(screen.getByRole("button").textContent).toBe("on")
    expect(isDisplayUnitsEnabled()).toBe(true)
  })

  it("remounts the subtree when the preference changes, so plain helper calls re-render", () => {
    render(
      <DisplayUnitProvider>
        <Probe />
      </DisplayUnitProvider>
    )
    expect(mounted).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByRole("button"))

    expect(mounted).toHaveBeenCalledTimes(2)
  })

  it("does not remount when the same value is set again", () => {
    render(
      <DisplayUnitProvider>
        <Probe />
      </DisplayUnitProvider>
    )

    act(() => {
      setDisplayUnitsEnabled(false)
    })

    expect(mounted).toHaveBeenCalledTimes(1)
  })

  it("follows a change made outside React", () => {
    render(
      <DisplayUnitProvider>
        <Probe />
      </DisplayUnitProvider>
    )

    act(() => {
      setDisplayUnitsEnabled(true)
    })

    expect(screen.getByRole("button").textContent).toBe("on")
  })

  it("throws a helpful error when the hook is used outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => render(<Probe />)).toThrow(
      "useDisplayUnits must be used within a DisplayUnitProvider"
    )

    spy.mockRestore()
  })
})
