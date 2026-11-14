"""Export the verified slide renders to a 16:9 reading PDF."""
from pathlib import Path
from reportlab.pdfgen import canvas
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
BUILD = ROOT / '.tb1-build/keynote'
OUT = ROOT / 'deliverables/tb1/upc-pre-202620-1asi0730-16127-creditor-keynote-tb1.pdf'

def build():
    slides = sorted(BUILD.glob('slide-*.png'))
    if len(slides) != 22:
        raise RuntimeError(f'Expected 22 reviewed slide renders, found {len(slides)}')
    pdf = canvas.Canvas(str(OUT), pagesize=(960, 540))
    pdf.setTitle('CREDITOR TB1 Stage Review')
    pdf.setAuthor('Miguel Angel Egocheaga Suyo')
    for slide in slides:
        with Image.open(slide) as image:
            if image.size != (1280, 720):
                raise RuntimeError(f'Unexpected slide size: {slide.name} {image.size}')
        pdf.drawImage(str(slide), 0, 0, width=960, height=540)
        pdf.showPage()
    pdf.save()
    print(OUT)

if __name__ == '__main__':
    build()
