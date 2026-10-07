#!/usr/bin/env node
// Rewrites physical-direction Tailwind classes to logical ones (RTL support).
// Usage: node scripts/rtl/logical-classes.mjs [--dry-run] <dir> [<dir>...]
import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

// A spacing/size value Tailwind accepts after `ml-`, `left-`, ... Anything else
// (for example `left-panel`) is not a class and is left alone.
const SIZE = String.raw`(?:\d+(?:\.\d+)?|px|auto|full|\d+\/\d+|\[\S+\])`

const SIDE = { l: "s", r: "e" }
const CORNER = { l: "s", r: "e", tl: "ss", tr: "se", bl: "es", br: "ee" }

// Each rule maps an utility (variants and `!` already removed) to its logical
// form, or returns null when it does not apply.
const REWRITES = [
  // ml-2, -mr-px, pl-[3px], scroll-ml-4, scroll-pr-2
  (u) => {
    const m = u.match(new RegExp(`^(-?)(scroll-)?(m|p)(l|r)-(${SIZE})$`))
    return m ? `${m[1]}${m[2] ?? ""}${m[3]}${SIDE[m[4]]}-${m[5]}` : null
  },
  // left-0, -right-2, left-[calc(...)]; the centering pair left-1/2 is kept
  (u) => {
    const m = u.match(new RegExp(`^(-?)(left|right)-(${SIZE})$`))
    if (!m || isCentering(u)) {
      return null
    }
    return `${m[1]}${m[2] === "left" ? "start" : "end"}-${m[3]}`
  },
  (u) => {
    const m = u.match(/^text-(left|right)$/)
    return m ? `text-${m[1] === "left" ? "start" : "end"}` : null
  },
  // border-l, border-r-2, border-l-ui-border-base
  (u) => {
    const m = u.match(/^border-(l|r)(-.+)?$/)
    return m ? `border-${SIDE[m[1]]}${m[2] ?? ""}` : null
  },
  // rounded-l, rounded-tr-md (rounded-lg does not match)
  (u) => {
    const m = u.match(/^rounded-(l|r|tl|tr|bl|br)(-.+)?$/)
    return m ? `rounded-${CORNER[m[1]]}${m[2] ?? ""}` : null
  },
]

function isCentering(utility) {
  return /^-?(left|right)-(1\/2|\[50%\])$/.test(utility)
}

// Utilities that have no logical twin or need a paired change. Reported only.
const FLAG_UTILITY = [
  /^-?space-x-/,
  /^divide-x(-|$)/,
  /^-?translate-x-/,
  /^origin-(left|right|top-left|top-right|bottom-left|bottom-right)$/,
  /^float-(left|right)$/,
  /^clear-(left|right)$/,
  /^bg-gradient-to-(l|r|tl|tr|bl|br)$/,
  /^(slide-in-from|slide-out-to)-(left|right)/,
  /^-?(left|right)-(1\/2|\[50%\])$/,
]
const FLAG_TOKEN = [/side=(left|right)/]

// Splits "hover:[&>*]:ml-2" into ["hover:[&>*]:", "ml-2"] at the last colon
// that is outside brackets and parentheses.
function splitVariants(token) {
  let depth = 0
  let last = -1
  for (let i = 0; i < token.length; i++) {
    const c = token[i]
    if (c === "[" || c === "(") {
      depth++
    } else if (c === "]" || c === ")") {
      depth--
    } else if (c === ":" && depth === 0) {
      last = i
    }
  }
  return last === -1
    ? ["", token]
    : [token.slice(0, last + 1), token.slice(last + 1)]
}

const DIRECTION_VARIANT = /(^|:)(rtl|ltr):|\[dir=(rtl|ltr)\]/

function convertToken(token) {
  const [prefix, rest] = splitVariants(token)
  if (DIRECTION_VARIANT.test(prefix)) {
    return { token, flagged: false }
  }
  const important = rest.startsWith("!") ? "!" : ""
  const utility = rest.slice(important.length)
  for (const rewrite of REWRITES) {
    const next = rewrite(utility)
    if (next !== null) {
      return { token: `${prefix}${important}${next}`, flagged: false }
    }
  }
  const flagged =
    FLAG_UTILITY.some((re) => re.test(utility)) ||
    FLAG_TOKEN.some((re) => re.test(token))
  return { token, flagged }
}

// A class-like token starts after the start of the text, whitespace, a quote or
// a backtick, and ends before the next one of those.
const TOKEN = /(?<![^\s"'`])[^\s"'`]+/g

/**
 * @param {string} source
 * @returns {{ output: string, flagged: string[], flaggedAt: Array<{ token: string, line: number }> }}
 */
export function convertClassTokens(source) {
  const flagged = []
  const flaggedAt = []
  const output = source.replace(TOKEN, (match, offset) => {
    const result = convertToken(match)
    if (result.flagged) {
      flagged.push(match)
      const line = source.slice(0, offset).split("\n").length
      flaggedAt.push({ token: match, line })
    }
    return result.token
  })
  return { output, flagged, flaggedAt }
}

function isSkipped(name) {
  return /\.(spec|test|stories)\./.test(name)
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (["__tests__", "node_modules", "dist"].includes(entry.name)) {
        continue
      }
      yield* walk(full)
    } else if (/\.(ts|tsx)$/.test(entry.name) && !isSkipped(entry.name)) {
      yield full
    }
  }
}

export function run(argv) {
  const dryRun = argv.includes("--dry-run")
  const dirs = argv.filter((a) => !a.startsWith("--"))
  if (!dirs.length) {
    console.error(
      "usage: node scripts/rtl/logical-classes.mjs [--dry-run] <dir>..."
    )
    return 1
  }
  let changed = 0
  let flaggedCount = 0
  for (const dir of dirs) {
    for (const file of walk(dir)) {
      const source = fs.readFileSync(file, "utf8")
      const { output, flaggedAt } = convertClassTokens(source)
      if (output !== source) {
        changed++
        console.log(`changed: ${file}`)
        if (!dryRun) {
          fs.writeFileSync(file, output)
        }
      }
      for (const f of flaggedAt) {
        flaggedCount++
        console.log(`flagged: ${file}:${f.line}  ${f.token}`)
      }
    }
  }
  console.log(
    `${changed} file(s) ${
      dryRun ? "would change" : "changed"
    }, ${flaggedCount} token(s) flagged for hand review`
  )
  return 0
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  process.exit(run(process.argv.slice(2)))
}
