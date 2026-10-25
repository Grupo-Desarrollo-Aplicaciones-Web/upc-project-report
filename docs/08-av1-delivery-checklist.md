# Control de entrega AV1

Esta lista organiza los entregables de AV1. Un ítem solo se marca como listo al tener su archivo, enlace o evidencia verificable.

| Entregable | Evidencia esperada | Estado actual |
|---|---|---|
| Project Report | Informe completo, PDF exportado y repositorio Markdown actualizado. | Estructura y borradores avanzados; faltan evidencias de investigación, prototipos y datos académicos. |
| Keynote | Archivo editable y PDF con producto, equipo, avance y fotos autorizadas. | Pendiente. |
| Individual Member Performance Report | Documento del líder con aportes verificables de cada integrante. | Pendiente. |
| Supporting files | ZIP con artefactos necesarios para la evaluación. | Pendiente de definir contenido final. |
| Landing Page | URL HTTPS, commit desplegado, captura y verificación. | Pendiente de rebranding, correcciones y despliegue. |
| Video About-the-Product | Video privado de Microsoft Stream y MP4, enlazado en anexos. | Pendiente. |
| Video About-the-Team | Video privado de Microsoft Stream y MP4, enlazado en anexos. | Pendiente. |

## Revisión previa a publicación

1. Confirmar NRC, docente, fecha y perfiles de GitHub de todos los integrantes.
2. Completar seis o más entrevistas autorizadas, sus enlaces privados y el análisis por segmento.
3. Sustituir los borradores de personas, journey maps, empathy maps, EventStorming e Impact Map por artefactos con fuentes y capturas.
4. Revisar User Stories, prioridades y Sprint Backlog con los resultados de investigación.
5. Crear y enlazar wireframes, mock-ups y prototipo navegable reales.
6. Publicar la landing CREDITOR y registrar URL, proveedor, commit y verificación.
7. Verificar que cada integrante tenga contribuciones propias antes de preparar el PDF final.
8. Crear una rama `release/av1.0.0` solo cuando la lista esté completa y la versión sea revisable.

## Revisión del índice del capítulo IV frente al enunciado

El capítulo IV es parte de AV1. «Diseño documentado» significa que hay una especificación y un diagrama revisable; no equivale a prototipo aprobado, implementación o evidencia de una sesión de equipo.

| Ítem | Estado del informe | Evidencia que falta para cerrar AV1 |
|---|---|---|
| 4.1 Style Guidelines | Guías generales y web documentadas con marca, tipografía, colores y reglas de accesibilidad. | Verificar su aplicación en la landing final. |
| 4.2 Information Architecture | Mapa visual, organización, etiquetas, metadatos, búsqueda y navegación definidos. | Validar etiquetas y destinos de CTA con usuarios y aplicación real. |
| 4.3 Landing Page UI Design | Wireframes y mock-ups de referencia adjuntos. | Actualizar y enlazar las vistas finales en Figma. |
| 4.4 Web Applications UX/UI Design | Pantallas, wireflow y cinco User Flows visuales especificados. Se conservaron el wireframe y mock-up aportados por el equipo. | Ajustar el mock-up de préstamo al flujo de compra prioritario, completar pantallas y revisar los flujos en Figma o herramienta equivalente. |
| 4.5 Web Applications Prototyping | Recorridos y criterios de interacción definidos. | Prototipo navegable de escritorio/móvil, enlace y video de navegación. |
| 4.6 Domain-Driven Software Architecture | EventStorming de diseño propuesto y diagramas de contexto, contenedores y componentes renderizados. | Sesión colaborativa documentada; revisión de límites de dominio y servicio externo elegido. |
| 4.7 Software Object-Oriented Design | Diagrama de clases con atributos, métodos, enumeraciones, relaciones y multiplicidades. | Revisión contra las clases C# cuando exista el backend. |
| 4.8 Database Design | Diagrama general y diagramas por contexto, con tablas, columnas, claves y restricciones respaldadas por SQL. | Aplicar migraciones en PostgreSQL y comprobar integridad con datos de prueba cuando exista la API. |

El enunciado permite Mermaid como Diagram-as-Code para UML, C4, ERD y EventStorming. Los SVG del capítulo IV se generaron desde fuentes `.mmd` editables. Las capturas de Figma, UXPressia, entrevistas, despliegue y colaboración solo se incorporarán cuando el equipo las produzca realmente.
