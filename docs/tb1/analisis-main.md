# Auditoría de preparación para TB1 de CREDITOR

## 1. Base de la comparación

| Dato | Referencia |
|---|---|
| Fecha de revisión | 3 de octubre de 2026, America/Lima |
| Repositorio del informe | `Grupo-Desarrollo-Aplicaciones-Web/upc-project-report` |
| Versión evaluada | `main`, commit `57c0bd182c1750be143cfe23e75bc9382499fa9b` |
| Rama remota de integración observada | `origin/develop`, commit `e684054336942cc734267be936791da6df1f7a93` |
| Documento del curso | `upc-pre-202620-1asi0730-final_project-statement-abet_v1.pdf`, 43 páginas |
| Alcance del hito | TB1, Stage Review, semana 7: páginas 31–32 |
| Requisitos transversales y formatos | Páginas 2–4, 7, 20–30 y anexos A–C, páginas 37–39 |

El documento del curso define los entregables y sus contenidos. No se localizó una rúbrica adicional de TB1 con ponderaciones; este análisis no estima una nota. El archivo local `Final Project - Sprint Review (TB1).pdf` corresponde a Aula Match y al curso Especificación y Análisis de Requerimientos, por lo que fue excluido.

Las rutas y líneas citadas a continuación corresponden al contenido congelado de `main` en el commit indicado. Las evidencias externas verificadas se presentan aparte. Un archivo no acreditado en `main` puede existir fuera del repositorio; su ausencia aquí no demuestra que nunca se haya elaborado.

## 2. Qué exige TB1

1. Informe actualizado, con Registro de Versiones, Project Report Collaboration Insights y Student Outcome ampliados para TB1.
2. Artefactos de las etapas previas corregidos y mejorados.
3. Una nueva versión de la landing page desplegada.
4. La primera versión de Frontend Web Applications desplegada.
5. Sprint 2 documentado con sus ocho apartados, `5.2.2.1` a `5.2.2.8`.
6. Conclusiones, bibliografía y anexos actualizados.
7. Project Report en PDF, Keynote en PPTX/PDF, Performance Report del líder en DOCX/PDF y ZIP de archivos complementarios.
8. Video de exposición y sustentación conforme a las reglas generales del curso.

La primera publicación de Web Services, Video About-the-Product y Video About-the-Team está indicada para **AV2**, no como un despliegue obligatorio adicional de TB1. TB1 conserva el apartado de documentación de servicios: debe explicar el avance real, los contratos disponibles y las dependencias de integración, aunque el servicio todavía no esté desplegado.

## 3. Diagnóstico principal

`main` contiene una base amplia de AV1: introducción, competencia, guiones, cuatro registros de entrevistas, nueve historias funcionales, historias técnicas, diseño visual, diagramas Mermaid, C4, UML, ERD y SQL. El diseño de base de datos ya existe; el principal bloqueo de TB1 es pasar del diseño a una aplicación frontend ejecutable y demostrable, junto con la actualización del Sprint 2 y sus evidencias.

| Prioridad | Bloque | Estado observado | Criterio de cierre |
|---|---|---|---|
| P0 | Primera aplicación frontend | No acreditada en `main` ni en los repositorios locales/remotos visibles consultados. | Repositorio identificable, versión compilada, URL HTTPS, navegación funcional y evidencia de los escenarios acordados. |
| P0 | Nueva landing para TB1 | Existe publicación de septiembre; conserva CreditFlow y el enfoque de créditos a clientes. | Incremento CREDITOR verificable frente a AV1, CTA por segmento hacia la aplicación y registro del nuevo despliegue. |
| P0 | Sprint 2, 5.2.2.1–8 | `docs/sprints/sprint-02.md` es una instrucción de tres líneas; capítulo V solo desarrolla Sprint 1. | Ocho apartados con planificación, responsables, tareas y evidencias reales. |
| P1 | Investigación y artefactos previos | Cuatro entrevistas registradas; análisis, mapas y varios diseños siguen como borradores. | Registros completos por segmento y trazabilidad de hallazgos hasta historias y pantallas. |
| P1 | Capítulo 00 y cierre | Corte de septiembre y enfoque AV1. | Evidencias TB1 para los tres integrantes y estados coherentes con Sprint 2. |
| P1 | Paquete de entrega | No acreditado como versión TB1 en `main`. | Archivos completos, nomenclatura del curso, permisos revisados y contenido consistente. |
| P1 | GitFlow y acceso | Ramas divergentes, guía incompleta y report privado. | Plan de integración sin pérdida de contenido; convenciones completas y acceso de evaluación conforme al enunciado. |

P0 identifica requisitos centrales que impiden cerrar TB1. P1 identifica correcciones y evidencias necesarias para una entrega consistente. P2 identifica mejoras de cobertura y coherencia de los artefactos. Estas prioridades son de trabajo, no ponderaciones del docente.

## 4. Faltantes por numeración del informe

### 4.1 Capítulo 00, carátula e índice

1. **Registro de Versiones y Collaboration Insights.** `docs/00-project-information.md:5–24,55–83` conserva el corte del 18/09, una matriz de AV1 y una referencia a la rama local del capítulo 00. Añadir el incremento TB1, correcciones recibidas, decisiones y evidencia de colaboración del informe. Cierre: cambios y fechas vinculados a commits reales, junto con capturas de analíticos de GitHub y contribuciones de los tres integrantes.
2. **Student Outcome.** `docs/00-student-outcome.md:5–61` explica AV1, pero no los resultados de Sprint 2. Ampliar los dos criterios del Anexo A con acciones por integrante y conclusiones de TB1. Cierre: liderazgo, colaboración, objetivos, planificación y cumplimiento respaldados por artefactos, sin atribuir actividades por suposición.
3. **Carátula e índice.** `README.md` mantiene agosto de 2026 y enlaza únicamente archivos de capítulos. Actualizar entrega y fecha, mantener los tres integrantes y construir un índice navegable hasta cuatro niveles, incluyendo Sprint 2. Cierre: enlaces correctos y estructura conservada en el PDF completo.

### 4.2 Capítulo I y Capítulo II

4. **1.2.2.3 y 2.2.1: trazabilidad de hipótesis.** Las cinco hipótesis `H-01` a `H-05` de `docs/01-introduction.md:75–79` no coinciden con las cuatro etiquetas de `docs/02-requirements-elicitation-analysis.md:199–202`. Mantener dashboard, compra, abono, préstamo y reportes con los mismos IDs. Cierre: cada hipótesis enlaza preguntas y evidencia pertinente.
5. **2.2.2 Registro de entrevistas.** `docs/02-requirements-elicitation-analysis.md:212–217` registra tres entrevistas S1 y una S2, con dos S2 pendientes; la línea 219 afirma que no hay entrevistas. Corregir el estado y completar la meta del enunciado de tres a cinco entrevistas por segmento. Cierre: información requerida, resumen individual, captura, video consolidado en Stream con permisos y tiempos; no basta con quitar las filas pendientes. Los cuatro enlaces actuales son YouTube y no acreditan por sí solos el formato de entrega en Stream.
6. **2.2.3 Análisis de entrevistas.** La sección `:223–242` describe un método, pero no hallazgos. Codificar los videos/notas disponibles, citar participantes y tiempos, diferenciar coincidencias y diferencias entre segmentos. Cierre: síntesis trazable que modifica o confirma necesidades, supuestos y prioridades. No generar citas ni resultados sin revisar las entrevistas.
7. **2.3.1 User Personas.** Las imágenes de Rosa y Diego en `assets/research/` incluyen `MARKET SIZE 80 %` y datos demográficos/conductuales sin fuente; la sección `:247` las declara provisionales. Reconstruir las fichas en UXPressia a partir del análisis real, retirar porcentajes sin sustento y conservar referencias. Cierre: personas coherentes con los segmentos y con los datos investigados.
8. **2.3.2 User Task Matrix.** `:263–272` contiene valoraciones iniciales. Revisar frecuencia, importancia y comparación entre segmentos con los relatos disponibles. Cierre: criterio de valoración explicado y prioridad consistente con el Product Backlog.
9. **2.3.3, 2.3.4 y 2.3.5: Journey, Empathy y As-Is.** `:274–303` contiene tablas de preparación; las carpetas correspondientes solo tienen guías. Crear mapas por segmento en UXPressia, con etapas, tareas, puntos de contacto, dolores y oportunidades sustentados. Cierre: capturas y enlaces revisables acompañados de análisis y referencias a entrevistas.
10. **2.4 Big Picture EventStorming y 1.2.2.4 Lean UX Canvas.** El flujo inicial de `:307–327` y el canvas deben revisarse con el dominio de cuentas por pagar y los hallazgos. Cierre: actores, eventos, comandos, políticas, decisiones y límites consistentes; evidencia de la sesión cuando se declare realizada. Las metas del canvas deben identificarse como metas y usar las cinco hipótesis del texto.

### 4.3 Capítulo III

11. **3.1 User Stories.** Existe una base reutilizable de `US-001` a `US-009` y `TS-001` a `TS-003`, pero las Epics E-01–05 solo aparecen como referencias. Completar la tabla de Epics/Stories, revisar criterios con investigación y añadir escenarios de saldo cero, abono superior al saldo, importes inválidos, moneda, datos incompletos y fallo de carga. Definir qué significa comprobante permitido o abono válido. Cierre: IDs únicos y relación historia → tarea → pantalla → prueba; criterios observables que expresen comportamiento y reglas de negocio.
12. **3.2 Impact Mapping.** `docs/03-requirements-specification.md:32–44` tiene un objetivo de usabilidad y una tabla, pero mantiene pendiente la versión UXPressia. Completar objetivos de negocio SMART con plazo, el mapa visual goal/actors/impacts/deliverables y las métricas. Cierre: captura/enlace, Personas identificadas y conexión con historias; el objetivo 4 de 5 sigue siendo una meta hasta medirlo.
13. **3.3 Product Backlog.** `:50–63` marca las historias de Sprint 2 como planificadas. Añadir las descripciones de historias y las historias técnicas con estimación/prioridad, reflejar alcance real y estado, e incorporar el tablero en Trello/Jira/YouTrack requerido por el curso. Cierre: tablero accesible, captura y tabla textual consistente con Sprint Backlog 2.

### 4.4 Capítulo IV

14. **4.1 y 4.2: estilo y arquitectura de información.** Aplicar las guías a la landing y frontend, incluyendo Material Design, componentes PrimeVue, vocabulario del negocio, etiquetas, filtros y navegación por segmento. Cierre: tokens y componentes identificables en pantallas implementadas; destinos de CTA verificables.
15. **4.3: landing wireframes y mock-ups.** `docs/04-product-design.md:114–130` conserva imágenes con cartera de créditos a clientes y promesas comerciales. Actualizar en Figma la composición desktop/mobile para compras a crédito, proveedores, abonos y vencimientos. Cierre: pantallas coherentes con la nueva landing, con textos y enlaces finales.
16. **4.4.1 y 4.4.3: wireframes y mock-ups web.** `:136–168` especifica varias vistas, pero las imágenes solo cubren una operación genérica/préstamo. Completar dashboard, compras, nueva compra, detalle y abono para `US-004–007`, con estados de vacío, error y confirmación. Cierre: diseños de escritorio y móvil vinculados con las pantallas de la primera frontend.
17. **4.4.2 y 4.4.4: wireflows y user flows.** Los Mermaid actuales ayudan a razonar, pero son cajas sin pantallas. Usar FigJam/LucidChart/Overflow según el enunciado, incluir mock-ups, user goal, happy path y rutas alternativas. Cierre: flujos consistentes con los wireframes y capturas/enlaces revisables. La excepción Diagram-as-Code de la página 29 permite Mermaid para UML, C4, ERD y EventStorming; no sustituye expresamente esos requisitos de UI.
18. **4.5 Prototyping.** `:216` declara pendiente el prototipo. Conectar los escenarios principales en Figma para escritorio y móvil. Cierre: enlace navegable, explicación de interacción, captura y video de navegación en Stream conforme al Anexo C.
19. **4.6–4.8: arquitectura, clases y datos.** Ya existen fuentes y exportaciones C4/UML/ERD y `database/schema.sql`; no hace falta recrearlos desde cero. Ajustar el frontend real, documentar componentes por contenedor pertinente y mantener EventStorming, clases y SQL consistentes. Cierre: modelo correspondiente al alcance acordado, reglas de organización/moneda/saldo y fuentes editables sincronizadas con imágenes. Resolver además la frecuencia de `US-009`, ausente en `Loan`/SQL, y la multiplicidad del cronograma; ese módulo puede quedar para Sprint 3 según el backlog actual. Ejecutar migraciones y desplegar la API no se convierte por ello en un requisito adicional de TB1.

### 4.5 Capítulo V: configuración y Sprint 2

20. **5.1.1–5.1.4.** `docs/05-implementation-validation-deployment.md:3–30,69–109` describe un ZIP antiguo y estados de repositorios/configuración ya superados. Documentar entorno reproducible, repositorio frontend, dependencias reales, convenciones, configuración de hosting y rutas de despliegue. Corregir las cuatro rutas locales rotas de `:353,629,653` y la referencia a una sección 5.3 ausente en `:737`. Cierre: instrucciones ejecutables y evidencia actual, sin capturas inexistentes ni valores de ramas tomados de una imagen antigua.
21. **5.2.2.1 Sprint Planning 2.** Registrar fecha, hora, ubicación, prepared by, asistentes, Review y Retrospective de Sprint 1, Sprint Goal, capacidad/velocity y suma de story points. Cierre: acuerdos reales y distinción entre capacidad estimada y velocidad medida; sin retrofechar reuniones.
22. **5.2.2.2 Aspect Leaders and Collaborators.** Crear la matriz LACX por integrante, username y aspecto del Sprint 2 con L/C. Cierre: relación con tareas asignadas y participación verificable de Juan, Sebastián y Miguel.
23. **5.2.2.3 Sprint Backlog 2.** Descomponer las historias comprometidas en tareas con ID, título, descripción, horas, assigned to y `To-do/In-Process/To-Review/Done`. Cierre: tablero y captura, tabla textual, horas y story points diferenciados, estados respaldados por evidencia.
24. **5.2.2.4 Development Evidence.** Añadir tabla por repo con branch, commit ID, mensaje, body y fecha. Cierre: hashes existentes que demuestren cambios de código del Sprint 2; los commits de planificación no acreditan implementación.
25. **5.2.2.5 Execution Evidence.** Registrar capturas reales de vistas desktop/mobile y video de navegación de landing/frontend. Cierre: pruebas de escenarios de usuario con fecha, commit, pasos, resultado y defectos, incluyendo carga/vacío/error, teclado y cambio de idioma.
26. **5.2.2.6 Services Documentation Evidence.** Explicar la integración disponible para el frontend, contratos y límites. Si solo hay adaptador local o fixtures, identificarlos como datos de demostración y separar el contrato previsto de un endpoint ejecutado. Si hay servicios implementados, añadir OpenAPI, llamadas, respuestas y capturas reales. Cierre: alcance TB1 explícito y dependencia hacia AV2 documentada.
27. **5.2.2.7 Software Deployment Evidence.** Documentar nueva landing y primera frontend con proveedor, URL HTTPS, versión, commit, build/workflow, fecha y capturas. Cierre: recursos sin 404, navegación directa/refresco de rutas, idioma y CTA operativos; las dos URLs deben ser revisables por el docente.
28. **5.2.2.8 Team Collaboration Insights.** Incorporar acuerdos, problemas, decisiones, mejoras y analíticos de los repos de implementación. Cierre: evidencia de trabajo de todos los integrantes en los productos del sprint; los commits creados por Miguel en esta auditoría se atribuyen únicamente a Miguel.

### 4.6 Conclusiones, bibliografía, anexos y entrega

29. **Capítulos VI–VIII y anexos.** Las conclusiones/checklist siguen en AV1 y `docs/07-bibliography-appendices.md:19–24` declara pendiente Student Outcome pese a estar redactado. Actualizar resultados y límites de TB1, referencias APA y checklist específico. Añadir el anexo Videos de Exposiciones con enlaces por entrega. Cierre: mismo estado en capítulo 00, backlog, Sprint 2, conclusiones y anexos.
30. **Paquete TB1 y exposición.** `main` no incluye ni acredita los archivos finales TB1; existen PDFs y Performance Report de AV1 fuera de Git que requieren revisión/versionado de entrega. Preparar informe completo PDF, PPTX/PDF, performance DOCX/PDF validado por el líder, ZIP y exposición MP4/Stream. Cierre: nombres del curso, permisos, calidad de exportación y consistencia con el commit entregado. La sustentación tiene máximo 12 minutos; introducción ≤10 %, mejoras previas ≤30 %, demo ≥40 % y colaboración ≥20 %. El video pregrabado tiene máximo 30 minutos. La entrega TB1 es 24 horas antes del inicio de la segunda sesión sincrónica semanal; la fecha concreta depende del horario del curso.

### 4.7 Otras mejoras de cobertura de artefactos previos

31. **P2, 1.2 y 1.3.** Completar varios supuestos por cada tipo Lean UX, la brecha frente a alternativas y la caracterización de segmentos con fuentes secundarias verificables. Las fuentes deben indicar fecha y universo; no convertir una muestra de entrevistas en tamaño de mercado.
32. **P2, 2.1.1.** El análisis documental de competidores es reutilizable, pero la tabla `docs/02-requirements-elicitation-analysis.md:40–47` conserva instrucciones para logos y precios. Completar el Landscape/FODA de startup y competidores, incluidos amenazas, precios/costos, marketing y canales. Comparar planes equivalentes con país, moneda y fecha; diferenciar hechos de inferencias.
33. **P2, 4.6.** Los componentes actuales solo descomponen la API. Completar componentes pertinentes de frontend/landing y etiquetas de relaciones de contexto. Documentar el proceso de EventStorming y sus decisiones, además del diagrama. Mermaid es una herramienta permitida; tener un archivo Mermaid no acredita por sí solo toda la cobertura requerida.
34. **P2, coherencia Sprint 1.** `docs/05-implementation-validation-deployment.md:474,581` dice que hay asignaciones vacías aunque su tabla `:585–604` asigna tareas, mientras `docs/sprints/sprint-01.md` conserva responsables pendientes. Consolidar las dos vistas sin reconstruir horas trabajadas ni reuniones como si fueran registros contemporáneos.
35. **Correcciones de formato.** Los perfiles de Juan y Miguel usan texto alternativo de Sebastián en `docs/01-introduction.md:21,23`; la introducción todavía habla de fotos pendientes. `database/README.md` remite a `assets/database/`, donde no están los diagramas. Corregir descripciones y rutas para que correspondan con los recursos existentes.

## 5. Evidencia técnica externa comprobada

| Evidencia | Resultado al corte |
|---|---|
| Landing pública | [GitHub Pages](https://grupo-desarrollo-aplicaciones-web.github.io/creditor-landing-page/) respondió HTTP 200, igual que JavaScript, CSS y favicon. |
| Compilación/despliegue existente | [Actions run 35305597000](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page/actions/runs/35305597000), exitoso el 18/09/2026. |
| Commit publicado observado | `cf734ff17d32417323c17a03ccf11a3f4d3a1ade`; workflow y ruta base Vite presentes. |
| Producto publicado | Título/metadatos y contenido conservan CreditFlow. Falta acreditar el incremento TB1 de CREDITOR. |
| Frontend de CREDITOR | No se identificó entre los tres repositorios visibles de la organización ni en el inventario local revisado. Debe confirmarse si existe en otra ubicación antes de crear otro repositorio. |
| Repositorio `hello-spring-boot-developer` | Ejercicio de Spring Boot; no acredita un frontend CREDITOR ni la API ASP.NET Core del proyecto. |
| Acceso del informe | La API autenticada informó `upc-project-report` como privado. Página 2 del enunciado pide repositorio en una organización pública. Corregir el acceso/publicidad con decisión del dueño y revisión previa del contenido. |

Defectos a resolver en la landing: marca y enfoque, CTA/login sin destino de aplicación, footer legal con `#`, formulario que solo confirma localmente, campos sin etiquetas, inglés por defecto y traducciones/metadatos, métricas promocionales sin fuente, precios no validados y definición de tasa en el simulador. La etiqueta TEA requiere conversión efectiva mensual `(1 + TEA/100)^(1/12) - 1`; dividir la tasa anual entre doce corresponde a otra convención. Si el simulador no apoya el flujo de cuentas por pagar, acordar su alcance antes de invertir en ampliarlo.

## 6. GitFlow y diferencias fuera de main

1. `main` y `origin/develop` tienen respectivamente **3 y 4 commits exclusivos**, con ancestro común `84d8ff0`. Antes de preparar una release TB1, revisar la reintegración de los cambios de la release anterior hacia `develop`, preservando las correcciones posteriores.
2. `develop` ya eliminó dos filas pendientes y la afirmación de ausencia de entrevistas, y reemplazó las imágenes de Personas. Esos cambios no forman parte de `main` auditado. Eliminar las filas no demuestra que las entrevistas pendientes se hayan realizado; revisar las nuevas imágenes antes de considerarlas resueltas.
3. `CONTRIBUTING.md` solo define `main`, `develop`, `docs/` y `fix/`, y propone fusionar `develop` directamente en `main`. Completar el flujo `feature/*`, `release/*` y `hotfix/*`, Conventional Commits y SemVer. Los nombres históricos no necesitan reescritura de historial.
4. En la landing, el remoto observado conserva solo `develop`; el `main` local es el commit inicial. Preparar una rama estable y su release con un plan de integración comprobado, manteniendo la publicación bajo control del usuario.
5. Los cambios de esta auditoría se preparan en `feature/tb1-auditoria-prompt`, nacida de `develop` actualizado. Los commits utilizan `MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com>` y se mantienen locales.

## 7. Secuencia recomendada

1. Confirmar frontend existente, rúbrica adicional, feedback AV1, horario TB1 y evidencias externas del equipo.
2. Revisar divergencia de ramas y fijar historias de Sprint 2, LACX y tablero.
3. Corregir investigación y diseñar pantallas de compras/abonos, reutilizando los diagramas válidos.
4. Implementar primera frontend y el incremento de landing con i18n, a11y, legal y CTA.
5. Compilar y probar localmente; preparar configuraciones de despliegue y documentación de Sprint 2.
6. El usuario publica las ramas/versiones; verificar URLs y adjuntar evidencia auténtica.
7. Actualizar capítulo 00, conclusiones, anexos, presentación, performance, videos y exportaciones.
8. Preparar la release TB1 cuando los criterios estén satisfechos y exista evidencia de revisión.

El [prompt de ejecución](prompt-completar-tb1.md) convierte este diagnóstico en instrucciones detalladas para el siguiente trabajo. Esta auditoría no completa por sí misma las entrevistas, la implementación, el despliegue ni la entrega académica.
