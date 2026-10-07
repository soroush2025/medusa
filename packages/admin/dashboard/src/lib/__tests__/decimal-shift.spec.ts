import { describe, expect, it } from "vitest"
import { normalizeNumericInput, shiftDecimalPoint } from "../decimal-shift"

describe("normalizeNumericInput", () => {
  it.each([
    ["1250000", "1250000"],
    ["125.5", "125.5"],
    ["12.", "12"],
    [".5", "0.5"],
    ["-3", "-3"],
    ["1,000.5", "1000.5"],
    [" 1 250 ", "1250"],
  ])("accepts %s as %s", (input, expected) => {
    expect(normalizeNumericInput(input)).toBe(expected)
  })

  it.each([
    ["۱۲۵٬۰۰۰", "125000"],
    ["۱۲۵٫۵", "125.5"],
    ["١٢٥", "125"],
    ["١٢٫٥", "12.5"],
    ["‎۱۲۵", "125"],
  ])(
    "normalises Persian and Arabic-Indic input %s to %s",
    (input, expected) => {
      expect(normalizeNumericInput(input)).toBe(expected)
    }
  )

  it.each([[""], ["abc"], ["1.2.3"], ["-"], ["."], ["12abc"], ["--1"]])(
    "rejects %j",
    (input) => {
      expect(normalizeNumericInput(input)).toBeNull()
    }
  )
})

describe("shiftDecimalPoint", () => {
  it.each([
    ["1250000", 1, "125000"],
    ["1255", 1, "125.5"],
    ["5", 1, "0.5"],
    ["5", 2, "0.05"],
    ["0", 1, "0"],
    ["-1255", 1, "-125.5"],
    ["12.5", 1, "1.25"],
    ["100", 1, "10"],
    ["10", 1, "1"],
  ])("moves the point of %s left by %i to %s", (value, places, expected) => {
    expect(shiftDecimalPoint(value, places)).toBe(expected)
  })

  it.each([
    ["125", -1, "1250"],
    ["12", -3, "12000"],
    ["0.7", -1, "7"],
    ["1.1", -1, "11"],
    ["1.15", -1, "11.5"],
    ["0.05", -1, "0.5"],
  ])(
    "moves the point of %s right by %i to %s without float noise",
    (value, places, expected) => {
      expect(shiftDecimalPoint(value, places)).toBe(expected)
    }
  )

  it("never returns negative zero", () => {
    expect(shiftDecimalPoint("-0", 1)).toBe("0")
  })
})
