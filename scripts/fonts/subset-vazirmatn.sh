#!/usr/bin/env bash
# Subsets Vazirmatn (SIL OFL 1.1) to the Arabic-script ranges and writes woff2
# files into the dashboard assets. Usage:
#   scripts/fonts/subset-vazirmatn.sh <dir-with-extracted-vazirmatn-package>
# where <dir>/package/fonts/ttf/Vazirmatn-{Regular,Medium}.ttf exist
# (npm tarball vazirmatn@33.0.3 extracted into <dir>).
set -euo pipefail

SRC_DIR="${1:?path to the extracted vazirmatn npm tarball directory}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/packages/admin/dashboard/src/assets/fonts"
VENV="$(mktemp -d)/venv"

# Must match the unicode-range in packages/admin/dashboard/src/index.css.
UNICODES="U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F"

python3 -m venv "$VENV" 2>/dev/null || { rm -rf "$VENV"; uv venv -q "$VENV"; }
if [ -x "$VENV/bin/pip" ]; then
  "$VENV/bin/pip" install -q "fonttools==4.66.1" "brotli==1.2.0"
else
  uv pip install -q --python "$VENV/bin/python" "fonttools==4.66.1" "brotli==1.2.0"
fi

for weight in Regular Medium; do
  "$VENV/bin/pyftsubset" "$SRC_DIR/package/fonts/ttf/Vazirmatn-$weight.ttf" \
    --unicodes="$UNICODES" \
    --flavor=woff2 \
    --layout-features='*' \
    --no-hinting \
    --desubroutinize \
    --notdef-outline \
    --name-IDs='0,1,2,3,4,5,6,13,14' \
    --output-file="$OUT/Vazirmatn-$weight.woff2"
done

cp "$SRC_DIR/package/OFL.txt" "$OUT/Vazirmatn-OFL.txt"
ls -l "$OUT"/Vazirmatn-*
sha256sum "$OUT"/Vazirmatn-*
