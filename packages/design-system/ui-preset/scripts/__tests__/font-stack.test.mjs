import assert from "node:assert/strict"
import { readFileSync, statSync } from "node:fs"
import { describe, it } from "node:test"

const here = (relative) => new URL(relative, import.meta.url)

const presetConstants = await import(here("../../src/constants.ts").href)
const toolboxConstants = await import(
  here("../../../toolbox/src/constants.ts").href
)
const { typography } = await import(
  here("../../src/theme/tokens/typography.ts").href
)

const fontsDir = "../../../../admin/dashboard/src/assets/fonts/"
const cssPath = "../../../../admin/dashboard/src/index.css"
const MAX_BYTES = 60 * 1024

describe("Vazirmatn font stack", () => {
  it("ui-preset FONT_FAMILY_SANS has Vazirmatn right after Inter", () => {
    assert.equal(presetConstants.FONT_FAMILY_SANS[0], "Inter")
    assert.equal(presetConstants.FONT_FAMILY_SANS[1], "Vazirmatn")
  })

  it("toolbox FONT_FAMILY_SANS matches the ui-preset one", () => {
    assert.deepEqual(toolboxConstants.FONT_FAMILY_SANS.slice(0, 3), [
      "Inter",
      "Vazirmatn",
      "ui-sans-serif",
    ])
    assert.equal(toolboxConstants.FONT_FAMILY_SANS[1], "Vazirmatn")
  })

  it("mono stacks do not contain Vazirmatn", () => {
    assert.ok(!presetConstants.FONT_FAMILY_MONO.includes("Vazirmatn"))
    assert.ok(!toolboxConstants.FONT_FAMILY_MONO.includes("Vazirmatn"))
  })

  it("every typography stack is consistent with the constants", () => {
    const stacks = Object.values(typography).map((entry) => entry.fontFamily)
    const sans = stacks.filter((stack) => stack.startsWith("Inter, "))
    const mono = stacks.filter((stack) => stack.startsWith("Roboto Mono, "))

    assert.equal(stacks.length, 35)
    assert.equal(sans.length, 31)
    assert.equal(mono.length, 4)

    for (const stack of sans) {
      assert.ok(
        stack.startsWith("Inter, Vazirmatn, ui-sans-serif, "),
        `sans stack lacks Vazirmatn after Inter: ${stack}`
      )
    }

    for (const stack of mono) {
      assert.ok(
        !stack.includes("Vazirmatn"),
        `mono stack has Vazirmatn: ${stack}`
      )
    }
  })

  it("dashboard declares Vazirmatn 400 and 500 with unicode-range", () => {
    const css = readFileSync(here(cssPath), "utf8")
    const blocks = css
      .split("@font-face")
      .filter((block) => block.includes('font-family: "Vazirmatn"'))

    assert.equal(blocks.length, 2)

    for (const weight of ["400", "500"]) {
      const block = blocks.find((b) => b.includes(`font-weight: ${weight};`))
      assert.ok(block, `no Vazirmatn @font-face for weight ${weight}`)
      assert.match(block, /format\("woff2"\)/)
      assert.match(block, /font-display: swap;/)
      assert.match(
        block,
        /unicode-range:\s*U\+0600-06FF,\s*U\+0750-077F,\s*U\+FB50-FDFF,\s*U\+FE70-FEFF,\s*U\+200C-200F;/
      )
    }
  })

  it("font files exist, are under 60 KB each, and the OFL ships with them", () => {
    for (const file of ["Vazirmatn-Regular.woff2", "Vazirmatn-Medium.woff2"]) {
      const { size } = statSync(here(fontsDir + file))
      assert.ok(size > 1000 && size < MAX_BYTES, `${file} is ${size} bytes`)
    }

    const license = readFileSync(here(fontsDir + "Vazirmatn-OFL.txt"), "utf8")
    assert.match(license, /SIL Open Font License, Version 1\.1/)
    assert.match(license, /The Vazirmatn Project Authors/)
  })
})
