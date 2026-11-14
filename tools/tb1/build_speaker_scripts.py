"""Build the three individual rehearsal documents from their Markdown sources.

Run with the bundled Python runtime. PDF export uses the separate Word helper,
so both formats preserve the same native document pagination.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[2]
PEOPLE = ("juan-manuel", "sebastian", "miguel-angel")


def plain(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    return text.replace("**", "").replace("`", "").strip()


def add_inline(paragraph, text: str) -> None:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    for index, part in enumerate(text.split("**")):
        run = paragraph.add_run(part.replace("`", ""))
        run.bold = bool(index % 2)


def set_style(style, size: float, before=0, after=6, keep=False):
    style.font.name = "Arial"
    style.font.size = Pt(size)
    style.font.color.rgb = RGBColor(0, 0, 0)
    style.paragraph_format.space_before = Pt(before)
    style.paragraph_format.space_after = Pt(after)
    style.paragraph_format.line_spacing = 1.12
    style.paragraph_format.keep_with_next = keep
    style.paragraph_format.widow_control = True


def add_page_number(paragraph):
    field = OxmlElement("w:fldSimple")
    field.set(qn("w:instr"), "PAGE")
    field.set(qn("w:dirty"), "true")
    field_run = OxmlElement("w:r")
    properties = OxmlElement("w:rPr")
    size = OxmlElement("w:sz")
    size.set(qn("w:val"), "18")
    properties.append(size)
    field_run.append(properties)
    text = OxmlElement("w:t")
    text.text = "1"
    field_run.append(text)
    field.append(field_run)
    paragraph._p.append(field)


def build(person: str, output: Path) -> Path:
    source = ROOT / "docs" / "tb1" / "expositores" / f"{person}.md"
    lines = source.read_text(encoding="utf-8-sig").splitlines()
    document = Document()
    for element in (document.styles.element, document.element):
        for border in list(element.iter(qn("w:pBdr"))):
            border.getparent().remove(border)
    section = document.sections[0]
    section.page_width, section.page_height = Inches(8.5), Inches(11)
    section.top_margin = Inches(0.75)
    section.bottom_margin = Inches(0.75)
    section.left_margin = section.right_margin = Inches(0.85)
    section.footer_distance = Inches(0.35)
    set_style(document.styles["Normal"], 11.5)
    set_style(document.styles["Title"], 21, after=9, keep=True)
    set_style(document.styles["Subtitle"], 10.5, after=7, keep=True)
    set_style(document.styles["Heading 1"], 15, before=16, after=8, keep=True)
    set_style(document.styles["Heading 2"], 12.5, before=12, after=5, keep=True)
    set_style(document.styles["List Bullet"], 10.5, after=5)
    for style_name in ("Timing", "Action", "Label", "Intro"):
        style = document.styles.add_style(style_name, 1)
        style.base_style = document.styles["Normal"]
    set_style(document.styles["Timing"], 10.5, after=5, keep=True)
    set_style(document.styles["Action"], 10.5, after=8)
    set_style(document.styles["Label"], 10.5, after=3, keep=True)
    set_style(document.styles["Intro"], 10.5, after=7)
    document.styles["Label"].font.bold = True

    name = plain(lines[0]).removeprefix("# Guion de exposición TB1 para ")
    title = document.add_paragraph("CREDITOR · Guion de exposición TB1", "Subtitle")
    title.paragraph_format.keep_with_next = True
    document.add_paragraph(name, "Title")
    in_body = False
    label = None
    sources = False
    for line in lines[1:]:
        if not line.strip():
            continue
        if line.startswith("## "):
            in_body = True
            label = None
            if line == "## Fuentes y apoyo":
                sources = True
                continue
            heading = document.add_paragraph(plain(line[3:]), "Heading 1")
            if "video" in line:
                heading.paragraph_format.page_break_before = True
            continue
        if line.startswith("### "):
            label = None
            document.add_paragraph(plain(line[4:]), "Heading 2")
            continue
        if line.startswith("**Tiempo:"):
            add_inline(document.add_paragraph(style="Timing"), line)
            continue
        if line.startswith("**Qué decir:"):
            label = "speech"
            add_inline(document.add_paragraph(style="Label"), line)
            continue
        if line.startswith("**Qué mostrar:"):
            label = "action"
            p = document.add_paragraph(style="Action")
            p.paragraph_format.keep_together = True
            add_inline(p, line)
            continue
        if line.startswith("- "):
            add_inline(document.add_paragraph(style="List Bullet"), line[2:])
            continue
        p = document.add_paragraph(style="Intro" if sources or not in_body else "Normal")
        text = line
        if sources:
            text = "**Fuentes y apoyo.** " + text
            sources = False
        if label == "speech" and text[-1:] not in ".!?…":
            text += "."
        if label == "speech":
            p.paragraph_format.keep_with_next = True
            p.paragraph_format.keep_together = True
        add_inline(p, text)

    footer = section.footer.paragraphs[0]
    footer.alignment = 2
    add_page_number(footer)
    for run in footer.runs:
        run.font.name = "Arial"
        run.font.size = Pt(9)
        run.font.color.rgb = RGBColor(0, 0, 0)
    props = document.core_properties
    props.title = f"Guion de exposición TB1 — {name}"
    props.subject = "Rutas de clase de 12:00 y video de 27:30"
    props.author = "Miguel Angel Egocheaga Suyo"
    props.keywords = "CREDITOR, TB1, exposición, guion"
    props.comments = ""
    output.mkdir(parents=True, exist_ok=True)
    target = output / f"creditor-tb1-guion-{person}.docx"
    document.save(target)
    print(target)
    return target


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=ROOT / "deliverables/tb1/expositores")
    args = parser.parse_args()
    for person in PEOPLE:
        build(person, args.output_dir)


if __name__ == "__main__":
    main()
