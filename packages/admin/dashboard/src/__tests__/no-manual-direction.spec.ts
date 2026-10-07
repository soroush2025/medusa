import fs from "fs"
import path from "path"
import { describe, expect, it } from "vitest"

const SRC_DIR = path.join(__dirname, "..")

const collectTsxFiles = (dir: string): string[] => {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return entry.name === "__tests__" || entry.name === "node_modules"
        ? []
        : collectTsxFiles(fullPath)
    }

    return entry.name.endsWith(".tsx") ? [fullPath] : []
  })
}

describe("manual direction props", () => {
  const files = collectTsxFiles(SRC_DIR)

  it("scans the dashboard sources", () => {
    expect(files.length).toBeGreaterThan(500)
  })

  it("no component passes dir={direction}; the ui I18nProvider provides it", () => {
    const offenders = files
      .filter((file) => fs.readFileSync(file, "utf-8").includes("dir={direction}"))
      .map((file) => path.relative(SRC_DIR, file))

    expect(offenders).toEqual([])
  })

  it("only literal ltr is passed as a dir prop", () => {
    const offenders = files
      .filter((file) => /\sdir=\{(?!"ltr"\})/.test(fs.readFileSync(file, "utf-8")))
      .map((file) => path.relative(SRC_DIR, file))

    expect(offenders).toEqual([])
  })
})
