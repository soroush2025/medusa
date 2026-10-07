// Brings Vite's ambient module declarations into scope, notably
// `declare module "*.css"`, so the side-effect import below typechecks. Needed
// here because triple-slash references are file-scoped and this package's
// tsconfig sets no `types`, so the reference in `vite.config.ts` doesn't apply.
/// <reference types="vite/client" />

import { withThemeByDataAttribute } from "@storybook/addon-themes"
import type { Decorator, Preview } from "@storybook/react"
import * as React from "react"

import { I18nProvider } from "../src/components/i18n-provider"
import "../src/main.css"

const withDirection: Decorator = (Story, context) => {
  const direction = context.globals.direction === "rtl" ? "rtl" : "ltr"

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction)
  }, [direction])

  return (
    <I18nProvider locale={direction === "rtl" ? "fa-IR" : "en-US"}>
      <Story />
    </I18nProvider>
  )
}

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      Light: "light",
      Dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-mode",
  }),
  withDirection,
]

const preview: Preview = {
  globalTypes: {
    direction: {
      description: "Text direction",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "Left to right (en-US)" },
          { value: "rtl", title: "Right to left (fa-IR)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    direction: "ltr",
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
