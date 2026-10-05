# Prompt para crear la presentación TB1 de CREDITOR

Preparado el 04/10/2026. Base: informe local en `develop` al corte `789b59c`, enunciado del curso y retroalimentación proporcionada. El estado técnico y académico corresponde al corte del 03/10/2026; la fecha de preparación de este documento no acredita actividades nuevas del equipo.

Este documento contiene el encargo para crear una presentación nueva. Se acompaña de [un guion por diapositiva, ruta de 12 minutos y respuestas de sustentación](guion-ppt-detallado.md). No sustituye el PPTX existente ni declara una nueva grabación o publicación.

## Prompt listo para usar

Crea una presentación PowerPoint editable, clara y visual para exponer **CREDITOR, TB1 Stage Review, semana 7**, del curso **1ASI0730 Aplicaciones Web**, Universidad Peruana de Ciencias Aplicadas, carrera Ingeniería de Software, periodo **202620**, NRC **16127**, **Grupo 2**, docente **Villafuerte Bazan, Oscar Ivan**.

La presentación debe explicar la relación entre problema, investigación, requisitos, diseño, implementación y colaboración; mostrar gran parte del informe y priorizar el incremento TB1. Usa **36 diapositivas de exposición y cuatro de consulta**, con dos recorridos sobre la misma numeración:

- Video completo: diapositivas 1–36, **27 minutos y 30 segundos** como objetivo de ensayo, dentro del máximo de 30 minutos. Las 37–40 son material de consulta; no se añaden al video de forma automática.
- Sustentación en clase: **22 diapositivas seleccionadas**, exactamente 12 minutos. Usa la selección y tiempos de este documento; las restantes permiten responder preguntas.

La duración propuesta incluye las acciones de demostración y cambios de ventana. No prolongues el video para leer todos los diagramas ni todas las filas del backlog. La distribución de tiempo de la sustentación es una regla del formato; no representa porcentajes de calificación.

### 1. Fuentes que debes leer antes de crear contenido

Base local del informe:

`C:\Users\migue\Documents\GitHub\Grupo-Desarrollo-Aplicaciones-Web\upc-project-report`

1. `README.md`, `docs/00-project-information.md` y `docs/00-student-outcome.md`: datos académicos, aportes históricos y Student Outcome.
2. `docs/01-introduction.md`: startup, problema, 5W2H, Lean UX, hipótesis, segmentos y límites del contexto estadístico.
3. `docs/02-requirements-elicitation-analysis.md`: benchmark, estrategias, entrevistas, Personas, tareas, Journey, Empathy, EventStorming y vocabulario.
4. `docs/03-requirements-specification.md`: Epics, User Stories, Technical Stories, criterios, Impact Mapping y Product Backlog.
5. `docs/04-product-design.md`: estilos, arquitectura de información, diseño responsive, flujos, C4, clases y base de datos.
6. `docs/05-implementation-validation-deployment.md` y `docs/sprints/sprint-02.md`: configuración, Sprint 2 y sus ocho apartados.
7. `docs/06-conclusions-recommendations.md` y `docs/07-bibliography-appendices.md`: conclusiones, bibliografía y evidencias anexas.
8. `docs/09-tb1-delivery-checklist.md`, `docs/tb1/feedback-resolution.md`, `docs/tb1/evidencia-local.md` y `docs/tb1/commits-locales.md`: estado real de cada criterio y resultados comprobados.
9. `assets/research/tb1/`, `assets/ux/tb1/`, `assets/architecture/` y `database/schema.sql`: recursos vigentes, fuentes editables y modelos.
10. El [guion detallado](guion-ppt-detallado.md) de este encargo: notas, acciones y reparto propuesto para ensayar.

Fuentes del curso:

- `C:\Users\migue\Downloads\upc-pre-202620-1asi0730-final_project-statement-abet_v1.pdf`: pp. 3–4, exposición y sustentación; pp. 29–30, tecnologías e inclusión; pp. 31–32, alcance TB1; pp. 37–39, Student Outcome, Performance y videos.
- `C:\Users\migue\.codex\attachments\1c8c7c1e-977c-4f40-a799-4664392a679e\Texto pegado.txt`: retroalimentación entregada por el usuario. Trátala como observaciones sobre el trabajo previo; no la rebautices como una rúbrica TB1 adicional ni recalcules una nota.

Productos locales de referencia:

- Landing: `C:\Users\migue\Documents\GitHub\Grupo-Desarrollo-Aplicaciones-Web\creditor-landing-page`.
- Frontend: `C:\Users\migue\Documents\GitHub\Grupo-Desarrollo-Aplicaciones-Web\creditor-web-app`.
- `C:\Users\migue\Documents\GitHub\Grupo-Desarrollo-Aplicaciones-Web\creditor-web-app\docs\AUTHORSHIP_ALLOCATION.md` explica el reparto local de crédito por planificación y la trazabilidad del trabajo técnico. Prevalece para describir ese ajuste posterior; no deduzcas un reparto de código a partir del conteo de Author.

Si la herramienta que crea el PPT no puede abrir rutas locales, solicita o utiliza los archivos adjuntos equivalentes. No declares haber leído un archivo inaccesible. El PDF del report sirve como apoyo; el Markdown del corte indicado y los controles de evidencia son la fuente vigente para esta presentación. La presentación anterior de 22 diapositivas es una referencia, no un límite de contenido ni la prueba de hechos nuevos.

### 2. Hechos y límites que debe respetar todo el PPT

- CREDITOR organiza **cuentas por pagar de la mype a sus proveedores**: compras a crédito, comprobantes, abonos, saldos y vencimientos. Los préstamos son obligaciones tomadas por el negocio. Mantén ese significado en títulos, diagramas y narración.
- S1: dueños de mypes comerciales que revisan o deciden compras y pagos. S2: administradores o encargados de finanzas que registran y concilian operaciones. Son responsabilidades; una persona puede asumir ambas.
- La fragmentación entre cuadernos, hojas, mensajes y comprobantes es una hipótesis por contrastar. No la atribuyas a todos los entrevistados.
- Hay **cuatro registros existentes: tres S1 y uno S2**. Faltan al menos dos S2 para la meta mínima y falta completar revisión, consentimiento, codificación y análisis con citas/minutos. Un enlace no prueba por sí solo el contenido de una entrevista.
- Rosa y Diego, sus Journey y Empathy Maps son propuestas **provisionales**. No inventes edades, distritos, ocupaciones, frases, resultados o estadísticas para rellenarlas.
- Las hipótesis H-01–H-05 y las metas de éxito son propuestas. No existen resultados de adopción, ahorro, ventas, reducción de morosidad o pruebas con usuarios que permitan afirmarlos como logros.
- El benchmark contempla Alegra, Odoo y Zoho Books. Ofrecen funciones equivalentes documentadas. La oportunidad a explorar es el encaje de un recorrido acotado compra–abono–saldo; no una exclusividad demostrada. El precio de CREDITOR no está definido. Evita tablas de precios en las diapositivas principales; en un anexo, identifica fecha, mercado, moneda y plan del corte del informe.
- La primera frontend local implementa **US-004–007**: obligaciones, compra, abono e historial. Las correcciones de landing cubren US-001–003. US-008/009 y TS-001–003 están previstas para Sprint 3/AV2.
- Las cuatro historias de frontend suman **26 SP = 8 + 8 + 5 + 5**. Las siete Engineering Tasks suman **43 horas estimadas propuestas**, con cada tarea entre 4 y 8 horas. SP y horas no son equivalentes, ni representan tiempo realmente trabajado.
- La demostración usa una organización ficticia fija, adaptador local y `localStorage`. No acredita autenticación, permisos por rol, seguridad de servidor, almacenamiento privado ni persistencia multiusuario.
- API ASP.NET Core/EF Core y PostgreSQL son diseño objetivo para AV2. Los endpoints y OpenAPI son contratos previstos; no presentes Swagger ni servicios operativos ficticios.
- Inglés por defecto, español latinoamericano opcional. Cambiar idioma no convierte moneda. PEN y USD se mantienen separados.
- El flujo comprobado es **compra PEN 100.00 → abono PEN 30.00 → saldo PEN 70.00 → intento PEN 71.00 rechazado**, sin movimiento nuevo. Identifica estos valores como datos de demostración.
- La evidencia del corte registra **12 pruebas de landing**, **14 pruebas unitarias de frontend**, **dos pruebas de navegador** y compilaciones aprobadas. Son verificaciones técnicas; no validación con usuarios ni aceptación del equipo. Los **17 caminos de diseño** no equivalen a 17 pruebas ejecutadas.
- Los wireframes TB1 son fuentes HTML locales; las capturas proceden de ejecución local. Figma/UXPressia y demás evidencias exigidas del equipo siguen pendientes cuando el control lo indica.
- **La nueva landing y primera frontend TB1 permanecen en local.** El enunciado requiere ambas desplegadas para la entrega. La publicación histórica AV1 del 18/09/2026 no acredita TB1. Explica la brecha con precisión.
- El contacto es una demostración de validación y no envía ni guarda datos. No uses cuentas sociales, clientes o testimonios inexistentes.
- Juan y Sebastián aportaron planificación compartida, confirmada por Miguel, y existen artefactos históricos diferenciados en el report. Miguel escribió el código nuevo y realizó preparación documental, verificaciones e integración. El ajuste de Author en frontend reconoce crédito de planificación; no demuestra codificación igualitaria ni revisiones del equipo.
- No inventes actas, LACX aceptada, tablero operativo, horas ejecutadas, analíticos, calificaciones, fechas de entrega, videos o aceptación. Mantén como pendiente el Performance Report validado por el líder y MP4/Stream reales.

### 3. Diseño visual y formato de salida

1. Relación 16:9, estilo académico de producto, fondo blanco o muy claro y uso moderado del azul de CREDITOR `#2563EB`, texto `#111827`, superficies suaves `#E8EFFF`.
2. Usa una sola familia disponible, por ejemplo Arial o Aptos. Títulos 32–40 pt, texto 22–28 pt. Las tablas y notas de fuente deben ser legibles al proyectar; si requieren letra diminuta, divídelas o pasa el detalle a una diapositiva de consulta.
3. Una idea principal por diapositiva. Entre tres y cinco puntos breves. El argumento completo va en las notas del expositor. Evita pegar párrafos del informe.
4. Tablas editables para benchmark resumido, historias, tareas y estados. Diagramas con etiquetas legibles y relaciones correctas. Las capturas conservan proporción; no estires imágenes ni recortes campos necesarios para entender el flujo.
5. Usa los diagramas por partes para EventStorming y User Flows. El ER principal muestra Business–Supplier–Purchase–Payment; el modelo completo queda en consulta. No reduzcas un diagrama completo hasta volverlo ilegible.
6. Conserva nombre, código y carrera en la diapositiva de equipo. Usa las fotografías existentes y señala en las notas que el equipo debe confirmar su uso para publicar.
7. Añade número de diapositiva y referencia al índice del informe, por ejemplo «4.8.1 Database Diagrams». Las referencias breves al artefacto van en pie o notas; la bibliografía completa, en consulta.
8. Etiquetas discretas y consistentes cuando cambie el significado: «Hipótesis», «Diseño provisional», «Ejecución local» o «Previsto AV2». Acompaña estados con texto, sin depender solo del color.
9. Las diapositivas de demo sirven como guía del escenario y respaldo de capturas. Reserva el tiempo de demostración para interactuar con el producto; no lo sustituyas por una lectura rápida de imágenes.
10. Sin texto desbordado, letras cortadas, solapamientos o placeholders. Revisa cada diapositiva en PPTX y PDF. La observación de iniciar cada sección en página separada corresponde al report; no copies su maquetación de páginas a la presentación.
11. Agrega notas con guion hablado, acción en pantalla, límite de evidencia, expositor y duración. Los guiones de video y clase deben distinguirse.
12. Entrega PPTX editable y PDF visualmente equivalente. Si creas archivos, usa `upc-pre-202620-1asi0730-16127-creditor-keynote-tb1.pptx` y `.pdf`, en una salida nueva o versionada para preservar la entrega anterior hasta revisar el resultado.

### 4. Contenido obligatorio, diapositiva por diapositiva

Las rutas de recursos siguientes son relativas a la base del informe. «Fuente» identifica el capítulo para las notas. La guía de presentación oral está en el documento de guion.

#### 01. CREDITOR: TB1 Stage Review

- Mensaje: incremento de cuentas por pagar para mypes comerciales.
- Mostrar universidad, curso, NRC, periodo, docente, Grupo 2 y entrega TB1. Fecha de presentación solo si está confirmada.
- Visual: `assets/branding/creditorlogo.jpg`; diseño sobrio con subtítulo «Compras, abonos y saldos por moneda».
- Fuente: capítulo 00 y carátula. No llames al incremento release estable.

#### 02. Equipo y recorrido de la exposición

- Juan Manuel Santos Torres, u20221a371; Sebastián Gutarra Velapatiño, u20241a314; Miguel Angel Egocheaga Suyo, u202215188. Los tres, Ingeniería de Software.
- Mostrar fotos y tres bloques: problema/investigación, diseño/requisitos, demostración/colaboración. La asignación es de exposición, no una atribución automática de autoría.
- Recursos: `assets/research/foto-juan.jpeg`, `assets/research/20240110_181602.jpg`, `assets/research/foto-miguel.jpg`.
- Fuente: 1.1.2 y 00.4.

#### 03. Problema, solución y alcance del incremento

- Problema propuesto: esfuerzo para reconstruir obligación, abonos, comprobante y vencimiento desde fuentes separadas.
- Solución: relación proveedor → compra → abono → saldo por moneda.
- TB1 local: US-004–007; roadmap: reportes, préstamos y API. S1 revisa; S2 registra/concilia.
- Visual: recorrido con cuatro pasos y separación «TB1 local / Iteración futura».
- Fuente: 1.2.1 y 1.3.

#### 04. Qué mejoramos después de AV1

- Tabla «Observación → cambio → estado»: benchmark y trazabilidad; móviles; caminos alternativos; tareas de 4–8 h; presentación/maquetación.
- Distinguir corregido localmente de abierto: investigación, herramientas, deployment y video.
- Fuente: `docs/tb1/feedback-resolution.md`. Evitar palabras «validado» o «cerrado» sin evidencia correspondiente.

#### 05. 5W2H y Lean UX Problem Statement

- Resumir qué ocurre, quién participa, cuándo y por qué se investiga. «How much: sin línea base medida».
- Problem Statement: mercado con soluciones existentes; oportunidad de encaje de flujo acotado; usuarios S1/S2; señal de éxito propuesta.
- Piloto propuesto: cinco negocios, 30 días; cuatro localizan saldo/vencimiento sin ayuda; tres revisan semanalmente durante tres semanas. No presentarlo como actividad ejecutada.
- Fuente: 1.2.1 y 1.2.2.1. Mantener separado este piloto de la prueba de usabilidad de consulta descrita en la diapositiva 37.

#### 06. Supuestos e hipótesis que guían el producto

- Mostrar cadena business outcome → usuario → beneficio → feature.
- H-01: revisión recurrente mediante dashboard; H-02: registros completos mediante formulario y comprobante; H-03: verificación del saldo mediante historial.
- H-04 préstamos y H-05 reportes, futuras iteraciones. Identificar relación US-004/005/006–007/009/008.
- Fuente: 1.2.2.2–1.2.2.3. Metas e hipótesis propuestas.

#### 07. Lean UX Canvas

- Destacar problema, usuarios, beneficios, solución e incertidumbre prioritaria. Explicar cómo el Canvas vincula decisiones, no leer sus ocho bloques completos.
- Recurso vigente: `assets/research/tb1/lean-ux-canvas-local.svg`.
- Fuente: 1.2.2.4. Etiqueta «Canvas local provisional»; no usar el Canvas JPG histórico como versión TB1.

#### 08. Segmentos objetivo y contexto

- S1 revisa y prioriza; S2 registra y concilia. Inclusión: participación directa reciente en compras/pagos del negocio.
- Riesgos: tarea delegada en S1; duplicación con herramienta existente en S2.
- Contexto secundario: si utilizas la cifra de PRODUCE, indica Mipyme formales, Perú, 2024 y Cuadro A1. No la llames mercado potencial, clientes ni muestra del proyecto.
- Fuente: 1.3. Preferir tarjetas de tareas; la cifra es opcional y no debe dominar el argumento.

#### 09. Benchmark: Alegra, Odoo y Zoho Books

- Tabla de cuatro filas: compras/proveedores, abonos/comprobantes, consulta/reportes, amplitud/encaje del producto.
- Explicar que ya existen capacidades equivalentes; propuesta de CREDITOR: recorrido acotado de consulta y registro, por verificar.
- Recursos: `assets/research/tb1/competitor-alegra.png`, `competitor-odoo.png`, `competitor-zoho.svg` en la misma carpeta.
- Fuente: 2.1.1. Usar «No verificado en esta revisión» donde corresponda; no convertirlo en «No tiene».

#### 10. Estrategia y tácticas frente a alternativas

- Especialización en obligaciones; registro guiado; trazabilidad de abonos; adopción gradual.
- Ejemplo de táctica: demostrar una compra y sus pagos, piloto con pocas operaciones.
- FODA resumido: foco acotado; investigación/API abiertas; oportunidad de piloto; alternativas equivalentes y costo de cambio.
- Fuente: 2.1.1–2.1.2. Son decisiones por contrastar, no campañas ni ventaja comercial demostradas.

#### 11. Diseño de entrevistas

- Meta mínima: tres S1 y tres S2. Preguntas abiertas basadas en un episodio reciente antes de presentar la solución.
- Mostrar dos preguntas reales del guion: datos cuando falta comprobante; manejo de una operación duplicada o importe incorrecto.
- Cadena ejemplo: H-02 → A-01/A-02 → campos/excepciones → US-005.
- Fuente: 2.2.1. No escribir respuestas inventadas.

#### 12. Registro, análisis y evidencia pendiente

- Mostrar cobertura 3 S1 / 1 S2 frente a meta mínima 3 / 3.
- Método: participante → pregunta → cita/minuto → variable operacional → necesidad → Persona → historia.
- Faltan dos S2 y análisis verificable de todos los registros. Identificar consentimientos y permisos de video como controles por revisar.
- Recursos: `assets/research/tb1/interview-review-checklist.csv`, `interview-coding-template.csv`, `persona-evidence-matrix.csv` en la misma carpeta.
- Fuente: 2.2.2–2.2.3. Esta diapositiva comunica el estado real, no entrevistas nuevas.

#### 13. Personas y User Task Matrix

- Rosa, propietaria provisional: localizar compromisos y priorizar; Diego, administrador provisional: registrar y conciliar.
- Matriz compacta: consultar saldo, registrar compra, registrar abono, reconstruir historial. No inventar frecuencia, demografía ni citas.
- Recursos: `assets/research/tb1/persona-rosa-local.svg`, `persona-diego-local.svg`.
- Fuente: 2.3.1–2.3.2. Etiqueta «Provisional: pendiente de análisis de entrevistas».

#### 14. Journey y Empathy Mapping

- Secuencia: detectar obligación → recuperar datos → registrar/verificar → pagar → revisar saldo.
- Mostrar un Journey por segmento y destacar momentos de consulta/registro. Las fricciones y emociones son hipótesis.
- Recursos: `assets/research/tb1/journey-rosa-local.svg`, `journey-diego-local.svg`, `empathy-rosa-local.svg`, `empathy-diego-local.svg`.
- Fuente: 2.3.3–2.3.4. Evitar cuatro mapas ilegibles en una sola imagen: usar dos recortes amplios y detalle en notas o consulta.

#### 15. Big Picture EventStorming y Ubiquitous Language

- Recorrido de negocio: compra registrada → obligación pendiente → abono registrado → saldo actualizado → compra saldada.
- Diferenciar comando, evento, actor y política. Resaltar vocabulario compra/proveedor/abono/saldo/vencimiento.
- Recursos: `assets/architecture/big-picture-event-storming-part-1.png`, `big-picture-event-storming-part-2.png`, `big-picture-event-storming-part-3.png`; fuente completa `.mmd` en la misma carpeta.
- Fuente: 2.4–2.5. Mostrar TB1 y mencionar préstamos/reportes como extensión; no llamarlo taller ejecutado.

#### 16. Epics, historias y criterios observables

- E-02 Accounts Payable: US-004/005; E-03 Payments: US-006/007. Relacionar persona, acción y beneficio.
- Criterio Given–When–Then: compra 100, abono 30, saldo 70; intento 71 rechazado, sin movimiento adicional.
- Reglas clave: centavos, moneda propia, fechas coherentes, referencia única por proveedor, abono hasta saldo.
- Fuente: 3.1. Escenario con datos demo, no registro real de negocio.

#### 17. Impact Mapping y Product Backlog

- Impacto esperado: localizar obligaciones y registrar movimientos rastreables.
- Tabla US-004 8 SP, US-005 8 SP, US-006 5 SP, US-007 5 SP; total 26. Estado To-Review local.
- Roadmap US-008/009 y TS-001–003; no confundir la suma de frontend con las tareas de report/landing.
- Recurso: `assets/research/tb1/impact-map-local.svg`.
- Fuente: 3.2–3.3. Metas y prioridad propuestas; aceptación pendiente.

#### 18. Style Guidelines, arquitectura de información y responsive

- Jerarquía de saldo/vencimiento, azul de acción, mensajes con significado textual, inglés/español y navegación coherente.
- Comparar wireframe desktop/móvil de dashboard y compra; mostrar propósito/CTA de landing en móvil. Diferenciar wireframe y captura implementada.
- Recursos: `assets/architecture/information-architecture.svg`, `assets/ux/tb1/wireframe-dashboard.png`, `wireframe-dashboard-mobile.png`, `wireframe-purchase.png`, `wireframe-purchase-mobile.png`, `wireframe-landing-overview-mobile.png`.
- Fuente: 4.1–4.4. El mapa completo incluye elementos de roadmap; no todos están operativos.

#### 19. Wireflow y User Flows con alternativas

- Tres goals: consultar obligación, registrar compra y registrar abono.
- Diseño de 17 caminos: cinco compra COMP-01–05, siete abono ABO-01–07, cinco consulta CON-01–05.
- Destacar éxito, validación, cancelación, vacío y fallo de almacenamiento; indicar retorno y datos conservados.
- Recursos: `assets/architecture/web-wireflow.png`, `user-flow-purchase-part-1.png`, `user-flow-purchase-part-2.png`, `user-flow-payment-part-1.png`, `user-flow-payment-part-2.png`, `user-flow-payment-part-3.png`, `user-flow-obligation-part-1.png`, `user-flow-obligation-part-2.png`.
- Fuente: 4.4–4.5. Usar dos ramas ampliadas; el resto queda en consulta. Cobertura de diseño y pruebas ejecutadas son cifras distintas.

#### 20. Arquitectura de dominio y C4

- Contexto: Visitor, Business Owner y Finance Administrator alrededor de CREDITOR.
- Implementado: Vue/PrimeVue → store → validadores/adaptador → almacenamiento local. Previsto: HTTP → ASP.NET Core/EF Core → PostgreSQL.
- Justificación: separar presentación, reglas y acceso a datos para sustituir el adaptador en AV2.
- Recursos: `assets/architecture/c4-context.png`, `c4-containers.png`, `c4-web-components.png`, `design-event-storming.png`.
- Fuente: 4.6. Emplear trazo distinto para lo previsto; no afirmar que el diagrama equivale a infraestructura funcionando.

#### 21. Class Diagram y Database Diagram

- Clases y datos centrales: Business → Supplier → Purchase → Payment. Una compra tiene cero o muchos abonos; el saldo se deriva del total y los abonos.
- Mostrar llaves y relaciones de organización, proveedor, compra y pago. Identificar moneda y fechas; evitar almacenar un saldo editado independientemente de sus movimientos.
- Recursos: `assets/architecture/class-diagram.png`, `database-accounts-payable.png`; detalle completo en `database-er-diagram.png` y `database-loans.png`; fuente SQL `database/schema.sql`.
- Fuente: 4.7.1 y 4.8.1. PostgreSQL y préstamos pertenecen al diseño objetivo, no a una base conectada en TB1.

#### 22. Demo: nueva landing y acceso por objetivo

- Recorrido: propuesta, ejemplo, funcionalidades, alcance, proceso, contacto demo y legales.
- CTA propietario → dashboard; CTA administrador → nueva compra. El CTA elige destino, no concede permisos.
- Capturas de respaldo: `assets/ux/tb1/landing-desktop-en.png`, `landing-mobile-es.png`, `landing-contact-errors.png`, `landing-contact-demo.png`.
- Fuente: 4.3, 5.2.2.5 y evidencia local. Interactuar en navegador; contacto no envía ni guarda.

#### 23. Demo: obligaciones, filtros y monedas

- Mostrar dashboard y listado; identificar PEN y USD separados, vencimientos y acceso al detalle.
- Explicar una combinación de filtros y restablecerla antes del registro.
- Respaldo: `assets/ux/tb1/frontend-dashboard-en.png`.
- Fuente: US-004 y 5.2.2.5. Empresa y obligaciones ficticias.

#### 24. Demo: registrar compra PEN 100.00

- Elegir proveedor demo existente, referencia nueva, descripción, importe, moneda y fechas válidas.
- Mostrar revisión/confirmación y detalle posterior. Comprobante opcional; no introducir datos reales.
- Respaldo: `assets/ux/tb1/frontend-purchase-new-en.png`, `frontend-purchase-error-en.png`.
- Fuente: US-005, R-01–06. No inventar subida a un servicio remoto.

#### 25. Demo: detalle y composición del saldo

- Mostrar total 100, abonos 0, saldo 100 y la relación con proveedor/vencimiento.
- Fórmula: saldo = total de compra − suma de abonos válidos, en la misma moneda.
- Respaldo: `assets/ux/tb1/frontend-detail-es.png`; aclarar en notas que el respaldo puede corresponder al estado posterior a un abono. Durante la demo el detalle vivo es la referencia del estado inicial.
- Fuente: US-007 y R-09.

#### 26. Demo: abono PEN 30.00 e historial

- Registrar abono 30, confirmar movimiento y saldo 70. Mostrar fecha/importe y recargar para comprobar persistencia del navegador.
- Mantener explícita la organización ficticia y el alcance local.
- Respaldo: `assets/ux/tb1/frontend-history-es.png`, `frontend-balance-es.png`.
- Fuente: US-006/007, R-07–09 y evidencia local.

#### 27. Demo: sobreabono rechazado

- Intentar 71 frente a saldo 70. Mostrar mensaje de rechazo, foco/campos conservados y ausencia de un segundo movimiento.
- Explicar por qué guardar un error como éxito rompería la trazabilidad.
- Respaldo: `assets/ux/tb1/frontend-overpayment-es.png`, `frontend-payment-error-form.png`.
- Fuente: R-07–10. El historial y saldo deben seguir en 30 y 70.

#### 28. Demo: inglés/español, móvil y accesibilidad

- Cambiar idioma sin alterar la moneda. Mostrar viewport móvil cercano a 390 px, teclado, etiquetas y un error asociado al campo.
- Respaldo: `assets/ux/tb1/frontend-mobile-es.png`, `landing-contact-mobile-es.png`.
- Fuente: 4.1.2, 5.1 y evidencia local. Describir comprobaciones concretas; no declarar certificación WCAG ni auditoría completa.

#### 29. Sprint 2: objetivo y ocho apartados

- Sprint Goal propuesto: propietario consulta saldo/vencimiento por moneda y administrador registra compra/abono con trazabilidad.
- Enumerar 5.2.2.1 Planning; .2 Leaders/Collaborators; .3 Backlog; .4 Development; .5 Execution; .6 Services Documentation; .7 Deployment; .8 Collaboration Insights.
- Diferenciar artefactos preparados y acuerdos/evidencias humanas abiertos.
- Fuente: 5.2.2 y ficha `docs/sprints/sprint-02.md`. No fabricar ceremonia ni LACX aprobada.

#### 30. Sprint Backlog: 26 SP y siete tareas

- Tabla: T2-01 dashboard/filtros 7 h; T2-03 compra 8 h; T2-05 abono 6 h; T2-07 detalle/calidad 7 h; T2-08 landing 6 h; T2-11 report 5 h; T2-12 entrega 4 h. Total 43 h propuestas.
- Separar historias frontend 26 SP de tareas de todo el incremento. Mostrar relación US→task y estado técnico To-Review.
- Fuente: 5.2.2.3. Cada tarea principal está entre 4–8 h; las subtareas descritas no son tareas principales nuevas.

#### 31. Evidencia de desarrollo, ejecución y calidad

- Tabla breve producto/verificación/resultado: landing 12 unitarias+build; frontend 14 dominio+2 navegador+build.
- Mostrar escenario 100/30/70/rechazo 71, fecha del corte y rutas a resultados. No simular terminal con pruebas que no se ejecutaron.
- Fuente: 5.2.2.4–5 y `docs/tb1/evidencia-local.md`.
- SHA históricos pueden mantenerse si se identifican como corte; usar mapa de autoría del frontend para relacionar el historial local posterior sin fabricar nuevas capturas.

#### 32. Configuración y GitFlow

- Repositorios separados de report, landing y frontend; tecnologías Vue/PrimeVue, Vite y diseño futuro ASP.NET Core/PostgreSQL.
- Diagrama `develop → feature/<tema> → merge --no-ff → develop`; `main` recibe una release revisada después. Conventional Commits y SemVer.
- Mostrar log real de branches locales y estado. Nuevos cambios sin push ni release TB1. La inicialización de main del frontend no representa publicar el código de una feature.
- Fuente: 5.1, CONTRIBUTING e historial local. No exigir conexión remota para mostrar la evidencia local.

#### 33. Aportes y Student Outcome 5

- Juan: contenido histórico de problema/Lean UX, Sprint 1 y protocolo de validación. Sebastián: marca/bocetos y actualización de registros. Miguel: requisitos, arquitectura, preparación técnica TB1, código y pruebas.
- Planificación compartida del aplicativo confirmada por Miguel; revisión y aceptación TB1 pendientes de evidencia del equipo.
- Explicar liderazgo conjunto y colaboración inclusiva con artefactos verificables. El conteo o reparto de Author no es medición de horas, calidad o porcentaje de código.
- Fuente: capítulos 00 y registro local de autoría del frontend. Cada integrante describe una evidencia auténtica y una próxima revisión, sin atribuirse actividad no realizada.

#### 34. Contratos de servicio y deployment

- Contratos previstos: consulta/registro de compras y registro de pagos. Señalar autorización, transacción y concurrencia como trabajo AV2.
- Estado actual: adaptador local; API/PostgreSQL no operativos. TB1 exige deployment de nueva landing y primera frontend, ambos pendientes.
- Mostrar diferencia «build local / publicación histórica AV1 / nuevo deployment TB1».
- Fuente: 5.2.2.6–7. No presentar la exclusión de deployment en la preparación local como exoneración académica.

#### 35. Entregables y acciones para cerrar TB1

- Report PDF, Keynote PPTX/PDF, Performance DOCX/PDF validado por líder, ZIP complementario y exposición MP4/Stream.
- Acciones abiertas: dos entrevistas S2/análisis; evidencia en herramientas; planning/LACX/tablero/aceptación; deployment; desempeño y grabación.
- Responsables de futuras acciones deben confirmarse con el equipo; no poner fecha límite sin conocer el horario.
- Fuente: checklist TB1 y anexos. El video About-the-Product/About-the-Team y primera Web Services desplegada corresponden a AV2.

#### 36. Conclusiones y cierre

- Tres conclusiones: dominio centrado en obligaciones; recorrido local funcional con reglas observables; diseño y trazabilidad disponibles con brechas académicas explícitas.
- Próximo paso: revisión del equipo y cierre de evidencia/deployment antes de declarar entrega completa.
- Cierre oral breve y referencia a bibliografía/anexos de consulta, con fuentes identificables.
- Fuente: conclusiones, bibliografía y control TB1. Evitar anunciar éxito comercial o TB1 totalmente cerrado.

#### 37. Consulta: métricas y protocolo propuesto

- Separar piloto de 30 días/cinco negocios de prueba moderada antes de Sprint 3/cinco participantes.
- Prueba propuesta: cuatro de cinco localizan saldo/vencimiento sin ayuda en dos minutos; línea base y protocolo pendientes.
- Mostrar H-01–05, variable, evidencia futura y decisión posible; ninguna medición inventada.
- Fuente: 1.2.2 y 3.2.1.

#### 38. Consulta: historias, criterios y backlog completo

- Tabla legible de US-001–009, prioridad, SP, sprint/estado. TS-001–003 en tabla separada.
- Dos escenarios Given–When–Then completos, validación de compra y abono; vínculo con reglas R-01–10.
- Si hay demasiadas filas, usa zoom o páginas de consulta adicionales fuera del recorrido principal, manteniendo los IDs 1–36.
- Fuente: capítulo III y Sprint 2. No reemplazar especificación textual del informe con capturas de un tablero.

#### 39. Consulta: diagramas completos por contexto

- C4 Context/Container/Components, Class Diagram y ER por cuentas por pagar y préstamos, disponibles para abrir individualmente.
- Mostrar origen editable y relación con SQL. Marcar qué está implementado y qué está previsto.
- Recurso: carpeta `assets/architecture/`, `database/schema.sql`.
- Evita un collage con letra ilegible: esta diapositiva puede ser índice de navegación a vistas ampliadas o al artefacto fuente.

#### 40. Consulta: bibliografía, trazabilidad y anexos

- Fuentes oficiales del informe para benchmark y contexto; documentos del curso; artefactos del proyecto y fecha de corte.
- Enlaces reales a report y recursos cuando sean accesibles; rutas locales para la preparación. No generar QR hacia destinos inexistentes.
- Identificar las evidencias pendientes con texto, sin enlaces de video ficticios.
- Fuente: capítulo VII, registro de fuentes y checklist TB1.

### 5. Ruta obligatoria de sustentación de 12 minutos

Los números corresponden al PPT completo; no renumerar el guion al exportar una versión abreviada. Si la herramienta permite rutas o diapositivas ocultas, conserva una ruta «Sustentación 12 min» y otra «Video 27 m 30 s».

| Bloque | Diapositivas, con segundos por diapositiva | Total | Exposición propuesta |
|---|---|---:|---|
| Introducción | 1(20), 2(20), 3(20) | 60 s, 8.3 % | Juan |
| Correcciones de etapas previas | 4(20), 6(25), 9(25), 12(25), 16(25), 19(30), 21(30) | 180 s, 25 % | Sebastián |
| Productos y escenarios | 22(45), 23(35), 24(50), 25(20), 26(60), 27(50), 28(40) | 300 s, 41.7 % | Miguel |
| Implementación y colaboración | 29(35), 30(35), 32(35), 33(55), 36(20) | 180 s, 25 % | Los tres |

Total: 720 s. Respeta máximo 10 % de introducción, máximo 30 % de revisión previa, mínimo 40 % de demo y mínimo 20 % de colaboración. En el último bloque, relaciona planning/backlog/GitFlow con la evidencia de participación y aclara qué acuerdos faltan; no lo conviertas en una lectura genérica de metodología.

La selección abreviada no elimina los diagramas ni el estado de investigación del PPT completo. Ensaya las respuestas porque el docente puede preguntar indistintamente a cualquier integrante.

### 6. Demostración reproducible y plan de respaldo

1. Antes de grabar, ejecutar landing en 5173 y frontend en 5174. Si un puerto ya está ocupado, comprobar si el servidor correcto está activo y reutilizarlo; no iniciar una segunda instancia ni terminar un proceso desconocido.
2. Restablecer únicamente los datos de demostración mediante el control del aplicativo. No usar datos personales ni comprobantes reales.
3. Confirmar CTA propietario/dashboard y administrador/nueva compra. Formulario de contacto debe conservar su aviso de ejemplo sin envío.
4. Dashboard: mostrar PEN/USD separados y filtrar una obligación; limpiar filtros.
5. Compra: proveedor existente; referencia nueva, por ejemplo `TB1-EXPO-100` después de restablecer demo; descripción `Compra de mercadería demo`; PEN 100.00; fecha no futura y vencimiento no anterior. Usar fechas válidas del día real de grabación.
6. Revisar y confirmar; mostrar total 100/abonos 0/saldo 100.
7. Registrar 30; mostrar movimiento/saldo 70; recargar y volver al detalle.
8. Intentar 71; verificar rechazo, campo conservado, un solo abono y saldo 70.
9. Cambiar idioma; mostrar el mismo PEN 70 y viewport móvil/teclado. No convertir moneda.
10. Volver a las diapositivas del Sprint y colaboración. Preparar las capturas existentes como respaldo si falla el entorno; explicar cuándo se está mostrando evidencia del corte y cuándo ejecución actual.

En la grabación, cada participante se presenta ante cámara al inicio. Sincroniza rostro/voz, PPT y artefactos legibles; produce un único MP4. Su generación y carga a Stream son una actividad real posterior; la presentación no puede inventar su enlace. El nombre previsto del video es `upc-pre-202620-1asi0730-16127-creditor-expo-tb1.mp4`.

### 7. Reglas de trabajo y aceptación del PPT

- Esta creación se limita a la presentación y sus notas. No modifica el producto, publica ni cambia visibilidad, no realiza push y no crea release.
- Si guardas cambios dentro del report, usa una feature desde el estado local de `develop`, Conventional Commits con la identidad personal configurada y merge `--no-ff` después de los checks. No reescribas el historial ni integres diferencias remotas sin revisar su alcance.
- Preserva fuentes, versiones anteriores y las evidencias del corte. Una nota antigua que contiene un SHA histórico no debe cambiarse para fingir que se ejecutó una prueba nueva.
- Antes de entregar, comprueba: diapositivas 1–40 presentes; ruta corta de 22 diapositivas/720 s; ruta amplia de 36 diapositivas/1650 s; fotos/nombres/códigos correctos; recursos legibles; tablas coherentes; reglas 100/30/70/71; SP 26 y tareas de 43 h; estados local/futuro/provisional visibles; límites del deployment; guion y notas por slide; PPTX/PDF sin cortes.
- Entrega los archivos y una lista breve de cuestiones que requieren revisión del equipo. No declares aprobación, aceptación o entrega académica completa por haber generado un PPT.

## Trazabilidad del encargo

La lectura del enunciado confirmó el alcance de TB1 y los dos formatos de exposición. Se conservaron los siguientes artefactos como base:

- [Control de entrega TB1](../09-tb1-delivery-checklist.md).
- [Respuesta a la retroalimentación](feedback-resolution.md).
- [Evidencia técnica del corte](evidencia-local.md).
- [Guion anterior de 12 min](guion-exposicion.md), ampliado aquí sin cambiar el límite del curso.
- [Datos y aportes del proyecto](../00-project-information.md).
- [Student Outcome](../00-student-outcome.md).

El reparto de exposición es una propuesta de ensayo; no atribuye a un integrante la producción de todos los artefactos que presenta.
