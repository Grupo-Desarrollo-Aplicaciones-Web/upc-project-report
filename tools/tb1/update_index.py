"""Refresh only the internal table of contents of the canonical single-file report."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools" / "report"))
from validate_report import replace_toc, headings


def build():
    readme = ROOT / "README.md"
    content = readme.read_text(encoding="utf-8-sig")
    updated = replace_toc(content)
    if updated != content:
        readme.write_text(updated, encoding="utf-8")
    print(f"Internal index checked: {len(headings(updated))} headings; chapter archives unchanged")


if __name__ == "__main__":
    build()
