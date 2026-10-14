# Iran build status and package handoff

Source audited 2026-10-10: `iran/main` = `iran/phase-3` = `b3fbb57cc3`.
Phase 0/3 implementation is integrated: Persian translation cleanup and locale,
Iran provinces, logical RTL properties/direction-aware navigation, Persian
calendar/number formatting, Toman display/input units, Latin-digit preference,
local Vazirmatn font assets and shared direction handling.

The backend does not use this checkout directly. It installs its uniquely named
`vendor/medusajs-*.tgz` artifacts and overrides. See the backend `vendor/README.md`
for the exact dashboard/UI/admin-bundler/translation artifacts. After source
changes, verify affected packages, build and pack a new filename, update the
backend dependency/lockfile and integration evidence. Rebuild admin-bundler if
the embedded UI preset/font changes. Do not replace an existing archive in place.

## Read-only upstream audit

GitHub was queried on 2026-10-10. Persian translation PR #17197 and Iran province
PR #17199 are merged. Currency-generator PR #17196 and Persian-locale seed PR
#17198 are approved/open. The RTL UI issue #17185 has `help-wanted`; larger PR
scope and the C→B→D, E→F and final 3.7 dependency gates remain in the backend
`docs/upstream/README.md`. These statuses do not upgrade the deployed Medusa
version or prove the Iran packages were rebuilt.

The Iran remote no longer has the old plan-docs or eleven upstream PR branches.
Its `main` matches local `develop` baseline `f274f4e`; latest upstream-tip sync
was not performed by this audit. Eleven obsolete local PR branch copies remain.
Owner cleanup must preserve `iran/main`, `iran/phase-0`, `iran/phase-3` and the
real upstream fork's active work. No branch was deleted or reset by this audit.

October 14: local admin browser acceptance in the Phase 5 backend passed; see
[completion review](../../medusa-iran-backend-phase5/docs/PHASE_5_REVIEW.md).
Production HTTPS acceptance and shared worktree-path repair remain pending.
