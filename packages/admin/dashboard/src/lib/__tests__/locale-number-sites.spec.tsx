// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import i18n from "i18next"
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n }),
}))

import { ImportSummary } from "../../routes/products/product-import/components/import-summary"
import { DISPLAY_STRATEGIES } from "../table-display-utils"
import { getCellRenderer } from "../table/cell-renderers"

describe("number sites follow the active intl_locale", () => {
  beforeAll(async () => {
    await i18n.init({ lng: "en", resources: {} })
  })

  afterEach(() => {
    cleanup()
  })

  afterAll(async () => {
    await i18n.changeLanguage("en")
  })

  it("DISPLAY_STRATEGIES.number.default uses Persian digits for fa and the default locale otherwise", async () => {
    await i18n.changeLanguage("fa")
    expect(DISPLAY_STRATEGIES.number.default(1234567)).toBe("۱٬۲۳۴٬۵۶۷")

    await i18n.changeLanguage("en")
    expect(DISPLAY_STRATEGIES.number.default(1234567)).toBe(
      (1234567).toLocaleString()
    )
  })

  it("DISPLAY_STRATEGIES.number.default keeps the zero fallback for missing values", async () => {
    await i18n.changeLanguage("fa")

    expect(DISPLAY_STRATEGIES.number.default(undefined)).toBe("0")
    expect(DISPLAY_STRATEGIES.number.default(null)).toBe("0")
    // A real zero is formatted, so fa gets the Persian digit.
    expect(DISPLAY_STRATEGIES.number.default(0)).toBe("۰")
  })

  it("the table number renderer uses Persian digits for fa", async () => {
    await i18n.changeLanguage("fa")
    const { render: renderNumber } = getCellRenderer("number")

    expect(
      renderNumber(1234567, {}, {} as never, ((key: string) => key) as never)
    ).toBe("۱٬۲۳۴٬۵۶۷")
  })

  it("the table number renderer keeps the placeholder for empty values", async () => {
    await i18n.changeLanguage("fa")
    const { render: renderNumber } = getCellRenderer("number")

    expect(
      renderNumber(null, {}, {} as never, ((key: string) => key) as never)
    ).toBe("-")
  })

  it("ImportSummary renders Persian digits for fa", async () => {
    await i18n.changeLanguage("fa")

    render(
      <ImportSummary summary={{ toCreate: 1200, toUpdate: 34 } as never} />
    )

    expect(screen.getByText("۱٬۲۰۰")).toBeTruthy()
    expect(screen.getByText("۳۴")).toBeTruthy()
  })
})
