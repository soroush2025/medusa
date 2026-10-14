# Iran Medusa build documentation

Reviewed 2026-10-10. This folder is the Medusa 2.21.2 Iran source checkout,
not the deployable backend and not the separate upstream fork. Its source
`iran/main` and retained `iran/phase-3` both resolve to `b3fbb57cc3`.

- [Remaining build/upstream work](REMAINING_TASKS.md): admin QA, contribution gates, local cleanup and CI/deferred minors.
- [Build/project status](IRAN_BUILD_STATUS.md): shipped source, package handoff and upstream audit.
- [Upstream Medusa README](../README.md), [contributing guide](../CONTRIBUTING.md), [codebase guide](../CLAUDE.md): retained upstream documentation.
- The backend owns the full design/spec, historical phase plans, master remaining list, workflow and vendor provenance under its `docs/` and `vendor/` directories.

Documentation audit branch: `iran/docs-aaa-status-audit`; source branch
`iran/main` is retained. Do not merge development/proposal branches into the
Iran runtime without verification and a new backend packaged artifact.

October 14: local admin browser acceptance in the Phase 5 backend passed; see
[completion review](../../medusa-iran-backend-phase5/docs/PHASE_5_REVIEW.md).
Production HTTPS acceptance and shared worktree-path repair remain pending.
