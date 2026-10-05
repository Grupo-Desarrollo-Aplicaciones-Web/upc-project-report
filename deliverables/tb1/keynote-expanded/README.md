# Presentación TB1 ampliada

Preparada el 04/10/2026 desde el informe y la evidencia al corte del 03/10/2026. Esta carpeta conserva una salida nueva; la presentación anterior de 22 diapositivas permanece en la carpeta superior.

## Archivos

- [PowerPoint editable](upc-pre-202620-1asi0730-16127-creditor-keynote-tb1.pptx): 40 diapositivas, notas completas y dos presentaciones personalizadas.
- [PDF de lectura](upc-pre-202620-1asi0730-16127-creditor-keynote-tb1.pdf): las mismas 40 diapositivas, sin las notas de orador.
- [Guion detallado y respuestas](../../../docs/tb1/guion-ppt-detallado.md).
- [Evidencia Git del corte de preparación](git-local-cut.md).
- [Inventario y rutas de exposición](MANIFEST.json).

## Recorridos y uso

En PowerPoint, abrir **Presentación con diapositivas → Presentación personalizada** y elegir:

| Recorrido | Selección | Objetivo de ensayo |
|---|---|---|
| Video 27 min 30 s | 1–36 | 27:30; máximo académico 30 min |
| Sustentación 12 min | 1, 2, 3, 4, 6, 9, 12, 16, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 36 | 12:00 |
| Consulta | 37–40 | Para preguntas; fuera del recorrido de video |

Los avances son manuales. Las duraciones son objetivos de ensayo e incluyen interacción con el navegador; no se configuran transiciones automáticas. Las notas separan guion de video y clase, expositor, acciones y límites de evidencia.

Las tablas y los diagramas principales se pueden editar en el PPTX. Las capturas de ejecución son imágenes de respaldo del corte. El estado inicial 100/0/100 se muestra como composición del escenario; las capturas posteriores muestran 100/30/70.

Los enlaces de consulta 38–40 apuntan a archivos reales del repositorio local. Para usarlos en otra computadora, conservar el report y actualizar las rutas locales. El PDF incluye enlaces de consulta equivalentes. Las notas identifican las fuentes oficiales y del curso.

La diapositiva 18 compara la composición desktop/móvil. Para leer los campos de los wireframes, abrir sus imágenes a tamaño completo: [dashboard desktop](../../../assets/ux/tb1/wireframe-dashboard.png), [dashboard móvil](../../../assets/ux/tb1/wireframe-dashboard-mobile.png), [compra desktop](../../../assets/ux/tb1/wireframe-purchase.png) y [compra móvil](../../../assets/ux/tb1/wireframe-purchase-mobile.png). En la exposición, ampliar el artefacto durante la explicación de campos; la lámina ofrece la comparación de estructura.

## Revisión del equipo

Antes de exponer o publicar, confirmar las fotografías, el reparto y los tiempos; ensayar la demo con fechas válidas y datos ficticios. Completar investigación S2/análisis, evidencias en herramientas, acuerdos y aceptación, deployment TB1, Performance validado por el líder y grabación MP4/Stream real según el control de entrega. La generación de esta presentación no acredita esas actividades.

## Reproducción y comprobación

Fuentes: `tools/tb1/build_keynote_expanded.mjs`, `prepare_keynote_expanded.py` y `export_keynote_expanded_pdf.py`. El generador requiere el runtime local documentado en el código o las variables `CODEX_NODE_MODULES` y `PRESENTATIONS_SKILL_DIR`. Genera candidatos nuevos en `.tb1-build/`, verifica el paquete y renderiza el PPTX final importado para revisión. El exportador PDF recibe esos renders; rechaza sobrescribir una salida existente.

Comprobaciones del paquete entregado: 40 slides y notas; recorridos 36/1650 s y 22/720 s; 19 tablas nativas; sumas 26 SP y 43 h; 12 enlaces locales; revisión visual de cada slide y PDF de 40 páginas equivalente a los renders. La comprobación de importación y renders no sustituye una apertura de ensayo en PowerPoint por el equipo.
