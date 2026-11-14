#!/usr/bin/env python3
"""Validate the single-file Applications Web report without third-party packages."""
from __future__ import annotations

import argparse
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import unicodedata
from urllib.parse import unquote, urlsplit

TOC_START = "<!-- REPORT_TOC_START -->"
TOC_END = "<!-- REPORT_TOC_END -->"


def prose(text: str) -> str:
    """Blank fenced code, preserving line positions for diagnostics."""
    lines, fence = [], None
    for line in text.splitlines(keepends=True):
        match = re.match(r"^ {0,3}(`{3,}|~{3,})(.*)$", line)
        if fence:
            if match and match[1][0] == fence[0] and len(match[1]) >= fence[1] and not match[2].strip():
                fence = None
            lines.append("\n" if line.endswith("\n") else "")
        elif match and not (match[1][0] == "`" and "`" in match[2]):
            fence = (match[1][0], len(match[1]))
            lines.append("\n" if line.endswith("\n") else "")
        else:
            lines.append(line)
    return "".join(lines)


def slug_base(title: str) -> str:
    """GitHub-like heading fragment: retain Unicode letters, marks, digits, - and _."""
    title = html.unescape(re.sub(r"<[^>]*>", "", title)).strip().lower()
    title = "".join(c for c in title if c in "-_" or c.isspace() or unicodedata.category(c)[0] in "LNM")
    return re.sub(r"\s", "-", title)


def headings(text: str) -> list[dict]:
    result, used = [], set()
    lines = prose(text).splitlines()
    for i, line in enumerate(lines):
        match = re.match(r"^ {0,3}(#{1,6})(?:[ \t]+|$)(.*)$", line)
        if match:
            level = len(match[1])
            title = re.sub(r"[ \t]+#+[ \t]*$", "", match[2]).strip()
        elif i + 1 < len(lines) and line.strip() and re.fullmatch(r" {0,3}(?:=+|-+)[ \t]*", lines[i + 1]) and not re.match(r"^\s*(?:>|[-*+]\s|\d+\.\s)", line):
            level, title = (1 if lines[i + 1].strip()[0] == "=" else 2), line.strip()
        else:
            continue
        base, suffix = slug_base(title), 0
        slug = base
        while slug in used:
            suffix += 1
            slug = f"{base}-{suffix}"
        used.add(slug)
        result.append({"level": level, "title": title, "slug": slug})
    return result


def replace_toc(text: str) -> str:
    if text.count(TOC_START) != 1 or text.count(TOC_END) != 1:
        raise ValueError("Exactly one pair of REPORT_TOC markers is required")
    before, rest = text.split(TOC_START, 1)
    _, after = rest.split(TOC_END, 1)
    clean = before + TOC_START + "\n" + TOC_END + after
    entries = []
    for item in headings(clean):
        if item["level"] > 4 or normalized(item["title"]) in {"tabla de contenidos", "contenido", "indice", "table of contents"}:
            continue
        label = item["title"].replace("[", r"\[").replace("]", r"\]")
        entries.append(f"{'  ' * (item['level'] - 1)}- [{label}](#{item['slug']})")
    return before + TOC_START + "\n\n" + "\n".join(entries) + "\n\n" + TOC_END + after


def normalized(value: str) -> str:
    return " ".join("".join(c for c in unicodedata.normalize("NFKD", value.lower()) if not unicodedata.combining(c)).split())


class HTMLResources(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.urls, self.ids = [], set()

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if value is None:
                continue
            if key in {"href", "src", "poster"}:
                self.urls.append(value)
            if key == "id" or (tag == "a" and key == "name"):
                self.ids.add(value)

    handle_startendtag = handle_starttag


def markdown_destinations(text: str) -> list[str]:
    """Read inline/reference destinations, including balanced parentheses and <paths>."""
    urls = []
    for match in re.finditer(r"!?\[[^\]\n]*\]\(", text):
        start = match.end()
        if start >= len(text):
            continue
        if text[start] == "<":
            end = text.find(">", start + 1)
            if end >= 0:
                urls.append(text[start + 1:end])
            continue
        depth, cursor = 0, start
        while cursor < len(text):
            char = text[cursor]
            if char == "\\":
                cursor += 2
                continue
            if char == "(":
                depth += 1
            elif char == ")":
                if depth == 0:
                    break
                depth -= 1
            elif char.isspace() and depth == 0:
                break
            cursor += 1
        if cursor > start:
            urls.append(text[start:cursor])
    for match in re.finditer(r"^ {0,3}\[[^\]\n]+\]:\s*(?:<([^>]+)>|(\S+))", text, re.M):
        urls.append(match[1] or match[2])
    return urls


def fragment_ids(text: str) -> set[str]:
    parser = HTMLResources()
    parser.feed(prose(text))
    return {item["slug"] for item in headings(text)} | parser.ids


def validate(root: Path, resources: Path | None = None) -> dict:
    errors, warnings = [], []
    readme = root / "README.md"
    if not readme.is_file():
        return {"ok": False, "root": str(root), "errors": ["README.md is missing"], "warnings": []}
    text = readme.read_text(encoding="utf-8-sig")
    items = headings(text)
    if any(item["level"] > 4 for item in items):
        errors.append("Report hierarchy exceeds four Markdown heading levels")
    if "\ufffd" in text:
        errors.append("README contains Unicode replacement characters")
    titles = [normalized(item["title"]) for item in items]
    prefixes = [
        "1.1", "1.1.1", "1.1.2", "1.2", "1.2.1", "1.2.2", "1.2.2.1", "1.2.2.2", "1.2.2.3", "1.2.2.4", "1.3",
        "2.1", "2.1.1", "2.1.2", "2.2", "2.2.1", "2.2.2", "2.2.3", "2.3", "2.3.1", "2.3.2", "2.3.3", "2.3.4", "2.4", "2.5",
        "3.1", "3.2", "3.3", "4.1", "4.1.1", "4.1.2", "4.2", "4.2.1", "4.2.2", "4.2.3", "4.2.4", "4.2.5",
        "4.3", "4.3.1", "4.3.2", "4.4", "4.4.1", "4.4.2", "4.4.3", "4.4.4", "4.5", "4.6", "4.6.1", "4.6.2", "4.6.3", "4.6.4", "4.7", "4.7.1", "4.8", "4.8.1",
        "5.1", "5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.2", "5.3", "5.3.1", "5.3.2", "5.3.3", "5.4",
    ]
    for prefix in prefixes:
        if not any(re.match(re.escape(prefix) + r"(?:\.?\s|$)", title) for title in titles):
            errors.append(f"Missing official section {prefix}")
    sprint_titles = ["sprint planning", "aspect leaders and collaborators", "sprint backlog", "development evidence for sprint review", "execution evidence for sprint review", "services documentation evidence for sprint review", "software deployment evidence for sprint review", "team collaboration insights"]
    for sprint in range(1, 5):
        for index, expected in enumerate(sprint_titles, 1):
            prefix = f"5.2.{sprint}.{index}"
            if not any(re.match(re.escape(prefix) + r"(?:\.?\s|$)", title) and expected in title for title in titles):
                errors.append(f"Missing sprint section {prefix}: {expected}")
    ordered = [r"^registro de versiones", r"^project report collaboration insights", r"^(tabla de contenidos|contenido)$", r"^(?:capitulo 00: )?student outcome", r"^capitulo i:", r"^capitulo ii:", r"^capitulo iii:", r"^capitulo iv:", r"^capitulo v:", r"^conclusiones", r"^bibliografia$", r"^anexos$"]
    previous = -1
    for pattern in ordered:
        matches = [i for i, title in enumerate(titles) if re.search(pattern, title)]
        if not matches:
            errors.append(f"Missing official heading matching {pattern}")
        elif not any(index > previous for index in matches):
            errors.append(f"Official heading out of order: {pattern}")
        else:
            previous = next(index for index in matches if index > previous)
    if not any(re.search(r"video about[- ]the[- ]team", title) for title in titles):
        errors.append("Missing Video About-the-Team heading")
    try:
        if replace_toc(text) != text:
            errors.append("Internal table of contents is outdated")
    except ValueError as exc:
        errors.append(str(exc))
    for required in ["criterio especifico", "acciones realizadas", "conclusiones"]:
        if required not in normalized(text):
            errors.append(f"Missing Student Outcome table column: {required}")

    clean = re.sub(r"<!--.*?-->", "", prose(text), flags=re.S)
    clean = re.sub(r"(`+)([^`\n]*?)\1", "", clean)
    parser = HTMLResources()
    parser.feed(clean)
    urls = set(markdown_destinations(clean) + parser.urls)
    current_ids, local_links = fragment_ids(text), 0
    cache = {}
    for raw in sorted(urls):
        raw = html.unescape(raw).strip()
        if not raw:
            errors.append("Empty local link destination")
            continue
        parsed = urlsplit(raw)
        if parsed.scheme or parsed.netloc:
            continue
        local_links += 1
        fragment, relative = unquote(parsed.fragment), unquote(parsed.path)
        if not relative:
            if fragment and fragment not in current_ids:
                errors.append(f"Missing README fragment: {raw}")
            continue
        candidates = [root / relative]
        if resources is not None:
            candidates.append(resources / relative)
        target = next((candidate for candidate in candidates if candidate.exists()), None)
        if target is None:
            errors.append(f"Missing local resource: {raw}")
            continue
        if fragment:
            if target.is_dir():
                target = next((target / name for name in ["README.md", "index.html"] if (target / name).is_file()), target)
            if target.suffix.lower() in {".md", ".markdown", ".html", ".htm"}:
                if target not in cache:
                    cache[target] = fragment_ids(target.read_text(encoding="utf-8-sig"))
                if fragment not in cache[target]:
                    errors.append(f"Missing local fragment: {raw}")
            else:
                warnings.append(f"Fragment not inspectable for this file type: {raw}")

    checked = 0
    manifest_paths = sorted((root / "assets" / "evidence").glob("**/manifest.json"))
    if not manifest_paths:
        errors.append("No evidence manifest found under assets/evidence")
    manifest_paths += sorted((root / "assets" / "history").glob("**/manifest.json"))
    for manifest_path in manifest_paths:
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8-sig"))
            files = manifest["files"]
            if not isinstance(files, list) or not files:
                raise ValueError("files must be a non-empty list")
            for entry in files:
                snapshot = (manifest_path.parent / entry["snapshot"]).resolve()
                if not snapshot.is_relative_to(root.resolve()):
                    errors.append(f"Evidence snapshot escapes report repository: {entry['snapshot']}")
                    continue
                if not snapshot.is_file():
                    errors.append(f"Missing evidence snapshot: {snapshot.name}")
                    continue
                raw = snapshot.read_bytes()
                if not entry.get("source") or not re.fullmatch(r"[a-fA-F0-9]{64}", str(entry.get("sha256", ""))):
                    errors.append(f"Incomplete evidence provenance: {snapshot.name}")
                elif hashlib.sha256(raw).hexdigest() != entry["sha256"].lower():
                    errors.append(f"Evidence SHA-256 mismatch: {snapshot.name}")
                if len(raw) != entry.get("bytes"):
                    errors.append(f"Evidence byte count mismatch: {snapshot.name}")
                checked += 1
        except (OSError, ValueError, KeyError, TypeError) as exc:
            errors.append(f"Invalid evidence manifest {manifest_path}: {exc}")
    return {"ok": not errors, "root": str(root), "scope": "README.md and evidence manifests; external URLs are not fetched", "headings": len(items), "local_links": local_links, "evidence_files": checked, "errors": errors, "warnings": warnings}


def main() -> int:
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[2])
    cli.add_argument("--resources-root", type=Path, help="Fallback repository for resources omitted from staging")
    args = cli.parse_args()
    try:
        result = validate(args.root.resolve(), args.resources_root.resolve() if args.resources_root else None)
    except (OSError, UnicodeError, ValueError) as exc:
        result = {"ok": False, "errors": [str(exc)], "warnings": []}
    print(json.dumps(result, ensure_ascii=True, indent=2))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())
