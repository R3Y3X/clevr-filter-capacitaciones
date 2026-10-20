#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KIT_DIR="$ROOT/Kit-Demo-Filter-Clevr"
OUT_DIR="$ROOT/docs/downloads"
OUT_ZIP="$OUT_DIR/Kit-Demo-Filter-Clevr.zip"

if [[ ! -d "$KIT_DIR" ]]; then
  echo "No se encontró el kit en: $KIT_DIR" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
rm -f "$OUT_ZIP"

python3 << PY
import zipfile
from pathlib import Path

root = Path("${ROOT}")
kit = root / "Kit-Demo-Filter-Clevr"
out = root / "docs/downloads/Kit-Demo-Filter-Clevr.zip"

def skip(p: Path) -> bool:
    name = p.name
    if name.endswith(":Zone.Identifier"):
        return True
    if name == ".DS_Store" or name == "__MACOSX":
        return True
    return False

with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED) as zf:
    for path in sorted(kit.rglob("*")):
        if path.is_dir() or skip(path):
            continue
        arc = path.relative_to(root)
        zf.write(path, arc.as_posix())

print(f"Generado: {out} ({out.stat().st_size} bytes)")
PY
