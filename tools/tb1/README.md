# Generación local de TB1

Ejecutar desde la raíz del report. Las fuentes del informe son el Markdown y los diagramas editables; los binarios de entrega se guardan en `deliverables/tb1/`. `.tb1-build/` contiene intermediarios ignorados por Git.

## Entorno

Para landing/frontend usar Node.js 22.12+ o 24 y `npm ci` según cada README. Las capturas usan Playwright y Microsoft Edge instalado, sin perfil personal. Para los exports se utilizó el runtime local de documentos/presentaciones, con Node.js 24.19.0, Python, `python-docx`, ReportLab, Pillow, Marked y el generador de presentaciones. `CODEX_NODE_MODULES` puede señalar su carpeta de paquetes; `PRESENTATIONS_SKILL_DIR` puede señalar las utilidades de validación del generador. `TB1_BROWSER_CHANNEL` cambia el canal compatible instalado (por defecto `msedge`). Estas utilidades no se incluyen dentro del código de los productos.

## Orden de ejecución

1. Compilar y comprobar los dos proyectos de código. Iniciar landing en 5173 y frontend en 5174.
2. `node tools/tb1/capture.cjs`: capturas auténticas con datos ficticios en un perfil temporal y registro JSON.
3. `python tools/tb1/build_performance.py`: DOCX editable sin evaluación. En Windows, `./tools/tb1/export_performance.ps1` exporta mediante la interfaz Office-compatible instalada (WPS Writer en este equipo).
4. `node tools/tb1/build_keynote.mjs`: PPTX con tablas/diagramas nativos, comprobaciones estructurales y 22 renders. La utilidad de render del runtime puede finalizar con código 1 tras emitir los archivos; no se considera ese código una validación aprobada. Comprobar el recibo JSON, su SHA-256 contra el PPTX, las 22 imágenes y revisar visualmente antes de usarlo.
5. `python tools/tb1/export_keynote_pdf.py`: PDF de lectura de los 22 renders revisados. El PPTX sigue siendo la fuente editable.
6. Guardar commits de fuentes. `python tools/tb1/record_evidence.py --record` captura el historial al corte; luego, sin parámetros, verifica referencias Markdown locales.
7. `node tools/tb1/export_report.cjs`: PDF integral con imágenes locales resueltas. Revisar todas las páginas renderizadas antes de entregar.
8. `python tools/tb1/package_delivery.py`: manifiesto SHA-256 y ZIP con fuentes rastreadas, builds y entregables. No contiene `.git`, dependencias, archivos de entorno privados ni exportaciones personales anteriores.

El manifiesto identifica el commit de fuentes previo al commit del paquete, evitando una referencia circular al commit que contiene el ZIP. Tras guardar el paquete se integra la feature en `develop` mediante `--no-ff`. No ejecutar push, publicación o deployment como parte de estas utilidades.
