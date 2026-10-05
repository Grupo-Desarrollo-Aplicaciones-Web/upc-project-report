"""Prepare a new 40-slide candidate with native PowerPoint custom shows.

Run before presentation finalization; the destination must not already exist.
Slide content, notes, visibility and timings are preserved. Optional links map
shape names to verified local file URIs, either globally or per slide:
    {"39": {"diagram-context": "file:///C:/path/c4-context.png"}}
    {"diagram-context": "file:///C:/path/c4-context.png"}
"""

from __future__ import annotations

import argparse
import json
import os
import posixpath
import re
import tempfile
from pathlib import Path
from urllib.parse import unquote, urlsplit
from zipfile import ZipFile

from lxml import etree


NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}
SLIDE_COUNT = 40
VIDEO_ROUTE = list(range(1, 37))
CLASS_ROUTE = [1, 2, 3, 4, 6, 9, 12, 16, 19, 21, 22, 23, 24, 25,
               26, 27, 28, 29, 30, 32, 33, 36]
SHOWS = (("Video 27 min 30 s", VIDEO_ROUTE),
         ("Sustentación 12 min", CLASS_ROUTE))


def xml_bytes(element: etree._Element) -> bytes:
    return etree.tostring(element, encoding="UTF-8", xml_declaration=True)


def parse_xml(data: bytes) -> etree._Element:
    return etree.fromstring(
        data, etree.XMLParser(resolve_entities=False, no_network=True)
    )


def relationship_part(part: str) -> str:
    folder, name = posixpath.split(part)
    return posixpath.join(folder, "_rels", name + ".rels")


def internal_target(source: str, target: str) -> str:
    resolved = posixpath.normpath(
        target.lstrip("/") if target.startswith("/") else
        posixpath.join(posixpath.dirname(source), target)
    )
    if resolved.startswith("../"):
        raise ValueError(f"Relationship escapes the package: {target}")
    return resolved


def package_slides(parts: dict[str, bytes]) -> tuple[etree._Element, list[str], list[str]]:
    presentation = parse_xml(parts["ppt/presentation.xml"])
    ids = presentation.findall("p:sldIdLst/p:sldId", NS)
    if len(ids) != SLIDE_COUNT:
        raise ValueError(f"Expected 40 presentation slides, found {len(ids)}")
    relationships = parse_xml(parts["ppt/_rels/presentation.xml.rels"])
    by_id = {rel.get("Id"): rel for rel in relationships}
    slide_parts, slide_rel_ids = [], []
    for slide_id in ids:
        rid = slide_id.get(f"{{{NS['r']}}}id")
        rel = by_id.get(rid)
        if rel is None or not rel.get("Type", "").endswith("/slide"):
            raise ValueError(f"Missing slide relationship: {rid}")
        if rel.get("TargetMode") == "External":
            raise ValueError(f"Slide is an external relationship: {rid}")
        part = internal_target("ppt/presentation.xml", rel.get("Target", ""))
        if part not in parts:
            raise ValueError(f"Missing slide part: {part}")
        slide_parts.append(part)
        slide_rel_ids.append(rid)
    actual_slides = {name for name in parts if
                     re.fullmatch(r"ppt/slides/slide\d+\.xml", name)}
    if len(set(slide_parts)) != SLIDE_COUNT or set(slide_parts) != actual_slides:
        raise ValueError("Expected 40 distinct slides without orphan slide parts")
    return presentation, slide_parts, slide_rel_ids


def validate_notes(parts: dict[str, bytes], slide_parts: list[str]) -> None:
    used_notes = set()
    for number, slide in enumerate(slide_parts, 1):
        rel_name = relationship_part(slide)
        if rel_name not in parts:
            raise ValueError(f"Slide {number} has no relationships or notes")
        rels = parse_xml(parts[rel_name])
        notes_rels = [rel for rel in rels if
                      rel.get("Type", "").endswith("/notesSlide")]
        if len(notes_rels) != 1:
            raise ValueError(f"Slide {number} must reference exactly one notes part")
        rel = notes_rels[0]
        if rel.get("TargetMode") == "External":
            raise ValueError(f"Slide {number} notes must be inside the package")
        note_part = internal_target(slide, rel.get("Target", ""))
        if note_part not in parts or note_part in used_notes:
            raise ValueError(f"Missing or shared notes for slide {number}")
        used_notes.add(note_part)
        notes = parse_xml(parts[note_part])
        bodies = notes.xpath(
            ".//p:sp[p:nvSpPr/p:nvPr/p:ph[@type='body']]//a:t", namespaces=NS
        )
        if not any((element.text or "").strip() for element in bodies):
            raise ValueError(f"Slide {number} has empty speaker notes")
    actual_notes = {name for name in parts if
                    re.fullmatch(r"ppt/notesSlides/notesSlide\d+\.xml", name)}
    if used_notes != actual_notes or len(used_notes) != SLIDE_COUNT:
        raise ValueError("Expected 40 distinct referenced notes without orphan parts")


def set_custom_shows(presentation: etree._Element, rel_ids: list[str]) -> None:
    for previous in presentation.findall("p:custShowLst", NS):
        presentation.remove(previous)
    shows = etree.Element(f"{{{NS['p']}}}custShowLst")
    for show_id, (name, route) in enumerate(SHOWS):
        show = etree.SubElement(shows, f"{{{NS['p']}}}custShow",
                                name=name, id=str(show_id))
        slide_list = etree.SubElement(show, f"{{{NS['p']}}}sldLst")
        for number in route:
            element = etree.SubElement(slide_list, f"{{{NS['p']}}}sld")
            element.set(f"{{{NS['r']}}}id", rel_ids[number - 1])
    # CT_Presentation orders custom shows after embedded fonts and before
    # photoAlbum/custDataLst/kinsoku/defaultTextStyle/modifyVerifier/extLst.
    following = {f"{{{NS['p']}}}{name}" for name in
                 ("photoAlbum", "custDataLst", "kinsoku", "defaultTextStyle",
                  "modifyVerifier", "extLst")}
    index = next((i for i, child in enumerate(presentation)
                  if child.tag in following), len(presentation))
    presentation.insert(index, shows)


def verified_file_uri(uri: str) -> str:
    parsed = urlsplit(uri)
    if parsed.scheme != "file" or parsed.netloc not in ("", "localhost"):
        raise ValueError(f"Links must be local file URIs: {uri}")
    path_text = unquote(parsed.path)
    if os.name == "nt" and re.match(r"^/[A-Za-z]:/", path_text):
        path_text = path_text[1:]
    target = Path(path_text)
    if not target.is_file():
        raise ValueError(f"Local hyperlink target does not exist: {target}")
    return target.resolve().as_uri()


def add_shape_link(parts: dict[str, bytes], slide: str, shape_name: str,
                   uri: str) -> None:
    root = parse_xml(parts[slide])
    matches = root.xpath(".//p:cNvPr[@name=$name]", name=shape_name, namespaces=NS)
    if len(matches) != 1:
        raise ValueError(f"Expected one shape '{shape_name}' in {slide}, found {len(matches)}")
    rel_part = relationship_part(slide)
    rels = parse_xml(parts[rel_part]) if rel_part in parts else etree.Element(
        f"{{{NS['rel']}}}Relationships", nsmap={None: NS["rel"]}
    )
    target = verified_file_uri(uri)
    rel_type = NS["r"] + "/hyperlink"
    existing = next((rel for rel in rels if rel.get("Type") == rel_type and
                     rel.get("Target") == target and
                     rel.get("TargetMode") == "External"), None)
    if existing is None:
        used = {rel.get("Id") for rel in rels}
        number = 1
        while f"rIdLocalLink{number}" in used:
            number += 1
        existing = etree.SubElement(
            rels, f"{{{NS['rel']}}}Relationship", Id=f"rIdLocalLink{number}",
            Type=rel_type, Target=target, TargetMode="External"
        )
    properties = matches[0]
    for old in properties.findall("a:hlinkClick", NS):
        properties.remove(old)
    link = etree.Element(f"{{{NS['a']}}}hlinkClick")
    link.set(f"{{{NS['r']}}}id", existing.get("Id"))
    link.set("tooltip", "Abrir artefacto local de CREDITOR")
    properties.insert(0, link)
    parts[slide] = xml_bytes(root)
    parts[rel_part] = xml_bytes(rels)


def apply_links(parts: dict[str, bytes], slides: list[str], mapping: dict) -> int:
    if not isinstance(mapping, dict):
        raise ValueError("Link JSON must be an object")
    operations = []
    if all(isinstance(value, str) for value in mapping.values()):
        for name, uri in mapping.items():
            matches = [part for part in slides if parse_xml(parts[part]).xpath(
                ".//p:cNvPr[@name=$name]", name=name, namespaces=NS
            )]
            if len(matches) != 1:
                raise ValueError(f"Global shape name '{name}' must occur in exactly one slide")
            operations.append((matches[0], name, uri))
    elif all(isinstance(value, dict) for value in mapping.values()):
        for number_text, names in mapping.items():
            number = int(number_text)
            if not 1 <= number <= SLIDE_COUNT:
                raise ValueError(f"Invalid slide number in links: {number}")
            for name, uri in names.items():
                if not isinstance(uri, str):
                    raise ValueError(f"Hyperlink for '{name}' must be a file URI")
                operations.append((slides[number - 1], name, uri))
    else:
        raise ValueError("Use a flat shape-to-URI map or nested slide-to-shape maps")
    for slide, name, uri in operations:
        add_shape_link(parts, slide, name, uri)
    return len(operations)


def prepare(draft: Path, output: Path, links: Path | None = None) -> dict:
    draft, output = draft.resolve(), output.resolve()
    if draft == output or output.exists():
        raise ValueError("Use a new destination; never modify the draft or a finalized file")
    if not draft.is_file():
        raise FileNotFoundError(draft)
    with ZipFile(draft) as archive:
        if archive.testzip():
            raise ValueError("Draft ZIP package failed its CRC check")
        entries = archive.infolist()
        if len({entry.filename for entry in entries}) != len(entries):
            raise ValueError("Draft contains duplicate ZIP entries")
        parts = {entry.filename: archive.read(entry) for entry in entries}
    presentation, slides, rel_ids = package_slides(parts)
    validate_notes(parts, slides)
    set_custom_shows(presentation, rel_ids)
    parts["ppt/presentation.xml"] = xml_bytes(presentation)
    link_count = apply_links(parts, slides, json.loads(links.read_text(encoding="utf-8"))) if links else 0
    output.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=".keynote-candidate-", suffix=".pptx", dir=output.parent)
    os.close(descriptor)
    temporary = Path(temporary_name)
    try:
        with ZipFile(temporary, "w") as archive:
            written = set()
            for entry in entries:
                archive.writestr(entry, parts[entry.filename])
                written.add(entry.filename)
            for name in parts.keys() - written:
                archive.writestr(name, parts[name])
        with ZipFile(temporary) as archive:
            if archive.testzip():
                raise ValueError("Prepared package failed its CRC check")
            check_parts = {name: archive.read(name) for name in archive.namelist()}
        checked, checked_slides, checked_ids = package_slides(check_parts)
        validate_notes(check_parts, checked_slides)
        shows = checked.findall("p:custShowLst/p:custShow", NS)
        if len(shows) != 2:
            raise ValueError("Prepared package must contain two custom shows")
        for show, (name, route) in zip(shows, SHOWS):
            actual = [element.get(f"{{{NS['r']}}}id") for element in show.findall("p:sldLst/p:sld", NS)]
            if show.get("name") != name or actual != [checked_ids[number - 1] for number in route]:
                raise ValueError(f"Custom show route differs: {name}")
        if output.exists():
            raise ValueError("Destination appeared during preparation; refusing overwrite")
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)
    return {"output": str(output), "slides": SLIDE_COUNT, "notes": SLIDE_COUNT,
            "videoRoute": VIDEO_ROUTE, "classRoute": CLASS_ROUTE,
            "localHyperlinks": link_count, "slideVisibility": "preserved",
            "timings": "preserved; durations belong to the speaker notes"}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True, help="Draft PPTX with 40 slides and 40 nonempty notes")
    parser.add_argument("--output", type=Path, required=True, help="New prepared candidate PPTX before finalization")
    parser.add_argument("--links", type=Path, help="Optional JSON mapping unique shape names to local file URIs")
    args = parser.parse_args()
    print(json.dumps(prepare(args.input, args.output, args.links), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
