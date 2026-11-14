"""Export exactly 40 reviewed 16:9 PNG slide renders to a reading PDF.

Input names default to slides-01.png through slides-40.png. For another
render naming convention pass --pattern 'slide-{number:02d}.png'. The PDF
is a visual reading copy; editability and speaker notes remain in the PPTX.
Optional --links accepts a JSON array of {slide, url, rect} entries. Rectangles
are [left, top, width, height] in the 1280x720 slide coordinate system.
Run the PDF skill authoring marker before the first actual export.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import tempfile
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import url2pathname

from PIL import Image
from pypdf import PdfReader
from reportlab.pdfgen import canvas


SLIDE_COUNT = 40
SLIDE_WIDTH = 1280
SLIDE_HEIGHT = 720
PAGE_WIDTH = 960
PAGE_HEIGHT = 540


def slide_renders(folder: Path, pattern: str) -> list[Path]:
    folder = folder.resolve()
    if not folder.is_dir():
        raise NotADirectoryError(folder)
    slides = [folder / pattern.format(number=number) for number in range(1, SLIDE_COUNT + 1)]
    if len(set(slides)) != SLIDE_COUNT:
        raise ValueError("The filename pattern must produce 40 distinct slide names")
    expected_size = None
    for number, path in enumerate(slides, 1):
        if path.parent.resolve() != folder:
            raise ValueError("Render filenames must stay directly within the input folder")
        if not path.is_file():
            raise FileNotFoundError(f"Missing render for slide {number:02d}: {path}")
        with Image.open(path) as image:
            width, height = image.size
            if image.format != "PNG":
                raise ValueError(f"Render is not a PNG: {path.name}")
            if width <= 0 or height <= 0 or abs(width / height - 16 / 9) > 0.001:
                raise ValueError(f"Render is not 16:9: {path.name} ({width}x{height})")
            if expected_size is None:
                expected_size = (width, height)
            if image.size != expected_size:
                raise ValueError(f"Render dimensions are inconsistent: {path.name}")
            image.verify()
    return slides


def pdf_links(mapping_file: Path | None) -> list[dict]:
    if mapping_file is None:
        return []
    entries = json.loads(mapping_file.read_text(encoding="utf-8-sig"))
    if not isinstance(entries, list):
        raise ValueError("The links JSON must contain an array of link entries")
    links = []
    for index, entry in enumerate(entries, 1):
        if not isinstance(entry, dict):
            raise ValueError(f"Link {index} must be an object")
        slide = entry.get("slide")
        if type(slide) is not int or not 1 <= slide <= SLIDE_COUNT:
            raise ValueError(f"Link {index} slide must be an integer from 1 to 40")
        uri = entry.get("url")
        if not isinstance(uri, str):
            raise ValueError(f"Link {index} url must be a local file URI")
        parsed = urlsplit(uri)
        if parsed.scheme != "file" or parsed.netloc not in ("", "localhost") or parsed.query or parsed.fragment:
            raise ValueError(f"Link {index} must point directly to a local file")
        target = Path(url2pathname(parsed.path))
        if not target.is_absolute() or not target.is_file():
            raise ValueError(f"Link {index} target does not exist as a local file: {target}")
        rectangle = entry.get("rect")
        if not isinstance(rectangle, list) or len(rectangle) != 4 or any(
            type(value) not in (int, float) or not math.isfinite(value) for value in rectangle
        ):
            raise ValueError(f"Link {index} rect must contain four finite numbers")
        left, top, width, height = rectangle
        if left < 0 or top < 0 or width <= 0 or height <= 0 or left + width > SLIDE_WIDTH or top + height > SLIDE_HEIGHT:
            raise ValueError(f"Link {index} rect must stay inside the 1280x720 slide")
        pdf_rectangle = (
            left * PAGE_WIDTH / SLIDE_WIDTH,
            (SLIDE_HEIGHT - top - height) * PAGE_HEIGHT / SLIDE_HEIGHT,
            (left + width) * PAGE_WIDTH / SLIDE_WIDTH,
            (SLIDE_HEIGHT - top) * PAGE_HEIGHT / SLIDE_HEIGHT,
        )
        links.append({"slide": slide, "url": target.resolve().as_uri(), "rect": pdf_rectangle})
    return links


def export_pdf(folder: Path, output: Path, pattern: str, links_file: Path | None = None) -> dict:
    output = output.resolve()
    if output.exists():
        raise ValueError("Use a new PDF destination; preserve previous exports")
    slides = slide_renders(folder, pattern)
    links = pdf_links(links_file)
    output.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=".keynote-reading-", suffix=".pdf", dir=output.parent)
    os.close(descriptor)
    temporary = Path(temporary_name)
    try:
        pdf = canvas.Canvas(str(temporary), pagesize=(PAGE_WIDTH, PAGE_HEIGHT), pageCompression=1)
        pdf.setTitle("CREDITOR - TB1 Stage Review - 40 diapositivas")
        pdf.setAuthor("Miguel Angel Egocheaga Suyo")
        pdf.setSubject("36 diapositivas de exposición y 4 de consulta; preparación local")
        for number, slide in enumerate(slides, 1):
            pdf.bookmarkPage(f"slide-{number:02d}")
            pdf.addOutlineEntry(f"Diapositiva {number:02d}", f"slide-{number:02d}", level=0)
            pdf.drawImage(str(slide), 0, 0, width=PAGE_WIDTH, height=PAGE_HEIGHT, mask="auto")
            for link in links:
                if link["slide"] == number:
                    pdf.linkURL(link["url"], rect=link["rect"], relative=0, thickness=0)
            pdf.showPage()
        pdf.save()
        reader = PdfReader(temporary)
        if len(reader.pages) != SLIDE_COUNT:
            raise ValueError(f"PDF must contain 40 pages, found {len(reader.pages)}")
        annotation_count = 0
        for number, page in enumerate(reader.pages, 1):
            if abs(float(page.mediabox.width) - PAGE_WIDTH) > 0.01 or abs(float(page.mediabox.height) - PAGE_HEIGHT) > 0.01:
                raise ValueError(f"Unexpected PDF page dimensions: {number}")
            contents = page.get_contents()
            if contents is None or not contents.get_data():
                raise ValueError(f"Empty PDF page: {number}")
            annotations = page.get("/Annots", [])
            annotation_count += len(annotations)
            for annotation_reference in annotations:
                annotation = annotation_reference.get_object()
                action = annotation.get("/A", {})
                if annotation.get("/Subtype") != "/Link" or action.get("/S") != "/URI":
                    raise ValueError(f"Unexpected PDF annotation on page {number}")
        if annotation_count != len(links):
            raise ValueError(f"PDF must contain {len(links)} link annotations, found {annotation_count}")
        if output.exists():
            raise ValueError("Destination appeared during export; refusing overwrite")
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)
    return {"output": str(output), "pages": SLIDE_COUNT, "pageSizePoints": [PAGE_WIDTH, PAGE_HEIGHT],
            "sourcePattern": pattern, "linkAnnotations": annotation_count,
            "format": "16:9 reading PDF from reviewed PNG renders"}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True, help="Folder containing the 40 reviewed PNG renders")
    parser.add_argument("--output", type=Path, required=True, help="New 40-page PDF destination")
    parser.add_argument("--pattern", default="slides-{number:02d}.png", help="Render filename pattern, using {number}")
    parser.add_argument("--links", type=Path, help="JSON array of local-file links with slide numbers and 1280x720 rectangles")
    args = parser.parse_args()
    print(json.dumps(export_pdf(args.input, args.output, args.pattern, args.links), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
