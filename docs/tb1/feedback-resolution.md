# Revisión de retroalimentación del informe

Se revisaron las observaciones y descriptores de evaluación suministrados por el equipo el 03/10/2026. El texto registra fortalezas en Lean UX, requisitos, backlog y arquitectura, y señala brechas en investigación, flujos/UI, landing y comunicación. Esta matriz describe la respuesta técnica local; no emite una nueva calificación ni declara cumplidas actividades que todavía requieren evidencia.

## Correcciones y evidencia por observación

| Observación recibida | Acción y artefacto revisable | Estado al corte |
|---|---|---|
| Benchmark incompleto y preguntas poco relacionadas con la investigación. | [Capítulo II](../02-requirements-elicitation-analysis.md): landscape funcional/comercial, fuentes, FODA, preguntas abiertas y relación hipótesis–pregunta–historia. Se corrigen referencias desactualizadas al alcance TB1. | Preparación documental local corregida; no se declara comparación de uso realizada. |
| Entrevistas parciales y Personas basadas en borradores. | [Control de entrevistas](../../assets/research/tb1/interview-review-checklist.csv), [cadena de evidencia de Personas](../../assets/research/tb1/persona-evidence-matrix.csv) y método de agrupación por variables operacionales. | **Abierto:** 3 registros S1 y 1 S2, faltan dos S2 y análisis con respuestas/citas/minutos. La etiqueta provisional se mantiene hasta sustentar las fichas. |
| User Flows cubren solo parte de las alternativas. | [Capítulo IV](../04-product-design.md): compra COMP-01–05, abono ABO-01–07 y consulta CON-01–05. Mermaid y wireflow incluyen cancelación de formulario/diálogo, datos inválidos, compras inexistentes/pagadas, vacíos y fallas de almacenamiento. | Diseño local alineado al código. La matriz distingue diseño revisado y escenarios con pruebas registradas. |
| Faltan wireframes y mockups móviles; prototipo sin evidencia completa. | Wireframes móviles de cinco pantallas, landing desktop/mobile y mockup del contacto móvil. [Fuentes y registro de capturas](../../assets/ux/tb1/README.md). | Activos locales incorporados. Figma, video de navegación y validación de usuarios continúan pendientes. |
| Tasks deben estimarse entre 4 y 8 horas. | [Sprint 2](../sprints/sprint-02.md): siete tareas que agrupan subtareas originales, preservando total 43 h estimadas y 26 SP. | Planificación propuesta ajustada; acuerdo del equipo y tablero externo pendientes. |
| Publicación y prueba de humo no verificadas. | [Evidencia local](evidencia-local.md): diferencia build/capturas y publicación histórica AV1. Se conserva deployment TB1 como pendiente. | **Abierto:** publicar nueva landing y primera frontend con autorización, registrar URL HTTPS, SHA, fecha/run y recorrido público. |
| No se adjuntó video y presentación con letras cortadas. | PPTX/PDF locales de 22 diapositivas disponibles; integridad, geometría y renders revisados. [Paquete TB1](../../deliverables/tb1/README.md). El guion contempla presentación ante cámara y demo. | Archivos locales preparados; falta MP4 real y enlace privado Stream. No se declara grabación creada. |
| Cada sección debe iniciar en página separada. | Exportador del report con salto por sección numerada, títulos padres agrupados con su primera subsección cuando no tienen contenido propio, índice con destinos por encabezado y tablas con encabezados repetidos. | Verificación del PDF y enlaces registrada en el paquete actualizado. |

## Cierre de evidencias del equipo

Para cerrar investigación se revisan los cuatro registros, se incorporan dos entrevistas S2 como mínimo y se derivan necesidades/Personas/mapas con fuentes y minutos. Para cerrar diseño en herramientas del curso se registran enlaces y exportaciones Figma, UXPressia y herramienta de wireflows. Para cerrar publicación y exposición se añaden URLs de deployment verificadas, grabación MP4, enlace de revisión Stream y evaluación del líder.

Cada cierre debe registrar evidencia y responsable reales. Los resultados técnicos, reuniones, aceptación del equipo y evaluación académica se revisan por separado. Las nuevas correcciones se guardan en `feature/report-rubric-improvements` y se integran localmente en `develop` con `--no-ff`; no se crea release ni se hace push.
