// RTL guard config.
//
// Runs ONLY the physical-direction class ban defined in the root
// `.eslintrc.js` (the `no-restricted-syntax` override), so a run reports only
// RTL violations. The packages it covers are excluded from the normal
// `yarn lint` by `.eslintignore` (which also keeps their unrelated style
// problems out), hence `--no-ignore` in the script.
//
// Used by the `lint:rtl` npm script (and CI):
//   eslint --no-eslintrc --config eslint.rtl.cjs --no-ignore --ext .ts,.tsx <dirs>
const root = require("./.eslintrc.js")

// An override that only configures the parser (no `rules`), kept so TypeScript
// files still parse.
const isRuleless = (o) => !o.rules || Object.keys(o.rules).length === 0

// An override whose only rule is the RTL guard.
const isRtlGuardOverride = (o) =>
  o.rules &&
  Object.keys(o.rules).length > 0 &&
  Object.keys(o.rules).every((rule) => rule === "no-restricted-syntax")

const overrides = (root.overrides || []).filter(
  (o) => isRuleless(o) || isRtlGuardOverride(o)
)

module.exports = {
  root: true,
  parserOptions: Object.assign({}, root.parserOptions, {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: Object.assign(
      {},
      root.parserOptions && root.parserOptions.ecmaFeatures,
      { jsx: true }
    ),
  }),
  env: root.env,
  plugins: root.plugins,
  overrides,
}
