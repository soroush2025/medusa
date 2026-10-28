#!/usr/bin/env bash
#
# pack-vendor.sh — pack the patched Medusa packages for the medusa-iran-backend
# vendor directory (see medusa-iran-backend/vendor/README.md "Rebuilding") and
# write SHA256SUMS over every *.tgz there.
#
# Usage:
#   pack-vendor.sh <backend-vendor-dir> <phase-label> [--sums-only]
#
# Default mode: installs dependencies on the current Medusa checkout, builds
# the dashboard / admin-bundler / translation package graphs (which also builds
# @medusajs/ui), then packs the four vendored packages as
# medusajs-<pkg>-<npmVersion>-<label>.tgz into the vendor dir. It refuses to
# overwrite any existing file in the vendor dir, requires a clean label
# (^[a-z0-9.-]+$) and requires the branch `iran/local-development`
# (override with ALLOW_ANY_BRANCH=1).
#
# --sums-only: skips install/build/pack entirely and only (re)writes
# SHA256SUMS over the *.tgz already present in the vendor dir (useful to
# record checksums for the medusa-plugin-iran tarballs packed elsewhere).
# No tarball is ever written in this mode.
#
# After packing (or alone with --sums-only) it writes <vendor-dir>/SHA256SUMS
# with relative file names, so `cd <vendor-dir> && sha256sum -c SHA256SUMS`
# works. Existing tarballs in the vendor dir are never overwritten.

set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") <backend-vendor-dir> <phase-label> [--sums-only]" >&2
  echo "  Run from a checkout of soroush2025/medusa (scripts/iran)." >&2
}

ME="$(basename "$0")"

fail() {
  echo "$ME: error: $*" >&2
  exit 1
}

usage_fail() {
  usage
  exit 2
}

opts_usage_fail() {
  echo "$ME: error: $*" >&2
  usage_fail
}

# --- argument parsing -------------------------------------------------------

vendor_dir=""
label=""
sums_only=0

while [ $# -gt 0 ]; do
  case "$1" in
    --sums-only)
      [ "$sums_only" -eq 0 ] || opts_usage_fail "--sums-only given twice"
      sums_only=1
      ;;
    -*)
      opts_usage_fail "unknown option: $1"
      ;;
    *)
      if [ -z "$vendor_dir" ]; then
        vendor_dir="$1"
      elif [ -z "$label" ]; then
        label="$1"
      else
        opts_usage_fail "too many arguments: $1"
      fi
      ;;
  esac
  shift
done

[ -n "$vendor_dir" ] || usage_fail "missing <backend-vendor-dir>"
[ -n "$label" ] || usage_fail "missing <phase-label>"

vendor_dir="$(readlink -f "$vendor_dir")"
[ -d "$vendor_dir" ] || fail "vendor dir does not exist or is not a directory: $vendor_dir"

if ! [[ "${label}" =~ ^[a-z0-9.-]+$ ]]; then
  fail "bad phase label '$label' (must match ^[a-z0-9.-]+\$)"
fi

# Location of this script's Medusa checkout.
script_dir="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"
medusa_root="$(cd "$script_dir/../.." && pwd)"

# The packages that get vendored (pkg dir -> short name used in the tarball file).
pkg_dirs=(
  "packages/admin/dashboard:dashboard"
  "packages/design-system/ui:ui"
  "packages/admin/admin-bundler:admin-bundler"
  "packages/modules/translation:translation"
)

# --- pack -------------------------------------------------------------------

if [ "$sums_only" -eq 0 ]; then
  # Compute the target tarball file names (npm version read from package.json)
  # and refuse before doing anything if any would overwrite an existing file.
  targets=()
  for entry in "${pkg_dirs[@]}"; do
    dir="${entry%%:*}"; name="${entry##*:}"
    pkg_dir="$medusa_root/$dir"
    [ -f "$pkg_dir/package.json" ] || fail "missing $dir/package.json"
    version="$(node -p 'require(process.argv[1]).version' "$pkg_dir/package.json")"
    targets+=("medusajs-${name}-${version}-${label}.tgz")
  done

  for t in "${targets[@]}"; do
    if [ -e "$vendor_dir/$t" ]; then
      fail "refusing to overwrite existing file: $vendor_dir/$t (pick a new label)"
    fi
  done

  current_branch="$(git -C "$medusa_root" rev-parse --abbrev-ref HEAD)"
  if [ "$current_branch" != "iran/local-development" ] && [ "${ALLOW_ANY_BRANCH:-0}" != "1" ]; then
    fail "current branch is '$current_branch', expected 'iran/local-development' (set ALLOW_ANY_BRANCH=1 to override)"
  fi

  cd "$medusa_root"
  corepack yarn install

  corepack yarn turbo run build \
    --filter=@medusajs/dashboard... \
    --filter=@medusajs/admin-bundler... \
    --filter=@medusajs/translation...

  i=0
  for entry in "${pkg_dirs[@]}"; do
    dir="${entry%%:*}"
    t="${targets[$i]}"
    (cd "$medusa_root/$dir" && corepack yarn pack -o "$vendor_dir/$t")
    echo "$ME: packed $dir -> vendor/$t"
    i=$((i + 1))
  done
fi

# --- SHA256SUMS -------------------------------------------------------------

# Every *.tgz in the vendor dir (relative names, sorted), so
# `cd vendor && sha256sum -c SHA256SUMS` works.
declare -a tarballs=()
for f in "$vendor_dir"/*.tgz; do
  [ -f "$f" ] || continue
  tarballs+=("$(basename "$f")")
done

[ ${#tarballs[@]} -gt 0 ] || fail "no *.tgz found in $vendor_dir"

mapfile -t sorted < <(printf '%s\n' "${tarballs[@]}" | LC_ALL=C sort)

(
  cd "$vendor_dir"
  sha256sum "${sorted[@]}" > SHA256SUMS.part
  mv -f SHA256SUMS.part SHA256SUMS
)

echo "$ME: wrote $vendor_dir/SHA256SUMS for ${#sorted[@]} tarball(s)"
