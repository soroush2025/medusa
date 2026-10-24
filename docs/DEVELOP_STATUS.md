# Iran Medusa build `develop` status — 2026-10-24

**Use `develop` for the combined Iran Medusa source and the remaining plan.**
It was created from `main` (`f274f4e`, upstream `develop` at that time) and
merged, with `--no-ff`, `iran/docs-aaa-status-audit` (which contains `iran/main`,
`iran/phase-0` and `iran/phase-3`) plus every local/`fork` proposal branch:

- `feat/admin-iran-provinces-country-states`, `fix/admin-fa-translation-sync`,
  `chore/admin-fix-generate-currencies-path`, `feat/ui-preset-vazirmatn-rtl-font`
- `fix/ui-rtl-logical-properties-direction-provider`, `fix/admin-rtl-logical-properties`,
  `fix/admin-rtl-direction-aware-arrow-keys`, `chore/admin-rtl-remove-manual-dir-props`
- `feat/admin-intl-locale-calendar-formatting`, `feat/admin-currency-display-units`
- `feat/translation-seed-fa-ir-locale` (seed commit `f0865f2b0d`)

## Where to work

- Repository: `~/00-VP-Projects/medusa`, branch **`develop`**. `develop` is a local
  integration branch with no upstream; it no longer tracks `origin/develop`
  (`medusajs/medusa`). Nothing was pushed.
- `~/00-VP-Projects/medusa-iran-build` no longer exists. It was a linked worktree with
  a stale registration pointing at the former `aaa` path; it was verified identical to
  `iran/docs-aaa-status-audit` with no untracked files, then removed (only ignored
  dependencies/build output were discarded). A temporary compatibility symlink was
  removed too, and path references in the backend docs now point at `~/00-VP-Projects/medusa`.
- All branches above are retained and are ancestors of `develop`, except as noted below.

## Conflict decisions

The proposal branches are older copies of work already in `iran/phase-3`. Where they
overlapped, the `develop` side was kept (Latin-digit toggle, Toman display units,
removed manual `dir` props, stale `fa` keys removed, dashboard in the RTL lint scope).
Files resolved this way: `.eslintrc.js`, `package.json`, the workflow timeline section,
`format-locale.ts`, `format-currency.ts`, their specs, the translation files
(`en.json`, `fa.json`, `$schema.json`), `create-campaign-form-fields.tsx` and
`edit-profile-form.tsx` plus its spec.

## Not merged

`feat/translation-seed-fa-ir-locale` (local and `fork`) was advanced to `3ee02703ee`,
a merge of newer upstream `develop` into the proposal branch. `develop` contains only
the original seed commit; the upstream catch-up (138 upstream commits since `f274f4e`)
is a separate, deliberate rebase of the whole build.

## Verification (2026-10-24)

- Dashboard `tsgo` typecheck: pass. `lint:rtl` (ui + dashboard): pass.
- Dashboard vitest: 414 pass, 2 fail (`i18n-provider-direction.spec.tsx`, fa/ar expect
  `rtl`). Cause: the prebuilt `packages/design-system/ui/dist` predates the Radix
  `Direction` bridge in `ui` source; rebuild `@medusajs/ui` and rerun.
- UI vitest 52/52 and RTL/font Node tests 62/62 pass.
- Not run: package builds, integration tests, backend vendor repack.

## Remaining work

See [REMAINING_TASKS.md](REMAINING_TASKS.md). Rebuild `@medusajs/ui` and rerun the
dashboard suite first; then pack new artifacts before the backend consumes `develop`.
