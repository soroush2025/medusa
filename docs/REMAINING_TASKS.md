# Iran Medusa build remaining work

Reviewed 2026-10-10. Scoped from the backend master task list. Phase 0/3 source
is integrated; this is not a list of unimplemented Phase 5 storefront features.

- [ ] Manual admin browser QA in fa/ar/he/en: RTL layouts, keyboard/focus, Persian calendar/date picker, IRR/Toman display and inputs, Latin-digit preference.
- [ ] Reproduce/fix any admin receipt-widget or province-price QA issues assigned to shared UI/dashboard code; reusable provider widgets belong to the plugin.
- [ ] Follow approved/open upstream PRs #17196 and #17198. #17197 and #17199 are merged; avoid treating them as pending PR submissions.
- [ ] Confirm scope/owner approval for larger C/E/G contributions; follow C→B→D and E→F, then recreate 3.7 from its own commits after dependencies merge.
- [ ] Remove eleven obsolete local proposal branch copies in this Iran checkout after checking the real upstream fork. Remote cleanup and plan-docs removal are verified complete; retained Iran phase branches must stay.
- [ ] Wire codemod checks into CI and explain that the Medusa lint job also runs `lint:rtl`.
- [ ] Deferred: physical tooltip `side="right"`, unmirrored `ArrowDownRightMini`, literal Persian/LRM test regexes and locale-dependent amount assertions.
- [ ] For future source changes: run affected dashboard/UI tests/typecheck and RTL lint, create package changesets, rebuild/pack distinct artifacts and update backend vendor/lockfile provenance before integration.

The current source contains the Vazirmatn, Toman/Latin digits, Intl-calendar and
shared RTL-direction changes. They are not new outstanding implementation work.
See [build status](IRAN_BUILD_STATUS.md) and backend `docs/upstream/README.md`
for source and remote evidence. No upstream PR/comment was posted in this audit.
