import { render } from "@testing-library/react"
import * as React from "react"

import { Tabs } from "../tabs"
import { I18nProvider } from "./i18n-provider"

const renderTabs = (locale: string) =>
  render(
    <I18nProvider locale={locale}>
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="one">Body</Tabs.Content>
      </Tabs>
    </I18nProvider>
  )

describe("I18nProvider", () => {
  it("gives Radix primitives dir=rtl for a right-to-left locale", () => {
    const { container } = renderTabs("fa-IR")

    expect(container.firstElementChild).toHaveAttribute("dir", "rtl")
  })

  it("keeps dir=rtl when the locale carries a calendar extension", () => {
    const { container } = renderTabs("fa-IR-u-ca-persian")

    expect(container.firstElementChild).toHaveAttribute("dir", "rtl")
  })

  it("gives Radix primitives dir=ltr for a left-to-right locale", () => {
    const { container } = renderTabs("en-US")

    expect(container.firstElementChild).toHaveAttribute("dir", "ltr")
  })

  it("renders its children", () => {
    const { getByText } = renderTabs("en-US")

    expect(getByText("Body")).toBeInTheDocument()
  })
})
