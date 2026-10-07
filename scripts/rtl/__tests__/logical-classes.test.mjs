import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { convertClassTokens } from "../logical-classes.mjs"

const convert = (s) => convertClassTokens(s).output

describe("convertClassTokens: rewrites", () => {
  const cases = [
    ["ml-2", "ms-2"],
    ["mr-auto", "me-auto"],
    ["pl-[31px]", "ps-[31px]"],
    ["pr-px", "pe-px"],
    ["-ml-px", "-ms-px"],
    ["last-of-type:-mr-1", "last-of-type:-me-1"],
    ["left-0", "start-0"],
    ["-right-2", "-end-2"],
    ["left-[calc(20px+24px)]", "start-[calc(20px+24px)]"],
    ["text-left", "text-start"],
    ["text-right", "text-end"],
    ["border-l", "border-s"],
    ["border-r-2", "border-e-2"],
    ["border-r-ui-border-base", "border-e-ui-border-base"],
    ["rounded-l-md", "rounded-s-md"],
    ["rounded-r", "rounded-e"],
    ["rounded-tl-lg", "rounded-ss-lg"],
    ["rounded-tr-lg", "rounded-se-lg"],
    ["rounded-bl-lg", "rounded-es-lg"],
    ["rounded-br-lg", "rounded-ee-lg"],
    ["scroll-ml-4", "scroll-ms-4"],
    ["scroll-pr-2", "scroll-pe-2"],
    ["!pl-2", "!ps-2"],
  ]
  for (const [from, to] of cases) {
    it(`${from} -> ${to}`, () => {
      assert.equal(convert(`"${from}"`), `"${to}"`)
    })
  }

  it("keeps variant prefixes, including arbitrary ones", () => {
    assert.equal(
      convert('"hover:ml-2 group-hover:pl-1"'),
      '"hover:ms-2 group-hover:ps-1"'
    )
    assert.equal(convert('"[&>*]:pl-2 md:right-0"'), '"[&>*]:ps-2 md:end-0"')
    assert.equal(
      convert('"[&_td:last-child]:pr-6 after:right-0"'),
      '"[&_td:last-child]:pe-6 after:end-0"'
    )
    assert.equal(
      convert('"data-[state=open]:ml-2"'),
      '"data-[state=open]:ms-2"'
    )
  })

  it("works in className attributes, template literals and clx/cva calls", () => {
    const src = [
      '<div className="flex ml-2 text-left" />',
      'const a = `px-2 ${x ? "pr-4" : ""} pl-1`',
      'clx("border-r px-2", { "pl-8": isSearch, "rounded-l-md": a })',
      'cva({ variants: { s: { a: "mr-1" } } })',
    ].join("\n")
    assert.equal(
      convert(src),
      [
        '<div className="flex ms-2 text-start" />',
        'const a = `px-2 ${x ? "pe-4" : ""} ps-1`',
        'clx("border-e px-2", { "ps-8": isSearch, "rounded-s-md": a })',
        'cva({ variants: { s: { a: "me-1" } } })',
      ].join("\n")
    )
  })

  it("is idempotent", () => {
    const once = convert('"ml-2 left-0 border-l rounded-tl-md"')
    assert.equal(convert(once), once)
  })
})

describe("convertClassTokens: left alone", () => {
  it("skips tokens under rtl: and ltr:", () => {
    const src = '"rtl:ml-2 ltr:pl-1 md:rtl:right-0 ltr:hover:text-left"'
    assert.equal(convert(src), src)
    assert.deepEqual(convertClassTokens(src).flagged, [])
  })

  it("does not touch non-class strings that merely look similar", () => {
    const src = [
      'import pad from "left-pad"',
      '<Panel id="left-panel" name="right-column" />',
      '<Drawer side="left" data-side="right" />',
      '"text-leftover" "border-light" "rounded-lg" "pl-other" "placeholder-x"',
      '"left" "right" "ml" "pl-"',
    ].join("\n")
    assert.equal(convert(src), src)
  })

  it("keeps the centering pair left-1/2 and left-[50%], and flags them", () => {
    const src =
      '"fixed left-1/2 -translate-x-1/2" "left-[50%] translate-x-[-50%]"'
    const { output, flagged } = convertClassTokens(src)
    assert.equal(output, src)
    assert.deepEqual(flagged, [
      "left-1/2",
      "-translate-x-1/2",
      "left-[50%]",
      "translate-x-[-50%]",
    ])
  })
})

describe("convertClassTokens: flagged only", () => {
  const flaggedCases = [
    "space-x-2",
    "-space-x-1",
    "divide-x",
    "divide-x-2",
    "translate-x-4",
    "data-[state=checked]:translate-x-3.5",
    "origin-left",
    "origin-top-right",
    "float-left",
    "clear-right",
    "bg-gradient-to-r",
    "slide-in-from-right",
    "data-[side=left]:-translate-x-1",
  ]
  for (const token of flaggedCases) {
    it(`flags ${token} without changing it`, () => {
      const src = `"flex ${token}"`
      const result = convertClassTokens(src)
      assert.equal(result.output, src)
      assert.deepEqual(result.flagged, [token])
    })
  }

  it("reports line numbers", () => {
    const { flaggedAt } = convertClassTokens('a\nb\n"space-x-2"')
    assert.deepEqual(flaggedAt, [{ token: "space-x-2", line: 3 }])
  })

  it("rewrites and flags in the same string", () => {
    const { output, flagged } = convertClassTokens('"ml-2 space-x-2"')
    assert.equal(output, '"ms-2 space-x-2"')
    assert.deepEqual(flagged, ["space-x-2"])
  })
})
