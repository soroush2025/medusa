export type TextDirection = "ltr" | "rtl"

/**
 * Translates a physically pressed horizontal arrow key into the key that
 * moves "along the reading direction" in a layout that is written for LTR.
 *
 * Logical models (the data grid matrix, a list that expands on "ArrowRight")
 * treat ArrowRight as "next". In an RTL document, next is visually to the left,
 * so the physical ArrowLeft must be read as ArrowRight and vice versa.
 *
 * Vertical arrows and every other key are returned unchanged. A missing
 * direction (no `dir` attribute on <html>) behaves as LTR.
 */
export const toVisualArrowKey = (
  key: string,
  direction: TextDirection | undefined
): string => {
  if (direction !== "rtl") {
    return key
  }

  if (key === "ArrowLeft") {
    return "ArrowRight"
  }

  if (key === "ArrowRight") {
    return "ArrowLeft"
  }

  return key
}
