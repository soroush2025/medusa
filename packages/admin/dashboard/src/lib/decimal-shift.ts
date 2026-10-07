/**
 * Normalises a user-visible numeric string to ASCII digits with "." as the only
 * decimal separator, or null when it is not a number. Accepts Persian (U+06F0..)
 * and Arabic-Indic (U+0660..) digits, the Arabic decimal separator (U+066B), and
 * drops grouping separators, whitespace and bidi marks.
 */
export const normalizeNumericInput = (input: string): string | null => {
  const ascii = input
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/٫/g, ".")
    .replace(/[٬,\s‎‏]/g, "")

  const match = /^(-?)(\d*)(?:\.(\d*))?$/.exec(ascii)

  if (!match || (!match[2] && !match[3])) {
    return null
  }

  const fraction = match[3] ? `.${match[3]}` : ""

  return `${match[1]}${match[2] || "0"}${fraction}`
}

/**
 * Moves the decimal point of a normalised numeric string by `places` places:
 * positive moves it left (divide by 10^places), negative moves it right. Works
 * on the digits, so there is no floating point error.
 */
export const shiftDecimalPoint = (value: string, places: number): string => {
  const negative = value.startsWith("-")
  const [int, fraction = ""] = (negative ? value.slice(1) : value).split(".")

  let digits = int + fraction
  let point = int.length - places

  if (point <= 0) {
    digits = "0".repeat(1 - point) + digits
    point = 1
  } else if (point > digits.length) {
    digits = digits + "0".repeat(point - digits.length)
  }

  const intPart = digits.slice(0, point).replace(/^0+(?=\d)/, "")
  const fractionPart = digits.slice(point).replace(/0+$/, "")
  const result = fractionPart ? `${intPart}.${fractionPart}` : intPart

  return negative && Number(result) !== 0 ? `-${result}` : result
}
