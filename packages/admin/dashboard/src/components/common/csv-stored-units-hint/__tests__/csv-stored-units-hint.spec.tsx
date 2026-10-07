// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

import { DisplayUnitProvider } from "../../../../providers/display-unit-provider"
import { setDisplayUnitsEnabled } from "../../../../providers/display-unit-provider/display-unit-store"
import { CsvStoredUnitsHint } from "../csv-stored-units-hint"

beforeEach(() => {
  setDisplayUnitsEnabled(false)
})

afterEach(() => {
  cleanup()
  setDisplayUnitsEnabled(false)
})

describe("CsvStoredUnitsHint", () => {
  it("renders nothing while the display unit is off", () => {
    const { container } = render(
      <DisplayUnitProvider>
        <CsvStoredUnitsHint />
      </DisplayUnitProvider>
    )
    expect(container.textContent).toBe("")
  })

  it("explains that CSV amounts stay in the stored unit while the display unit is on", () => {
    setDisplayUnitsEnabled(true)
    render(
      <DisplayUnitProvider>
        <CsvStoredUnitsHint />
      </DisplayUnitProvider>
    )
    expect(screen.getByText("general.csvStoredUnitsHint")).toBeTruthy()
  })
})
