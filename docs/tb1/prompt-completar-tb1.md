# Prompt detallado para completar TB1 de CREDITOR

Usa el contenido desde «Solicitud de trabajo» como una instrucción para la siguiente etapa. La comparación que lo sustenta está en [Auditoría de main](analisis-main.md). Esta instrucción prepara el trabajo pendiente; no certifica que los entregables ya estén completos.

## Solicitud de trabajo

Ayúdame a preparar **TB1, Stage Review de la semana 7**, del proyecto **CREDITOR** del curso **1ASI0730 Aplicaciones Web, NRC 16127, periodo 2026-20**. Trabaja a partir del estado real de los repositorios, corrige los artefactos de AV1 y prepara el incremento TB1 con evidencia verificable.

### 1. Contexto y fuentes

1. Lee `C:\Users\migue\Downloads\upc-pre-202620-1asi0730-final_project-statement-abet_v1.pdf`. El alcance TB1 está en páginas 31–32; los formatos de sprint en páginas 22–27; i18n, a11y, tecnología y GitFlow en páginas 29–30; los anexos de Student Outcome, Performance y videos en páginas 37–39. Si proporciono una rúbrica adicional o feedback del docente, incorpóralos y señala qué cambia.
2. La referencia auditada del informe es `main` en `57c0bd182c1750be143cfe23e75bc9382499fa9b`, no una combinación automática de todas las ramas. Revisa nuevamente las refs antes de actuar, pues pueden haber avanzado.
3. Repositorio local del informe: `C:\Users\migue\Documents\GitHub\Grupo-Desarrollo-Aplicaciones-Web\upc-project-report`.
4. Repositorio local de landing: `C:\Users\migue\Documents\GitHub\Grupo-Desarrollo-Aplicaciones-Web\creditor-landing-page`.
5. Al corte del 03/10/2026 no se identificó frontend CREDITOR en el inventario local ni en los tres repositorios visibles de la organización. Busca y verifica si existe en otra ruta o repositorio antes de duplicarlo. Si se necesita uno nuevo, prepara el proyecto local con nombre descriptivo y confirma el destino antes de crear un repositorio remoto.
6. El proyecto atiende a **dueños de mypes** y **administradores/encargados de finanzas** que gestionan compras a crédito, obligaciones con proveedores, abonos, vouchers, saldos y vencimientos. La mype es quien debe pagar; el negocio no es una cartera de préstamos que concede a sus clientes.
7. Equipo: Juan Manuel Santos Torres `u20221a371`, Sebastián Gutarra Velapatiño `u20241a314` y Miguel Angel Egocheaga Suyo `u202215188`.
8. El archivo local `Final Project - Sprint Review (TB1).pdf` pertenece a Aula Match y a otro curso. No usarlo como rúbrica de Aplicaciones Web.

### 2. Reglas obligatorias de Git y evidencia

1. **No hagas push**, no publiques una release y no crees PR remotos. Prepara archivos y commits locales para que yo revise y publique.
2. Antes de modificar, inspecciona `git status`, ramas, remotos y diferencias. Preserva mis archivos no rastreados y cambios previos; no uses `reset --hard`, `clean`, force push ni reescritura de historial.
3. Aplica GitFlow: `main` para entrega estable; `develop` para integración; `feature/<tema>` nacida de `develop` para cada bloque; `release/<version>` para preparar una entrega; `hotfix/<tema>` desde `main` para una corrección urgente de una release y posterior reintegración hacia `develop`.
4. En el corte auditado, `main` y `origin/develop` tenían 3 y 4 commits exclusivos y ancestro común `84d8ff0`. Revisa la reintegración pendiente de la release anterior antes de futuros merges; conserva tanto correcciones de `main` como mejoras posteriores de `develop`. No resuelvas conflictos aceptando una rama completa sin revisar archivos.
5. Usa Conventional Commits con alcance claro, por ejemplo `docs(tb1): document sprint two backlog`, `feat(purchases): add credit purchase form`, `fix(a11y): associate field errors` o `ci(frontend): configure static deployment`. Separa cada cambio lógico; evita un único commit de todo el proyecto.
6. Verifica en cada repo la identidad de mis nuevos commits: `MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com>`, vinculada a `MiguelAngel0107`. Si hace falta, configúrala solo en ese repositorio. No cambies autores de commits antiguos ni crees commits a nombre de Juan o Sebastián.
7. Completa `CONTRIBUTING.md` y 5.1.2 con convenciones de feature/release/hotfix, destinos de integración, revisión y Semantic Versioning. El nombre histórico de un commit o rama no requiere reescribirlo.
8. Mantén el trabajo en ramas revisables. Aplica las reglas de revisión del repositorio antes de integrar o cerrar una feature; presenta el resultado concreto y los commits pendientes de integración. No fusionar una release en `main` solo porque ya compila.
9. Distingue **planificado**, **implementado**, **probado** y **desplegado**. Un diagrama no acredita código; un workflow no acredita ejecución exitosa; un commit documental no acredita una entrevista o reunión.
10. Las calificaciones del Performance Report corresponden al líder. Las entrevistas, citas, sesiones, horas reales, pruebas, aprobaciones, capturas y videos deben proceder de evidencia auténtica. Si faltan, registra el pendiente exacto y continúa las tareas independientes.
11. El enunciado pide report en una organización/repositorio público. El report fue observado como privado: documenta el ajuste de acceso necesario y deja cualquier cambio de visibilidad para mi decisión, con revisión de los datos que se publicarían.

### 3. Resultado de TB1 que debes preparar

- Informe mejorado de AV1 y actualizado a TB1, con capítulo 00, índice, conclusiones, bibliografía y anexos consistentes.
- Nueva versión de landing CREDITOR, diferente y mejorada respecto a la publicada el 18/09.
- Primera Frontend Web Application con los flujos de negocio del Sprint 2.
- Sprint 2 con los ocho apartados exigidos y evidencias reproducibles.
- Configuración y artefactos de compilación/despliegue preparados localmente. Después de que yo publique, verificar las URLs y registrar las evidencias reales.
- Report PDF, Keynote PPTX/PDF, Performance DOCX/PDF revisado por el líder, ZIP complementario y exposición MP4/Stream del hito, cuando existan los insumos humanos correspondientes.

La primera Web Services desplegada y los videos About-the-Product/About-the-Team pertenecen a AV2 según página 32. Conserva diseño y contratos de backend para la integración futura, sin convertir su despliegue en condición adicional de TB1 ni eliminar el apartado 5.2.2.6.

### 4. Corregir y completar los artefactos previos

#### 4.1 Capítulo I: problema, Lean UX y segmentos

1. Mantén el enfoque de cuentas por pagar de mypes en startup, problemática, 5W2H, Lean UX y segmentos.
2. Completa los campos del Problem Statement Brand New Initiative, incluida la brecha frente a alternativas; diferencia supuestos de hechos investigados.
3. Completa varios supuestos por cada tipo Lean UX y conserva los cinco feature assumptions relacionados con `H-01` dashboard, `H-02` compra, `H-03` abono, `H-04` préstamo y `H-05` reportes.
4. Actualiza el Lean UX Canvas para que coincida con esas hipótesis y con ambos segmentos. Las metas deben tener mecanismo de medición, sin presentarlas como resultados alcanzados.
5. Caracteriza los segmentos con fuentes secundarias verificables, año y universo. No incluyas porcentajes de mercado sin sustento.
6. Revisa los tres perfiles, fotografías, códigos y textos alternativos, y enlaza aportes comprobados del capítulo 00.

#### 4.2 Capítulo II: competencia e investigación

1. Reutiliza el análisis oficial de Alegra/Odoo/Zoho, pero completa el Competitive Landscape: startup y competidores, fortalezas, debilidades, oportunidades, amenazas, canales, marketing, servicios, costos/precios comparables y logos con fuente. Cita país, plan, moneda y fecha; marca inferencias y límites de comparación.
2. Corrige la relación del guion con `H-01–H-05`, incluida la hipótesis de compra omitida.
3. Verifica las cuatro entrevistas registradas en `main`: tres S1 y una S2. Corrige las frases que afirman que no hay entrevistas. Dos entrevistas S2 seguían pendientes; que `develop` haya quitado sus filas no significa que se completaron.
4. Completa de tres a cinco entrevistas reales por segmento conforme al enunciado. Cada registro debe contener los campos exigidos, resumen, fecha, captura, evidencia autorizada, enlace Stream, minuto y duración. Revisa que los permisos permitan al docente evaluarlas. Los enlaces YouTube existentes pueden conservarse como referencia complementaria; no sustituyen automáticamente el video consolidado Stream/MP4 del Anexo C.
5. Analiza los relatos reales por código y tiempo: prácticas actuales, saldos, vencimientos, registros, abonos, comprobantes, monedas, préstamos, reportes y barreras. Diferencia hechos, opiniones e interpretación. Incluye coincidencias, diferencias y contradicciones. Los porcentajes deben indicar su denominador y referirse solo a la muestra.
6. Corrige Personas en UXPressia. Las imágenes de `main` contienen `MARKET SIZE 80 %` y rasgos sin fuente; comprueba también las reemplazadas en `develop`. Retira o sustenta esos datos, y vincula cada característica relevante al análisis.
7. Revisa User Task Matrix con criterio de frecuencia/importancia explicado. Completa Journey Maps y Empathy Maps por Persona en UXPressia y el As-Is que anuncia el documento. Incluye imágenes, enlaces revisables y explicación.
8. Refina Big Picture EventStorming y Ubiquitous Language. Documenta actores, eventos, comandos, políticas, decisiones y límites; añade fecha/participantes/captura solo si la sesión ocurrió.

#### 4.3 Capítulo III: requisitos y backlog

1. Conserva IDs y presenta Epics, User Stories y Technical Stories en tablas completas. Incluye las descripciones de negocio y sus relaciones; incorpora estimación/prioridad de las historias técnicas.
2. Revisa Gherkin con resultados observables y reglas definidas. Cubre importes positivos, moneda, datos obligatorios, proveedor de la misma organización, adjuntos, saldo, abono superior al saldo, ausencia de datos y errores pertinentes. Especifica límites acordados en lugar de escribir solo «válido» o «permitido».
3. Actualiza Impact Mapping en UXPressia con objetivos SMART propuestos, Personas, impactos, entregables e historias. Incluye plazo y cómo medir, sin inventar métricas alcanzadas.
4. Sincroniza Product Backlog con el estado real de AV1/TB1. Las historias `US-004–007` figuran para Sprint 2; `US-008–009` figuran para Sprint 3. Confirma el compromiso del equipo antes de ampliar alcance.
5. Completa el tablero en Trello/Jira/YouTrack con URL accesible y captura. Mantén también el backlog y tareas redactados en Markdown; una captura no sustituye las tablas textuales del informe.

#### 4.4 Capítulo IV: diseño para la aplicación que se implementará

1. Corrige los assets de landing en Figma: cuentas por pagar, proveedores, compras y abonos. Retira cartera de clientes, «empieza a cobrar», prueba gratis, tarifas y cifras promocionales sin respaldo.
2. Diseña en Figma escritorio/móvil para dashboard, lista de compras, nueva compra, detalle/historial y registro de abono, con carga, vacío, error y confirmación.
3. Completa wireflows/user flows por user goal en FigJam/LucidChart/Overflow con pantallas, Persona, condiciones, ruta esperada y alternativas. Reutiliza los Mermaid como base lógica, sin afirmar que cajas de texto equivalen a los artefactos UI exigidos.
4. Conecta el prototipo Figma desktop/mobile y prepara la demostración de navegación con captura y video Stream. Asegura que diseños, flujos y criterios de aceptación coincidan.
5. Reutiliza los diagramas C4, UML y ERD existentes. Mermaid está permitido para estos tipos y EventStorming. Actualiza componentes del frontend y los contenedores pertinentes, responsabilidades y comunicaciones; no recrees todo por cambiar la tecnología de dibujo.
6. Mantén `database/schema.sql` coherente con ERD y clases: compras/proveedores de la misma organización, PEN/USD, importes positivos, saldo derivado de abonos y registro atómico para impedir sobreabonos.
7. Resuelve o delimita las decisiones pendientes de Identity, proveedores, almacenamiento y préstamos. Para `US-009`, alinea frecuencia y relación préstamo/cuotas entre UI, UML y SQL. No amplíes el Sprint 2 a todo Loans/Reporting sin acuerdo.

### 5. Preparar la primera frontend de CREDITOR

1. Reutiliza un repositorio existente si lo encuentras. Si no hay uno, inicializa un proyecto local con historial y ramas de GitFlow. Usa Vue, HTML5/CSS3/JavaScript, PrimeVue y lenguaje visual Material Design según el enunciado; verifica compatibilidad de dependencias antes de fijarlas.
2. Organiza componentes, vistas, navegación, dominio y acceso a datos de forma que puedan integrarse luego con la API ASP.NET Core. Usa nombres de código en inglés y evita concentrar todo en un único componente.
3. Implementa el alcance acordado de `US-004–007`: consultar obligaciones por proveedor/moneda/vencimiento; registrar compra con datos obligatorios; ver detalle, abonos y saldo; registrar abono sin superar saldo.
4. Define cómo se ejecutará TB1 si no hay API: adaptador local o datos de demostración explícitos, con contratos separables para sustituirlos por HTTP. No presentar fixtures/localStorage como servicio remoto, autenticación segura o persistencia multiusuario real.
5. Separa idioma de moneda. Traducir al inglés no transforma un importe PEN en USD. Presenta totales por moneda y fechas/importes con formato coherente.
6. Usa inglés por defecto, soporte de español latinoamericano y atributos `lang` correctos. Cubre textos, errores, navegación y títulos, sin dejar claves o fragmentos sin traducir.
7. Asegura etiquetas persistentes, errores asociados, foco visible, navegación de teclado, nombres accesibles, ARIA cuando corresponda y diseño móvil.
8. Comprueba resultados de negocio con casos significativos: compra PEN de 100 y abono 30 → saldo 70; rechazo de abono 71; compra distinta en USD sin mezcla de totales; proveedor de otra organización rechazado si existe ese contexto; formularios incompletos conservan datos y señalan el error.
9. Prepara configuración de despliegue, ruta base y fallback/ruteo adecuados. Verifica build y rutas locales, incluido refresco o acceso directo a una vista.
10. Registra lo implementado y lo pendiente. Backend ASP.NET Core, OpenAPI e integración con terceros forman parte del producto completo; documenta su evolución hacia AV2.

### 6. Preparar la nueva landing para TB1

1. Conserva como evidencia histórica la landing publicada en `https://grupo-desarrollo-aplicaciones-web.github.io/creditor-landing-page/`, commit `cf734ff17d32417323c17a03ccf11a3f4d3a1ade`, [Actions 35305597000](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page/actions/runs/35305597000), exitoso el 18/09/2026. Actualiza la afirmación del informe que la declara sin publicación.
2. Corrige CreditFlow/CF en contenido, logo textual, título, descripción, metadatos, package name y claves internas pertinentes; migra preferencias si es necesario. Revisa traducciones y assets, no solo una sustitución textual.
3. Presenta el problema real: organizar compras a crédito, proveedores, abonos, vouchers y vencimientos. Elimina promesas de importación, WhatsApp, disponibilidad o ahorro que no estén acreditadas.
4. Implementa CTA diferenciados para propietario y administrador hacia vistas reales del frontend. Corrige `#login` y comprueba los destinos cuando yo publique ambas versiones.
5. Corrige enlaces `#` del footer. Incluye términos y privacidad revisables desde landing/aplicación y formulario, con contenido adecuado al alcance y a los datos que efectivamente se usan.
6. El formulario actual solo cambia un estado local y promete email. Implementa un canal real si hay un servicio definido/autorizado, o comunica con precisión el carácter de demostración y ajusta `US-002`; no afirmar envío sin respuesta de red. Añade etiquetas y avisos accesibles.
7. Revisa el simulador antes de ampliarlo. Define si pertenece al alcance CREDITOR. Si se conserva TEA, usa una tasa mensual equivalente `(1 + TEA/100)^(1/12) - 1`, trata tasa cero y verifica casos. Mantén el significado de la tasa igual en inglés/español; una cuota estimada debe declarar sus supuestos.
8. Aplica inglés por defecto, español latinoamericano, responsive, navegación por teclado y metadatos coherentes. Cambiar idioma debe preservar la moneda del dato.
9. Revisa el workflow real, que publica desde `develop`, y la rama estable pendiente de la landing. Prepara un plan GitFlow y configuración de publicación consistente; no ejecutes un deployment ni hagas push durante el trabajo local.

### 7. Completar exactamente Sprint 2 en el informe

Añade `5.2.2 Sprint 2`, enlazado desde el capítulo V y el índice. Usa `docs/sprints/sprint-02.md` como fuente única o mantén ambas vistas sincronizadas. Corrige la jerarquía de encabezados de Sprint 1 y sus asignaciones contradictorias, conservando su evidencia histórica.

| Apartado | Contenido obligatorio |
|---|---|
| 5.2.2.1 Sprint Planning 2 | Fecha/hora/lugar, preparado por, asistentes, review y retrospectiva de Sprint 1, Sprint Goal medible, capacidad/velocity definida y suma de story points. Diferenciar estimación y medición. |
| 5.2.2.2 Aspect Leaders and Collaborators | Matriz LACX con integrante, GitHub username y rol L/C por aspecto. Relacionarla con tareas y acuerdos del equipo. |
| 5.2.2.3 Sprint Backlog 2 | Introducción, URL/captura del tablero y tabla con Story ID/título, Task ID/título/descripción, horas estimadas, asignado y estado To-do/In-Process/To-Review/Done. |
| 5.2.2.4 Development Evidence | Resumen y tabla de repo, rama, commit ID, mensaje, body y fecha para cambios reales de implementación. |
| 5.2.2.5 Execution Evidence | Capturas de vistas desktop/mobile, video de navegación y resultados de pruebas vinculados a fecha/commit. |
| 5.2.2.6 Services Documentation Evidence | Alcance real de contratos/integración. OpenAPI, endpoints, parámetros, respuestas y capturas solo cuando existen; distinguir contratos previstos/adaptador local de servicios ejecutados. |
| 5.2.2.7 Software Deployment Evidence | Nueva landing y primera frontend: configuración, proveedor, URL, versión, SHA, fecha, build/run y capturas verificadas después de publicación. |
| 5.2.2.8 Team Collaboration Insights | Trabajo del sprint, decisiones, dificultades, mejoras y capturas de analíticos/commits de los integrantes en repos de implementación. |

Actualiza 5.1 para incluir frontend, entorno real, repositorios, convenciones y pasos reproducibles. Corrige los enlaces de `creditor-documentacion/...` y `creditflow-documentacion/...`, las capturas inexistentes y la referencia a 5.3 eliminada. Usa los recursos reales del repositorio.

### 8. Cerrar documentación y paquete de entrega

1. Actualiza Registro de Versiones y Collaboration Insights con TB1, URL del report, cambios de artefactos, fechas, commits y capturas de analíticos.
2. Amplía Student Outcome según Anexo A con acciones y conclusiones TB1 de Juan, Sebastián y Miguel en liderazgo y colaboración/planificación/cumplimiento. Diferencia aportes comprobados de futuras responsabilidades.
3. Actualiza carátula, mes/entrega y tabla de contenido hasta cuatro niveles. Añade checklist TB1 con nueva landing, primera frontend, ocho apartados de Sprint 2 y evidencias.
4. Actualiza conclusiones a resultados realmente obtenidos; corrige estados obsoletos de anexos y añade bibliografía APA pertinente. No presentar el Performance Report como sustituido por Student Outcome.
5. Prepara exportación completa y revisa visualmente tablas, imágenes, diagramas, saltos y enlaces. Los PDFs individuales no acreditan por sí solos el informe integral TB1.
6. Prepara la Keynote con equipo/fotos, problema, correcciones AV1, flujo de negocio, demostración de productos y colaboración. Incluye guía para sustentación máxima de 12 minutos: introducción ≤10 %, mejoras previas ≤30 %, demo ≥40 % y colaboración ≥20 %.
7. Prepara el formato Performance DOCX/PDF para que el Team Leader valide responsabilidades, cumplimiento y calificación entre las alternativas 20/16/13/07/00. No asignar calificaciones sin la evaluación del líder.
8. Prepara guion de exposición, grabación con los tres integrantes ante cámara, demostración y edición de máximo 30 minutos. Añade el enlace privado Stream y anexo «Videos de Exposiciones» solo cuando exista el video. Entrega también MP4.
9. Forma el ZIP complementario con archivos pertinentes y versiones identificadas; excluye dependencias instaladas, secretos, temporales y datos ajenos a la entrega.
10. Usa los nombres del curso, confirmando el identificador de startup. Si se adopta `creditor`, los ejemplos son:

```text
upc-pre-202620-1asi0730-16127-creditor-report-tb1.pdf
upc-pre-202620-1asi0730-16127-creditor-keynote-tb1.pptx
upc-pre-202620-1asi0730-16127-creditor-keynote-tb1.pdf
upc-pre-202620-1asi0730-16127-creditor-performance-tb1.docx
upc-pre-202620-1asi0730-16127-creditor-performance-tb1.pdf
upc-pre-202620-1asi0730-16127-creditor-expo-tb1.mp4
```

La fecha de entrega depende del horario: TB1 se presenta 24 horas antes del inicio de la segunda sesión sincrónica semanal. No inventes una fecha calendario sin confirmar el horario.

### 9. División sugerida de ramas y commits

Reutiliza ramas adecuadas si ya existen. Cada rama debe pertenecer al repositorio indicado y salir de su `develop`; son alcances sugeridos, no evidencia de trabajo ya realizado.

| Repositorio | Feature | Ejemplos de commits lógicos |
|---|---|---|
| Report | `feature/tb1-research` | `docs(research): reconcile interview records`; `docs(research): add coded interview findings`; `docs(ux): update personas and journeys` |
| Report | `feature/tb1-requirements-design` | `docs(requirements): refine epics and acceptance criteria`; `docs(design): align purchase and payment flows`; `docs(architecture): align models with frontend` |
| Report | `feature/tb1-sprint-evidence` | `docs(sprint): add sprint two planning and LACX`; `docs(sprint): add backlog and development evidence`; `docs(sprint): record execution and deployment evidence` |
| Report | `feature/tb1-delivery` | `docs(outcome): document verified TB1 contributions`; `docs(delivery): add TB1 checklist and annexes`; `docs(report): prepare reviewed TB1 export` |
| Landing | `feature/creditor-content` | `feat(content): align landing with accounts payable`; `fix(i18n): set English default and preserve currency` |
| Landing | `feature/frontend-navigation` | `feat(navigation): connect segment calls to action`; `fix(legal): add working terms and privacy links` |
| Landing | `feature/contact-accessibility` | `fix(contact): clarify submission behavior`; `fix(a11y): label fields and announce errors` |
| Landing | `feature/tb1-deployment` | `ci(landing): prepare release deployment`; `docs(landing): document local verification` |
| Frontend | `feature/app-foundation` | `feat(app): add Vue and PrimeVue foundation`; `feat(i18n): add English and Spanish resources` |
| Frontend | `feature/accounts-payable` | `feat(purchases): add purchase list and detail`; `feat(purchases): validate credit purchase registration` |
| Frontend | `feature/purchase-payments` | `feat(payments): add payment history`; `feat(payments): enforce remaining balance` |
| Frontend | `feature/tb1-quality-deployment` | `fix(a11y): improve keyboard navigation`; `test(purchases): cover balance and validation scenarios`; `ci(frontend): prepare static hosting` |

No uses una tabla de commits sugeridos como si fuera el historial real. Para nuevos commits registra el SHA que Git produzca y la autoría efectiva.

### 10. Validaciones y entrega final de tu trabajo

1. Comprueba enlaces locales, IDs de historias, coherencia de conteos/estados y render de Mermaid/exportaciones. Ejecuta los checks configurados del repo y `git diff --check`.
2. En landing/frontend ejecuta instalación reproducible y build con el runtime compatible; añade pruebas significativas para las reglas de saldo, moneda y validación, y revisa navegación, teclado, idioma y responsive.
3. Registra resultado, fecha, comandos, commit y límites. Un checklist propuesto no cuenta como prueba pasada.
4. Después de mi publicación, verifica HTTPS, assets sin 404, rutas directas/refresco, CTAs entre productos y permisos de evidencias. Hasta entonces mantén despliegue TB1 como pendiente de publicación/verificación.
5. Finaliza con archivos modificados, ramas, commits y autor de cada commit, validaciones ejecutadas, criterios cumplidos y pendientes concretos del equipo. Distingue las acciones que ya hiciste de lo que requiere que yo publique, proporcione evidencia o valide con el líder.
6. Entrega un resultado revisable en local, sin push y sin declarar TB1 completo mientras falten sus productos o evidencias centrales.
