# Iran vendor packing scripts

- `pack-vendor.sh <backend-vendor-dir> <phase-label> [--sums-only]` — packs the
  patched Medusa packages (`@medusajs/dashboard`, `@medusajs/ui`,
  `@medusajs/admin-bundler`, `@medusajs/translation`) as
  `medusajs-<pkg>-<npmVersion>-<label>.tgz` into the backend vendor dir
  (see `medusa-iran-backend/vendor/README.md`), then writes `SHA256SUMS` over
  every `*.tgz` there. Refuses to overwrite existing files, requires the label
  to match `^[a-z0-9.-]+$` and the branch to be `iran/local-development`
  (override with `ALLOW_ANY_BRANCH=1`). `--sums-only` only (re)writes
  `SHA256SUMS` and never writes any tarball.

Verify afterwards: `cd <vendor-dir> && sha256sum -c SHA256SUMS`.
