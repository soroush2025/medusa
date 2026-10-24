# Iran Medusa build remaining work

Updated 2026-10-24: work happens on `iran/local-development` ([status](DEVELOP_STATUS.md));
`develop` is now an upstream copy. The integration branch already contains every item the
first bullets call integrated. Where a bullet below says `develop`, read
`iran/local-development`.

Reviewed 2026-10-14; remote statements retain their October 10 audit date. Scoped from the backend master task list. Phase 0/3 source
is integrated; this is not a list of unimplemented Phase 5 storefront features.

- [ ] Integrate the passing local admin fa/ar/he/en desktop/mobile layout, Jalali picker and Toman/Latin preference QA. Production HTTPS/full-stack acceptance remains pending; see the backend Phase 5 acceptance report.
- [ ] Reproduce/fix any admin receipt-widget or province-price QA issues assigned to shared UI/dashboard code; reusable provider widgets belong to the plugin.
- [ ] Follow approved/open upstream PRs #17196 and #17198. #17197 and #17199 are merged; avoid treating them as pending PR submissions.
- [ ] Confirm scope/owner approval for larger C/E/G contributions; follow C→B→D and E→F, then recreate 3.7 from its own commits after dependencies merge.
- [ ] Remove the eleven local proposal branch copies only after the upstream PRs merge; all but the moved seed tip are now merged into `develop`. Retained Iran phase branches must stay.
- [x] Rebuild `@medusajs/ui` (stale `dist`) and rerun the dashboard suite. Done 2026-10-24: 49 files, 416/416 tests pass.
- [ ] Decide whether to rebase `develop` onto current upstream `develop` (138 commits newer than `f274f4e`); `feat/translation-seed-fa-ir-locale` already merged upstream into itself (`3ee02703ee`).
- [x] Publish the integration branch to the Iran remote: `iran/local-development` was pushed to `soroush2025/medusa` on 2026-10-24.
- [ ] Wire codemod checks into CI and explain that the Medusa lint job also runs `lint:rtl`.
- [ ] Deferred: physical tooltip `side="right"`, unmirrored `ArrowDownRightMini`, literal Persian/LRM test regexes and locale-dependent amount assertions.
- [ ] For future source changes: run affected dashboard/UI tests/typecheck and RTL lint, create package changesets, rebuild/pack distinct artifacts and update backend vendor/lockfile provenance before integration.

The current source contains the Vazirmatn, Toman/Latin digits, Intl-calendar and
shared RTL-direction changes. They are not new outstanding implementation work.
See [build status](IRAN_BUILD_STATUS.md) and backend `docs/upstream/README.md`
for source and remote evidence. No upstream PR/comment was posted in this audit.

Folder cleanup is done: the stale build worktree was removed and
`~/00-VP-Projects/medusa-iran-build` was removed; use the common checkout at
`~/00-VP-Projects/medusa`. Local acceptance is recorded in
[completion review](../../medusa-iran-backend-phase5/docs/PHASE_5_REVIEW.md).

## Remote/folder follow-up — October 14

[Remote synchronization and folder retention](../../medusa-iran-backend-phase5/docs/REMOTE_BRANCH_STATUS.md)
records synchronized project heads and the repaired build worktree registration.
Keep primary folders permanently; temporary Phase 5 worktrees stay until integration
and handoff. Branch publication does not satisfy external release acceptance.
