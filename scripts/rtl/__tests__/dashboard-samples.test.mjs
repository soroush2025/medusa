import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { convertClassTokens } from "../logical-classes.mjs"

const convert = (source) => convertClassTokens(source)

describe("dashboard samples: converted", () => {
  it("converts nav-item padding, including a clx object key", () => {
    const { output } = convert(
      `const A = "flex gap-x-2 rounded-md py-0.5 pl-0.5 pr-2 outline-none"
const B = { "pl-2": isSetting }
const C = "pl-[34px] pr-2 py-1 w-full"`
    )
    assert.equal(
      output,
      `const A = "flex gap-x-2 rounded-md py-0.5 ps-0.5 pe-2 outline-none"
const B = { "ps-2": isSetting }
const C = "ps-[34px] pe-2 py-1 w-full"`
    )
  })

  it("converts negative and arbitrary values", () => {
    const { output } = convert(
      `x("-ml-[5px] -mr-[7px] w-[60px] pr-[7px] -right-[5px] -right-2")`
    )
    assert.equal(
      output,
      `x("-ms-[5px] -me-[7px] w-[60px] pe-[7px] -end-[5px] -end-2")`
    )
  })

  it("converts variant-prefixed tokens, keeping the prefix", () => {
    const { output } = convert(
      `x("lg:border-l after:right-0 last:border-r group-hover/row:ml-2 [&>*]:pl-2 data-[state=open]:mr-1")`
    )
    assert.equal(
      output,
      `x("lg:border-s after:end-0 last:border-e group-hover/row:ms-2 [&>*]:ps-2 data-[state=open]:me-1")`
    )
  })

  it("converts the chat-bubble corners and text alignment", () => {
    const { output } = convert(
      `x("w-fit rounded-r-2xl rounded-bl-md rounded-tl-xl px-3 text-left text-right")`
    )
    assert.equal(
      output,
      `x("w-fit rounded-e-2xl rounded-es-md rounded-ss-xl px-3 text-start text-end")`
    )
  })

  it("converts the absolute left-[1100px] origin of the workflow canvas (reverted by hand)", () => {
    const { output } = convert(
      `x("absolute left-[1100px] top-[1100px] flex select-none items-start")`
    )
    assert.equal(
      output,
      `x("absolute start-[1100px] top-[1100px] flex select-none items-start")`
    )
  })

  it("converts inside template literals and clx() argument lists", () => {
    const { output } = convert(
      "clx(`absolute ${open ? \"right-0\" : \"left-0\"} top-0`, \"pl-8 text-right\")"
    )
    assert.equal(
      output,
      "clx(`absolute ${open ? \"end-0\" : \"start-0\"} top-0`, \"ps-8 text-end\")"
    )
  })
})

describe("dashboard samples: untouched", () => {
  it("leaves code and prose that only contains the words alone", () => {
    const source = `const s = {
  left: [columns[0].id!],
  right: isPinned === "right" ? 1 : undefined,
}
const t = column.getStart("left")
const u = { float: values?.float ?? null }
// Currency columns should be right-aligned
const v = "right-aligned"`
    const { output } = convert(source)
    assert.equal(output, source)
  })

  it("leaves bg-right, justify-end and already logical classes alone", () => {
    const source = `x("bg-right bg-repeat-y justify-end text-end ps-2 me-1 start-0.5 end-0 rounded-s border-e")`
    assert.equal(convert(source).output, source)
  })

  it("leaves tokens under rtl: and ltr: alone", () => {
    const source = `x("ltr:ml-2 rtl:mr-2 rtl:rotate-180 mt-[2px] rtl:pl-3")`
    const { output } = convert(source)
    assert.equal(output, source)
  })
})

describe("dashboard samples: kept or flagged, not rewritten", () => {
  it("keeps the viewport-centring pairs and flags both halves", () => {
    const source = `x("fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]")
y("inset-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2")`
    const { output, flagged } = convert(source)
    assert.equal(output, source)
    assert.deepEqual(flagged, [
      "left-[50%]",
      "translate-x-[-50%]",
      "left-1/2",
      "-translate-x-1/2",
    ])
  })

  it("flags divide-x and origin-top-left without changing them", () => {
    const source = `x("grid grid-cols-2 divide-x")
y("relative origin-top-left")`
    const { output, flaggedAt } = convert(source)
    assert.equal(output, source)
    assert.deepEqual(flaggedAt, [
      { token: "divide-x", line: 1 },
      { token: "origin-top-left", line: 2 },
    ])
  })
})
