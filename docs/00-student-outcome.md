# Capítulo 00: Student Outcome

## 00.8 Criterio: liderazgo y trabajo en equipo

El equipo evidencia la capacidad de colaborar mediante la distribución del informe por especialidad, el uso de control de versiones y la integración progresiva de los artefactos. La atribución siguiente se basa en el historial de `develop` al 18 de septiembre de 2026.

### 00.8.1 Aporte individual verificable

| Integrante | Rol evidenciado en AV1 | Decisiones y artefactos aportados | Evidencia |
|---|---|---|---|
| Juan Manuel Santos Torres | Análisis de producto, planificación y validación | Desarrolló la problemática y Lean UX, organizó Sprint 1 y definió protocolos, métricas e inspección heurística. | [`6d5670c`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/6d5670c), [`d8db0dd`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/d8db0dd), [`b4aaeb3`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/b4aaeb3) |
| Sebastián Gutarra Velapatiño | Diseño visual e integración de evidencias de investigación | Construyó la base visual del capítulo IV, incorporó wireframes y mock-ups, actualizó registros de entrevista y añadió recursos de User Personas. | [`89330c9`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/89330c9), [`7c41cda`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/7c41cda), [`25f9923`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/25f9923) |
| Miguel Angel Egocheaga Suyo | Coordinación documental, requisitos y arquitectura | Estructuró el repositorio, desarrolló requisitos y backlog, completó los diagramas de software y datos, y coordinó su integración mediante ramas y Pull Requests. | [`a4e85c6`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/a4e85c6), [`030e618`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/030e618), [`3086a32`](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/3086a32), [PR #1](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/pull/1) |

### 00.8.2 Relación entre los aportes

1. Juan definió el problema, los supuestos y el plan de validación que orientan qué debe comprobar el producto.
2. Sebastián convirtió parte de esa dirección en lenguaje visual mediante la guía de estilo, los wireframes, mock-ups y recursos de personas.
3. Miguel conectó las necesidades y artefactos visuales con historias, flujos, arquitectura, clases y un modelo relacional revisable.
4. La combinación de estos aportes permite recorrer el proyecto desde el problema hasta la solución propuesta, sin afirmar que las actividades pendientes ya fueron ejecutadas.

### 00.8.3 Evidencia de liderazgo compartido

| Situación | Liderazgo observado | Resultado documentado | Límite de la evidencia |
|---|---|---|---|
| Definición del problema | Juan impulsó la redacción de antecedentes, 5W2H, Lean UX y segmentos. | Base del capítulo I para orientar entrevistas y diseño. | Las hipótesis necesitan contraste con usuarios. |
| Dirección visual | Sebastián avanzó Style Guidelines, recursos de marca y diseño de landing. | Base visual reutilizada en el capítulo IV. | Los mock-ups finales y el prototipo todavía requieren revisión. |
| Organización técnica | Miguel estructuró requisitos, diagramas y modelo de datos, y preparó su integración. | Diseño trazable desde historias hasta SQL propuesto. | La aplicación, API y base desplegada no forman parte de la evidencia actual. |
| Validación y Sprint 1 | Juan detalló planificación, criterios, protocolo e inspección heurística. | Procedimiento documentado para evaluar la landing. | El procedimiento no acredita por sí mismo la ejecución de pruebas. |
| Corrección colaborativa | Sebastián corrigió enlaces, imágenes y registros; Miguel integró aportes visuales en diagramas y documentación. | Informe más consistente y artefactos reutilizables. | Debe registrarse la aprobación de revisores en futuros PR. |

## 00.9 Criterio: entorno colaborativo, planificación y cumplimiento

### 00.9.1 Prácticas utilizadas

| Práctica | Aplicación en CREDITOR | Evidencia actual | Mejora necesaria |
|---|---|---|---|
| Planificación | Historias, Sprint Goal, tareas estimadas y criterios de aceptación para la landing. | Capítulos III y V; commits de Juan y Miguel. | Reemplazar responsables “propuestos” por asignaciones confirmadas cuando corresponda. |
| Especialización | Producto/validación, diseño visual y arquitectura/documentación se distribuyeron entre los integrantes. | Matriz de responsabilidad del capítulo 00. | Evitar que una sola persona concentre las revisiones finales. |
| Control de versiones | Cada integrante registra commits con una identidad vinculable. | Historial de `develop` y perfiles de GitHub. | Unificar alias de autor y mensajes con Conventional Commits. |
| Integración | Ramas de documentación y Pull Requests incorporan cambios hacia `develop`. | [PR #1](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/pull/1), [PR #2](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/pull/2) y [PR #3](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/pull/3). | Mantener el mismo flujo para todo cambio futuro. |
| Calidad | Se corrigieron enlaces, sintaxis de imágenes, diagramas y consistencia del informe. | Commits `b60fc68`, `1a03c2d`, `e6a4efe` y verificaciones locales. | Añadir una revisión cruzada antes de fusionar cada rama. |
| Transparencia | El informe identifica diseño propuesto y evidencia pendiente. | Capítulos II, IV, V y checklist de AV1. | Completar entrevistas, prototipo, despliegue y videos con evidencia auténtica. |

### 00.9.2 Cumplimiento por integrante

| Integrante | Entregables asumidos y observados | Estado al corte | Próximo compromiso documentable |
|---|---|---|---|
| Juan Manuel Santos Torres | Capítulo I, planificación de Sprint 1, protocolo e inspección heurística. | Aportes integrados en `develop`. | Registrar la ejecución de las pruebas o entrevistas que le correspondan, con evidencia autorizada. |
| Sebastián Gutarra Velapatiño | Style Guidelines, Landing UI Design, bocetos web, entrevistas y recursos de User Personas. | Aportes integrados en `develop`. | Revisar los mock-ups finales para alinearlos con compras a crédito y validar los enlaces de investigación. |
| Miguel Angel Egocheaga Suyo | Estructura del informe, requisitos, arquitectura, base de datos, checklist e integración. | Aportes integrados en `develop`; capítulo 00 preparado en rama local. | Coordinar revisión del capítulo 00 y mantener trazabilidad de los siguientes PR. |

## 00.10 Reflexión del equipo

La evidencia muestra aportes complementarios. Juan fortaleció el planteamiento del producto y la forma de evaluarlo; Sebastián aportó la dirección visual y recursos de investigación; Miguel articuló requisitos, arquitectura y control documental. La colaboración produjo un informe más amplio que el trabajo aislado de cada integrante.

El equipo todavía debe mejorar la revisión cruzada y la consistencia del flujo Git. Los Pull Requests recientes permiten revisar cambios antes de integrarlos, pero varios aportes anteriores ingresaron mediante cargas directas. Para las siguientes entregas, cada bloque deberá pasar por una rama específica, una revisión de otro integrante y un enlace de evidencia en esta sección.

## 00.11 Evidencias que no deben declararse sin respaldo

Para preservar la validez académica, el capítulo 00 no atribuye reuniones, entrevistas, pruebas, despliegues, horas trabajadas o aprobaciones que el repositorio no demuestra. Cuando esas actividades se completen, se registrarán con responsable, fecha, resultado y enlace autorizado. De esta forma, el Student Outcome refleja contribuciones reales y permite que el docente compruebe la participación de cada integrante.
