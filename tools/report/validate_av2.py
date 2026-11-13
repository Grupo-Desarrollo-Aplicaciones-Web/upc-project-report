"""Check the AV2 chapter views, numbered audit coverage and local resources."""
from pathlib import Path
import html
import json
import re
import sys
from urllib.parse import unquote, urlsplit
from validate_report import HTMLResources, fragment_ids, headings, markdown_destinations, prose

ROOT = Path(__file__).resolve().parents[2]

def validate():
    canonical = (ROOT / "README.md").read_text(encoding="utf-8-sig")
    numbered = [item["title"] for item in headings(canonical) if re.match(r"^\d+(?:\.\d+)*\s", item["title"])]
    audit = (ROOT / "docs/av2/auditoria-por-seccion.md").read_text(encoding="utf-8-sig")
    covered = re.findall(r"^\| (\d+(?:\.\d+)*\s[^|]+) \|", audit, re.M)
    errors = ["Missing numbered audit row: " + title for title in numbered if title not in covered]
    errors += ["Obsolete numbered audit row: " + title for title in covered if title not in numbered]
    paths = [p for p in (ROOT / "docs").glob("*.md") if p.name.startswith(("00-", "01-", "02-", "03-", "04-", "05-", "06-", "07-"))]
    paths += list((ROOT / "docs/av2").glob("*.md")) + [ROOT / "database/README.md", ROOT / "docs/sprints/sprint-03.md"]
    count = 0
    for path in paths:
        source = re.sub(r"<!--.*?-->", "", prose(path.read_text(encoding="utf-8-sig")), flags=re.S)
        parser = HTMLResources()
        parser.feed(source)
        for raw in set(markdown_destinations(source) + parser.urls):
            parsed = urlsplit(html.unescape(raw))
            if parsed.scheme or parsed.netloc:
                continue
            count += 1
            target = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path
            if not target.exists():
                errors.append(f"{path.relative_to(ROOT)}: missing {raw}")
            elif parsed.fragment and target.suffix == ".md" and unquote(parsed.fragment) not in fragment_ids(target.read_text(encoding="utf-8-sig")):
                errors.append(f"{path.relative_to(ROOT)}: missing anchor {raw}")
    diagrams = list((ROOT / "assets/architecture/av2").glob("*.mmd"))
    for source in diagrams:
        if not source.with_suffix(".svg").is_file():
            errors.append("Missing rendered SVG: " + source.name)
    ddl = ROOT / "database/schema.sql"
    evidence_ddl = ROOT / "assets/evidence/2026-11-13/schema-mysql.sql"
    if evidence_ddl.exists() and ddl.read_bytes() != evidence_ddl.read_bytes():
        errors.append("Generated database/schema.sql differs from its evidence snapshot")
    return {"ok": not errors, "date": "2026-11-13", "numbered_sections": len(numbered), "audit_rows": len(covered),
            "chapter_and_support_files": len(paths), "local_links": count, "rendered_diagrams": len(diagrams),
            "scope": "Local documents and assets; external URLs and human evidence not revalidated", "errors": errors}

if __name__ == "__main__":
    result = validate()
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if "--save" in sys.argv:
        (ROOT / "docs/av2/audit-validation.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    raise SystemExit(0 if result["ok"] else 1)
