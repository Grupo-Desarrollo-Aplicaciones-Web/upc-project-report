"""Synchronize chapter views from the canonical README without duplicating sources."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]

def section(text, title):
    match = re.search(r"^" + re.escape(title) + r"\n.*?(?=^#{1," + str(len(title.split()[0])) + r"} |\Z)", text, re.M | re.S)
    if not match:
        raise ValueError("Missing canonical section: " + title)
    return match[0].rstrip() + "\n"

def relative_links(text):
    # Canonical source paths begin at repository root; chapter views live in docs.
    text = re.sub(r"(?<=\()(assets/|database/|docs/|deliverables/|CONTRIBUTING\.md)", r"../\1", text)
    return re.sub(r'((?:src|href)=["\'])(assets/|database/|docs/|deliverables/)', r"\1../\2", text)

def build(check=False):
    text = (ROOT / "README.md").read_text(encoding="utf-8-sig")
    chapters = {
        "00-student-outcome.md": "# Student Outcome 5",
        "01-introduction.md": "# Capítulo I: Introducción",
        "02-requirements-elicitation-analysis.md": "# Capítulo II: Requirements Elicitation & Analysis",
        "03-requirements-specification.md": "# Capítulo III: Requirements Specification",
        "04-product-design.md": "# Capítulo IV: Product Design",
        "05-implementation-validation-deployment.md": "# Capítulo V: Product Implementation, Validation & Deployment",
        "06-conclusions-recommendations.md": "# Conclusiones y recomendaciones",
    }
    content = {name: section(text, title) for name, title in chapters.items()}
    content["00-project-information.md"] = "# Información del proyecto y versiones\n\n" + section(text, "## Registro de Versiones del Informe") + "\n" + section(text, "## Project Report Collaboration Insights") + "\n" + section(text, "## A. Información académica y trazabilidad histórica")
    content["07-bibliography-appendices.md"] = section(text, "# Bibliografía") + "\n" + section(text, "# Anexos")
    mismatch = []
    for name, body in content.items():
        # Cross-chapter fragments stay tied to the canonical document.
        body = re.sub(r"\]\(#([^)]*)\)", r"](../README.md#\1)", body)
        body = relative_links(body)
        note = "> Vista sincronizada del [informe canónico](../README.md), corte AV2 13/11/2026. Para editar contenido, modificar README y ejecutar `python tools/report/sync_chapters.py`.\n\n"
        expected = note + body
        target = ROOT / "docs" / name
        if not target.exists() or target.read_text(encoding="utf-8-sig") != expected:
            mismatch.append(name)
            if not check:
                target.write_text(expected, encoding="utf-8")
    if check and mismatch:
        raise SystemExit("Chapter views out of date: " + ", ".join(mismatch))
    print("Chapter views checked:", len(content), "; updated:" if not check else "; mismatches:", len(mismatch))

if __name__ == "__main__":
    build("--check" in sys.argv)
